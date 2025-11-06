import express, { Application } from "express";
import helmet from "helmet";
import compression from "compression";
import config from "config";
import postsRouter from "./routes/posts";
import usersRouter from "./routes/users";
const port = config.get("port") as number;

const app: Application = express();
app.enable('trust proxy');

app.use(helmet());
app.use(compression());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
