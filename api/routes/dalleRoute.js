import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";
import Post from "../Database/modals.js"; // Update the import path

dotenv.config();

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

router.route("/").get((req, res) => {
  res.send("Hello");
});
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const Airesponse = await openai.Completion.create({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = Airesponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});
export default router;
