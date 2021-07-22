import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
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
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                </Text>
            </View>
            <View style={styles.btnContainer}>
                <Button
                    style={styles.btn}
                    mode="contained"
                    onPress={() => props.navigation.navigate("LoginScreen")}
                >
                    LOGIN
                </Button>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: '61.1%',
        borderRadius: 70,
    },
    textContainer: {
        flex: 0.8,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 40
    },
    text: {
        fontFamily: 'ProximaNova-Bold',
        color: '#FFF',
        fontSize: 22,
        textAlign: 'center',
    },
});

export default Onboard