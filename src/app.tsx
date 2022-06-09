import React, { useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import {RootNavigator} from './screens';
import {
  getNavigationTheme,
  getThemeStatusBarBGColor,
  getThemeStatusBarStyle,
} from './utils/designSystem';
import { useServices } from './services';

import useFonts from './hooks/useFonts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const AppNavigator = (): JSX.Element => {
  useColorScheme();
  const { nav } = useServices();
  
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <StatusBar barStyle={getThemeStatusBarStyle()} backgroundColor={getThemeStatusBarBGColor()} />
      <NavigationContainer
        ref={nav.n}
        onReady={nav.onReady}
        onStateChange={nav.onStateChange}
        theme={getNavigationTheme()}
      >
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
