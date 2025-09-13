import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import paginas from "./routes/paginas.js";
import conexaoMongoDB from "./database/db.js";
dotenv.config();

await conexaoMongoDB();

const app = express();
const port = process.env.PORT || 8080;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "https://doctus-wiki-frontend.onrender.com",
    credentials: true,
  })
);

// routes
app.use("/api", paginas);

// iniciar servidor
app.listen(port, () =>
  console.log(`Servidor ativo em http://localhost:${port}`)
);
