const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://animesflix.net/";

async function scrapeAnimeEpisodes() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const episodeList = $(".episodes");

    // Crie um array para armazenar os dados dos episódios
    const episodes = [];
    const titulos = [];

    // Itere sobre cada link <a> dentro da lista
    $("ul.post-lst li").each((index, element) => {
      // Dentro de cada item (element), encontra o <h2> com a classe 'entry-title'
      // O .find() busca um elemento descendente
      const tituloElemento = $(element).find("h2.entry-title");
      const episodioElemento = $(element).find("span.num-epi");
      const imagemElemento = $(element).find(".post-thumbnail img");
      const linkElemento = $(element).find("a.lnk-blk");

      const linkImagem = imagemElemento.attr("src");
      const titulo = tituloElemento.text().trim();
      const episodio = episodioElemento.text().trim();
      const linkAnime = linkElemento.attr("href");

      const tagElemento = $(element).find(".post-thumbnail .tag");

      // Usa .text().trim() para pegar o conteúdo (ex: "Leg" ou "Dub/Leg")
      const tag = tagElemento.text().trim();

      // Adiciona os dados em um objeto e armazena no array
      episodes.push({
        titulo: titulo,
        imagem: linkImagem,
        pagina: linkAnime,
        numeroEpisodio: episodio || "N/A",
        language: tag || "N/A",
      });
    });

    // Imprima os resultados
    console.log(episodes);
  } catch (error) {
    console.error("Erro ao fazer o scraping:", error);
  }
}

scrapeAnimeEpisodes();
