import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Route imports

// Configuration
dotenv.config();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Routes
app.get("/", (req, res) => res.send("Home route!"));

// Server
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) console.log(err, "Application failed to start!");
  else console.log(`Application is running on http://localhost:${port}`);
});
