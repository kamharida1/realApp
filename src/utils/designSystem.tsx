import {DarkTheme, DefaultTheme, Theme} from '@react-navigation/native';
import {Appearance} from 'react-native';
import {Colors, Typography} from 'react-native-ui-lib';
import {stores} from '../stores';

const colors: DesignSystemColors = {
  primary: '#5383b8', // blue
  secondary: '#469c57', // green
  accent: '#fed330', // yellow
  blackish: Colors.rgba(20, 20, 20, 1),
  blackish2: Colors.rgba(50, 50, 50, 1),
  whitish: Colors.rgba(250, 250, 250, 1),
  whitish2: Colors.rgba(230, 230, 230, 1),
};

const themes: Record<AppearanceMode, ThemeColors> = {
  light: {
    textColor: colors.blackish,
    bgColor: colors.whitish,
    bg2Color: colors.whitish2,
  },
  dark: {
    textColor: colors.whitish,
    bgColor: colors.blackish,
    bg2Color: colors.blackish2,
  },
};

// for more information - https://wix.github.io/react-native-ui-lib/foundation/style
export const configureDesignSystem = (): void => {
  const {ui} = stores;

  if (ui.isSystemAppearance) {
    Colors.loadColors(colors);
    Colors.loadSchemes(themes);
  } else {
    Colors.loadColors({...colors, ...themes[ui.appearance]});
    Colors.loadSchemes({dark: {}, light: {}});
  }

  Typography.loadTypographies({
    section: { fontSize: 26, fontWeight: '600' },
    h1B1: { fontSize: 40, fontFamily: 'airBnBCerealBlack' }, //Black
    h1B2: { fontSize: 40, fontFamily: 'airBnBCerealXtraBold' }, //Heavy
    h1B3: { fontSize: 40, fontFamily: 'airBnBCerealBlacky'},// Regular
    h1B4: { fontSize: 40, fontFamily: 'airBnBCerealLight'},// Light
    h1B5: { fontSize: 40, fontFamily: 'airBnBCerealMedium'},// semiBold
    h1B6: { fontSize: 40, fontFamily: 'airBnBCerealBold'},//Bold

    h2B1: { fontSize: 30, fontFamily: 'airBnBCerealBlack' }, //Black
    h2B2: { fontSize: 30, fontFamily: 'airBnBCerealXtraBold' }, //Heavy
    h2B3: { fontSize: 30, fontFamily: 'airBnBCerealBlacky'},// Regular
    h2B4: { fontSize: 30, fontFamily: 'airBnBCerealLight'},// Light
    h2B5: { fontSize: 30, fontFamily: 'airBnBCerealMedium'},// semiBold
    h2B6: { fontSize: 30, fontFamily: 'airBnBCerealBold' },//Bold
    
    h3B1: { fontSize: 18, fontFamily: 'airBnBCerealBlack' }, //Black
    h3B2: { fontSize: 18, fontFamily: 'airBnBCerealXtraBold' }, //Heavy
    h3B3: { fontSize: 18, fontFamily: 'airBnBCerealBlacky'},// Regular
    h3B4: { fontSize: 18, fontFamily: 'airBnBCerealLight'},// Light
    h3B5: { fontSize: 18, fontFamily: 'airBnBCerealMedium'},// semiBold
    h3B6: { fontSize: 18, fontFamily: 'airBnBCerealBold' },//Bold
    
    h4B1: { fontSize: 16, fontFamily: 'airBnBCerealBlack' }, //Black
    h4B2: { fontSize: 16, fontFamily: 'airBnBCerealXtraBold' }, //Heavy
    h4B3: { fontSize: 16, fontFamily: 'airBnBCerealBlacky'},// Regular
    h4B4: { fontSize: 16, fontFamily: 'airBnBCerealLight'},// Light
    h4B5: { fontSize: 16, fontFamily: 'airBnBCerealMedium'},// semiBold
    h4B6: { fontSize: 16, fontFamily: 'airBnBCerealBold'},//Bold

  });
};

export const getThemeStatusBarStyle = (ca?: CurrentAppearance): StatusBarStyle => {
  const {ui} = stores;

  const current: CurrentAppearance = ca ?? {
    value: ui.appearance,
    system: ui.isSystemAppearance,
  };

  const appearance = current.system ? Appearance.getColorScheme() : current.value;
  switch (appearance) {
    case 'dark':
      return 'light-content';
    case 'light':
      return 'dark-content';
  }
};

export const getThemeStatusBarBGColor = (ca?: CurrentAppearance): string => {
  return Colors.bg2Color;
};

export const getNavigationTheme = (ca?: CurrentAppearance): Theme => {
  const {ui} = stores;

  const current: CurrentAppearance = ca ?? {
    value: ui.appearance,
    system: ui.isSystemAppearance,
  };

  // for more information - https://reactnavigation.org/docs/themes
  const MyDefaultTheme: Theme = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      background: Colors.bgColor,
      card: Colors.bgColor,
      text: Colors.textColor,
      // border: Colors.grey30,
      // notification: Colors.primary,
    },
  };

  const MyDarkTheme: Theme = {
    dark: true,
    colors: {
      ...DarkTheme.colors,
      primary: Colors.primary,
      background: Colors.bgColor,
      card: Colors.bgColor,
      text: Colors.textColor,
      // border: Colors.grey30,
      // notification: Colors.primary,
    },
  };

  const appearance = current.system ? Appearance.getColorScheme() : current.value;
  switch (appearance) {
    case 'dark':
      return MyDarkTheme;
    case 'light':
      return MyDefaultTheme;
  }

  return DefaultTheme;
};

export const getHeaderBlurEffect = (ca?: CurrentAppearance): 'regular' | 'light' | 'dark' => {
  const {ui} = stores;

  const current: CurrentAppearance = ca ?? {
    value: ui.appearance,
    system: ui.isSystemAppearance,
  };

  return current.system ? 'regular' : current.value;
};
