import mongoose from "mongoose";

const paginaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    conteudo: { type: String, default: "", required: true },
    ramificacao: { type: mongoose.Schema.Types.ObjectId, required: false },
  },
  { timestamps: true }
);

const Pagina = mongoose.model("Pagina", paginaSchema);

export default Pagina;
