//função que realzia o fetch da API com os valores obtidos no APP.js (titulo, valor máximo e valor mínimo)
export const Search = async (gameName, valorMax, valorMin) => {
  try {
    //faz o fetch do link da api com os filtros obtidos
    const response = await fetch(
      `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=${valorMax}&lowerPrice=${valorMin}&title=${encodeURIComponent(gameName)}&pageSize=15`
    );
    //atribui os resultados json a uma constante "data"
    const data = await response.json();

    //condicional para caso a constante data seja vazia, retorne uma lista vazia
    if (!data || data.length === 0) {
      return [];
    }

    //realiza a filtragem dos dados presentes nos dicíonarios dentro do json obtido, segundo os dados que eu pedir
    return data.map(game => ({
      //guarda o título do jogo
      title: game.title || 'Nenhum título',
      //guarda a pontuação matacritic
      metacriticScore: game.metacriticScore || 'N/A',
      //guarda o preço normal do jogo
      normalPrice: game.normalPrice || 'N/A',
      //guarda o preço promocional do jogo
      salePrice: game.salePrice || 'N/A',
      //guarda o link da imagem
      thumb: game.thumb || null,
      //guarda a código da promoção dentro do link de redirecionamento, usado para que os containers dos jogos sejam clickaveis e redirecione para a promoção
      gameLink: `https://www.cheapshark.com/redirect?dealID=${game.dealID}`,
      //guarda a porcentagem de desconto
      savings: parseFloat(game.savings).toFixed(2),
      //guarda se o jogo está realmente em promoção
      isOnSale: game.isOnSale
    }));
    //mostra um erro casa haja algum problema durante a requisição de informações
  } catch (error) {
    console.error('Erro ao fazer fetch dos jogos:', error);
    throw error;
  }
};