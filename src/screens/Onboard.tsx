import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { RootStackParamList } from '../navigation/RootNavigator';

type NavigationProp = StackNavigationProp<RootStackParamList, 'OnboardScreen'>

interface OnboardProps {
    navigation: NavigationProp
}

const Onboard = (props: OnboardProps) => {
    return (
        <>
            <ImageBackground
                style={StyleSheet.absoluteFillObject}
                source={require('../../assets/images/background.jpg')}
                resizeMode={"stretch"}
            />
            <Button
                style={styles.btn}
                mode="contained"
                onPress={() => props.navigation.navigate("LoginScreen")}
            >
                GİRİŞ
            </Button>
        </>
    );
};

const styles = StyleSheet.create({
    btn: {
        position: "absolute",
        top: '87.6%',
        width: '61.1%',
        alignSelf: 'center',
        borderRadius: 70,
    },
});

export default Onboard