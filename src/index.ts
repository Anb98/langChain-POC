import express, { Express, Request, Response } from "express";
import { removeEmpty, removeSensitiveFields } from "./helpers.js";
import askQuestion from "./askQuestion.js";
import askRecommendation from "./askRecomendation.js";
import { PORT } from "./config.js";

const app: Express = express();

app.use(express.json());

app.post("/question", async (req: Request, res: Response) => {
  const { question, policy } = req.body;
  const answer = await askQuestion(question, policy);

  res.json({ answer });
});

app.post("/recommendation", async (req: Request, res: Response) => {
  const { query, policy } = req.body;

  const transformedQuery = {
    ...removeEmpty(query),
    addresses: {
      origin: removeEmpty(query.addresses[0]),
      destination: removeEmpty(query.addresses[1]),
    },
  };
  removeSensitiveFields(transformedQuery);

  const answer = await askRecommendation(
    JSON.stringify(transformedQuery),
    policy
  );

  res.json({ recomendation: answer });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
