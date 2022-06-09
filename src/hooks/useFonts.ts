import * as Font from "expo-font";
 
export default async () =>
  await Font.loadAsync({
    airBnBCerealBold: require('../../assets/fonts/AirbnbCereal_W_Bd.otf'),
    airBnBCerealBlacky: require('../../assets/fonts/AirbnbCereal_W_Bk.otf'),
    airBnBCerealBlack: require('../../assets/fonts/AirbnbCereal_W_Blk.otf'),
    airBnBCerealLight: require('../../assets/fonts/AirbnbCereal_W_Lt.otf'),
    airBnBCerealMedium: require('../../assets/fonts/AirbnbCereal_W_Md.otf'),
    airBnBCerealXtraBold: require('../../assets/fonts/AirbnbCereal_W_XBd.otf'),
  });