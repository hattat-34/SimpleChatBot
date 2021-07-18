import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../screens/Chat";
import Login from "../screens/Login";
import Onboard from "../screens/Onboard";
import { View } from 'react-native';

export type RootStackParamList = {
    OnboardScreen: undefined
    LoginScreen: undefined
    ChatScreen: undefined
}

const MainStack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {

    return (
        <MainStack.Navigator
            initialRouteName={"OnboardScreen"}
            screenOptions={{
                title: '',
                headerStyle: {
                    backgroundColor: '#AC3964',
                },
                headerTintColor: '#FFF',
                cardOverlay: () => (
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(93,70,144,.3)',
                        }}
                    />)
            }}
        >
            <MainStack.Screen name={"OnboardScreen"} component={Onboard} options={{ headerShown: false }} />
            <MainStack.Screen name={"LoginScreen"} component={Login} />
            <MainStack.Screen name={"ChatScreen"} component={Chat} />
        </MainStack.Navigator>
    )
}