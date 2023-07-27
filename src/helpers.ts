import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { Document } from "langchain/document";

import { OPENAI_API_KEY } from "./config.js";

export const load = async (value: string) => {
  const doc = new Document({ pageContent: value });
  return [doc];
};

export const split = async (docs: any) => {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });

  const splitDocs = await textSplitter.splitDocuments(docs);
  return splitDocs;
};

export const storage = async (splitDocs: any) => {
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: OPENAI_API_KEY,
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );
  return vectorStore;
};

export const retrieval = async ({ vectorStore, template }: any) => {
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: OPENAI_API_KEY,
    temperature: 0.3,
    verbose: true,
  });
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    ...(template && { prompt: PromptTemplate.fromTemplate(template) }),
  });
  return chain;
};
