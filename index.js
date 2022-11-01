import express, { json } from "express";
import router from "./routes/flightRoute.js";

const server = express();

server.use(json());

server.use("/flights", router);

server.get("/", (req, res) => {
  res.send("Welcome to my Flight API");
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
