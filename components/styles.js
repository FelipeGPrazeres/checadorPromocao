import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #46779c;
  padding-top: ${Constants.statusBarHeight}px;
`;

export const Header = styled.View`
  background-color: #2a475e;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  padding: 10px 25px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const Logo = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
`;

export const TitleImage = styled.Image``;

export const Paragraph = styled.Text`
  margin-bottom: 4px;
  font-family: 'OpenSans_400Regular';
  font-size: 12px;
  color: #66c0f4;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const SearchContainer = styled.View`
  margin-bottom: 16px;
`;

export const PriceSearchContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

export const PriceSearchContainer2nd = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const InputField = styled.TextInput`
  background-color: #316282;
  padding: 12px;
  color: #ffffff;
  margin-bottom: 12px;
  border-radius: 2px;
  font-size: 16px;
  font-family: 'OpenSans_400Regular';
`;

export const PriceInputField = styled(InputField)`
  flex: 1;
`;

export const SearchButton = styled.TouchableOpacity`
  background-color: #66c0f4;
  padding: 12px;
  border-radius: 3px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 3;
  ${Platform.OS === 'ios' && `margin-top: 20px;`}
`;

export const ButtonText = styled.Text`
  color: #1b2838;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.5px;
  font-family: 'OpenSans_400Regular';
`;

export const ResultsContainer = styled.View`
  flex: 1;
  margin-top: 10px;
`;

export const GameCardContainer = styled.View`
  background-color: #396180;
  padding: 15px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.45;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const GameDetails = styled.View`
  flex-direction: row;
`;

export const GameThumb = styled.Image`
  width: 100px;
  height: 40px;
  resize-mode: cover;
`;

export const GameTitle = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 10px;
  font-family: 'OpenSans_400Regular';
`;

export const MetaScoreContainer = styled.View`
  background-color: ${props => {
    const score = parseInt(props.score);
    if (isNaN(score) || props.score === 'N/A') return '#4a4a4a';
    if (score >= 75) return '#66BB6A;padding: 6px 6px;';
    if (score >= 50) return '#FFA726;padding: 6px 6px;';
    return '#EF5350; padding: 6px 9px;';
  }};
  padding: 6px;
  border-radius: 4px;
  position: absolute;
  left: 83px;
  top: 55%;
`;

export const MetaScoreText = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 10px;
  font-family: 'OpenSans_400Regular';
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-top: 12px;
`;

export const PriceText = styled.Text`
  color: ${props => {
      const discount = parseInt(props.discount);
      if (discount > 1) return '#60e567;'
      return '#ffffff;'
    }};
  font-size: 16px;
  font-weight: bold;
  text-align: right;
  margin-left: 5px;
  font-family: 'OpenSans_400Regular';
`;

export const Discount = styled.Text`
  font-size: 12px;
  margin-left: 5px;
  padding: 3px;
  background-color: ${props => {
     const discount = parseInt(props.discount);
     if (isNaN(discount) || props.discount === 'N/A') return '#4a4a4a';
     if (discount >= 75) return '#F32828;padding: 6px 6px;';
     if (discount >= 50) return '#FFA726;padding: 6px 6px;';
     return '#396180; color: #396180;';
   }};
  border-radius: 5px;
  font-family: 'OpenSans_400Regular';
`;

export const OriginalPriceText = styled.Text`
  color: ${props => {
      const discount = parseInt(props.discount);
      if (discount > 1) return '#8f98a0;text-decoration-line: line-through;'
      return '#396180; color: #396180;'
    }};
  margin-left: 12px;
  font-size: 12px;
  text-align: right;
  font-family: 'OpenSans_400Regular';
`;

export const ErrorText = styled.Text`
  color: #EF5350;
  text-align: center;
  font-size: 16px;
  font-family: 'OpenSans_400Regular';
`;

export const NoResultsText = styled.Text`
  color: #ffffff;
  text-align: center;
  margin-top: 24px;
  font-size: 16px;
  font-family: 'OpenSans_400Regular';
`;
