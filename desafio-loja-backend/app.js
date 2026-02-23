import express from "express";
import cors from "cors";
import Helmet from "helmet";
import cookieParser from "cookie-parser";
// import { VerificarApiKey } from "./Middlewares/apiKey.js";
import produtosRoute from "./Routes/Products.js";
import UserRoute from "./Routes/Users.js";
import { db } from "./Models/Database.js";
import { OrderItems } from "./Models/OrderItems.js";
import { Orders } from "./Models/Orders.js";
import "./Models/associations.js";
const app = express();
db.sync()
app.use(cookieParser());
app.use(Helmet());
app.use(express.json({ limit: "200mb" }));
app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  }),
);

chamarRotas(app);

app.use((req, res, error) => {
  console.error(error);
  return res
    .status(500)
    .json({ msg: "Rota " + req.originalUrl + " não encontrada", code: 404 });
});

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    msg: "Um erro ocorreu ",
    code: 500,
  });
});

function chamarRotas(app) {
  app.use("/products", produtosRoute);
  app.use("/users", UserRoute);

}

export default app;