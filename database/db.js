import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

const conexaoMongoDB = async () => {
  try {
    console.log("Conectando ao MongoDB...");
    await mongoose.connect(
      `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@wiki.zowrxab.mongodb.net/?retryWrites=true&w=majority&appName=Wiki`
    );
    console.log("Conectado ao MongoDB!");
  } catch (error) {
    console.error(error);
  }
};

export default conexaoMongoDB;
