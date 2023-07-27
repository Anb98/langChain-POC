import { load, split, storage, retrieval } from "./helpers.js";

export default async (question: string, policy: string) => {
  const docs = await load(policy);
  const splitDocs = await split(docs);
  const vectorStore = await storage(splitDocs);
  const chain = await retrieval({ vectorStore });
  const answer = await chain.call({
    query: question,
  });

  return answer;
};
