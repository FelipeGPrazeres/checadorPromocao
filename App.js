import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, Linking, KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Constants from 'expo-constants';
import { Search } from './components/Search';
//importando a fonte usada
import {
  useFonts,
  OpenSans_400Regular
} from '@expo-google-fonts/open-sans';
//importando as imagens da logo
import image65 from './components/assets/image65.png';
import image66 from './components/assets/image66.png';
//estilos do projeto
import {
  Container, Header, Logo, TitleImage, Paragraph, SearchContainer, PriceSearchContainer,
  PriceSearchContainer2nd, InputField, PriceInputField, SearchButton, ButtonText, ResultsContainer,
  GameCardContainer, GameDetails, GameThumb, GameTitle, MetaScoreContainer, MetaScoreText,
  PriceContainer, PriceText, Discount, OriginalPriceText, ErrorText, NoResultsText,
} from './components/styles';

//Função base do programa, é responsável pelos elementos visuais e mostrar os resultados obtidos pelo Search.js
export default function App() {
  //variáveis utilizadas no programa para funcionalidade do barra de busca, filtragem e mostra dos resultados
  const [gameName, setGameName] = useState('');
  const [valorMax, setValorMax] = useState('');
  const [valorMin, setValorMin] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular
  });

//funçao que mostra resultado de "exemplo" para que programa não fique vazio e seja mais intuitivo
  const initialSearch = async () => {
    if (!hasSearched){
      try {
        setIsLoading(true)
        const searchResults = await Search("batman", 100, 0);
        setResults(searchResults);
        setHasSearched(true);
      } catch (error) {
        console.error("Error fetching initial results:", error);
        setError("Erro ao carregar os resultados iniciais.");
      } finally {
        setIsLoading(false);
      }
    }
};
  //useEffect roda apenas uma vez assim que o programa carrega, chamando a função initialSearch que mostra uma busca "exemplo" para maior entendimento da funcionalidade do programa
  useEffect(() => {
    initialSearch();
  }, []);
  //constante que ativa a pesquisa com base nos filtros selecionados
  const handleSearch = async () => {
    if (!gameName.trim()) {
      setError('Escreva o nome do jogo, por favor.');
      return;
    }
    //ativa animação de buscando
    setIsLoading(true);
    setError(null);
    //marca que a pesquisa foi "iniciada", usado para demonstração de erro caso a pesquisa falhe
    setHasSearched(true);
    try {
      //const filteredResults retira os jogos que não tenham promoção mas que estão salvos como deals na API
      const searchResults = await Search(gameName, valorMax, valorMin);
      setResults(searchResults);
      //checa caso aconteça algum erro na busca, mostrando uma mensagem
    } catch (err) {
      setError('Erro ao procurar, tente novamente.');
      console.error(err);
      //desliga a animação de carregamento quando a busca dá certo para mostrar os resultados
    } finally {
      setIsLoading(false);
    }
  };
 //retorna o visual do programa
  return (
    <TouchableWithoutFeedback
      onPress={Platform.OS === 'ios' ? Keyboard.dismiss : null}
      accessible={false}
    >
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Container>
            <Header useEffect ={initialSearch}>
              <Logo><TitleImage source={image66}/><TitleImage source={image65}/></Logo>
                <SearchContainer>
                  <InputField
                    placeholder="Buscar promoção por título"
                    placeholderTextColor="#dfdfdf"
                    value={gameName}
                    onChangeText={setGameName}
                  />
                    <PriceSearchContainer>
                      <PriceSearchContainer2nd>
                      <Paragraph>VALOR MÁXIMO:</Paragraph>
                        <PriceInputField
                          placeholder="Ex: 100"
                          placeholderTextColor="#dfdfdf"
                          value={valorMax}
                          onChangeText={setValorMax}
                          keyboardType="numeric"
                        />
                      </PriceSearchContainer2nd>
                      <PriceSearchContainer2nd>
                      <Paragraph>VALOR MÍNIMO:</Paragraph>
                        <PriceInputField
                          placeholder="Ex: 0"
                          placeholderTextColor="#dfdfdf"
                          value={valorMin}
                          onChangeText={setValorMin}
                          keyboardType="numeric"
                        />
                      </PriceSearchContainer2nd>
                    </PriceSearchContainer>
                  <SearchButton onPress={handleSearch} disabled={isLoading}>
                    <ButtonText>{isLoading ? 'Procurando...' : 'Mostrar Resultados'}</ButtonText>
                  </SearchButton>
                </SearchContainer>
                {error && <ErrorText>{error}</ErrorText>}
            </Header>
            
            {isLoading ? (
              <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
            ) : (
              <ResultsContainer>
                {results.length > 0 ? (
                  <FlatList
                    data={results}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => Linking.openURL(item.gameLink)}>
                        <GameCardContainer>
                          <GameTitle>{item.title}</GameTitle>
                          <GameDetails>
                            {item.thumb && <GameThumb source={{ uri: item.thumb }} />}
                            <MetaScoreContainer score={item.metacriticScore}>
                              <MetaScoreText>{item.metacriticScore}</MetaScoreText>
                            </MetaScoreContainer>
                            <PriceContainer>
                              <OriginalPriceText discount={item.savings}>${item.normalPrice}</OriginalPriceText>
                              <Discount discount={item.savings}>-%{item.savings}</Discount>
                              <PriceText discount={item.savings}>${item.salePrice}</PriceText>
                            </PriceContainer>
                          </GameDetails>
                        </GameCardContainer>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  hasSearched && gameName.trim() && <NoResultsText>Nenhum resultado encontrado.</NoResultsText>
                )}
              </ResultsContainer>
            )}
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}