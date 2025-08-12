import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Route imports
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

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
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application is running on http://localhost:${port}`);
  console.log("Hello from App");
});
