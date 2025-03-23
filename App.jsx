import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {ThemeProvider} from './src/context/ThemeContext';
import AppNavigation from './src/Navigation/AppNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

const App = () => {
  
  // status bar Ui setup 
  useEffect(() => {
    StatusBar.setBackgroundColor('white');
    StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaProvider>
        <ThemeProvider>
          <AppNavigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
