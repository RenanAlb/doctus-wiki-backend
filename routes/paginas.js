import express from "express";
const router = express.Router();
import Pagina from "../model/pagina.js";

// buscar páginas
router.get("/pages", async (req, res) => {
  try {
    console.log("Buscando todas as páginas...");
    const buscarPaginas = await Pagina.find();

    if (!buscarPaginas) {
      return res
        .status(400)
        .json({ message: "Erro inesperado ao buscar as páginas", ok: false });
    }

    console.log("Páginas buscadas!");

    res.status(200).json({
      message: "Páginas buscadas com sucesso!",
      result: buscarPaginas,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, ok: false });
  }
});

// criar páginas
router.post("/pages", async (req, res) => {
  try {
    const { titulo, conteudo, ramificacao } = req.body;

    if (!titulo || !conteudo) {
      return res.status(400).json({ message: "Erro ao buscar credenciais" });
    }

    console.log(
      `título: ${titulo} - conteúdo: ${conteudo} - ramificação: ${
        ramificacao || null
      }`
    );
    console.log("Criando página...");
    const criarPagina = await Pagina.create({ titulo, conteudo, ramificacao });
    console.log("Página criada! -> ", criarPagina);

    res.status(200).json({
      message: "Página criada com sucesso!",
      result: criarPagina,
      ok: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, ok: false });
  }
});

// deletar páginas
// Função recursiva para deletar página e todas as ramificações
async function deletarPaginaComFilhos(id) {
  // Busca todos os filhos da página atual
  const filhos = await Pagina.find({ ramificacao: id });

  // Para cada filho, deleta recursivamente
  for (const filho of filhos) {
    await deletarPaginaComFilhos(filho._id);
  }

  // Depois de deletar os filhos, deleta a página atual
  await Pagina.findByIdAndDelete(id);
}

router.delete("/pages/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Erro ao buscar o ID da página",
        ok: false,
      });
    }

    const pagina = await Pagina.findById(id);

    if (!pagina) {
      return res.status(404).json({
        message: "Página não encontrada",
        ok: false,
      });
    }

    // Chama a função recursiva para deletar tudo
    await deletarPaginaComFilhos(id);

    return res.status(200).json({
      message: "Página e todas as ramificações deletadas com sucesso",
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar a página",
      error: error.message,
      ok: false,
    });
  }
});

export default router;
