/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { RootNavigator } from './navigation/RootNavigator';
import { SafeAreaView } from 'react-native';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#AC3964',
    },
};

const App = () => {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <SafeAreaView />
                <RootNavigator />
            </NavigationContainer>
        </PaperProvider>
    );
};

export default App;
