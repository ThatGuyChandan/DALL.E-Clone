import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./Database/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoute from "./routes/dalleRoute.js";

const port = 4000;
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

const startServer = async () => {
  try {
    await connectDb(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
