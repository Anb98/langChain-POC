import express, { Express, Request, Response } from "express";
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
  const answer = await askRecommendation(JSON.stringify(query), policy);

  res.json({ recomendation: answer });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
