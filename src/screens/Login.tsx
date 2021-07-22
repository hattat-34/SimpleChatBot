import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { Button, Colors, Snackbar, Text, TextInput } from 'react-native-paper'
import { RootStackParamList } from '../navigation/RootNavigator'
import { fakeRequest } from '../utils/Mock'

type NavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>

const Login = ({ navigation }: { navigation: NavigationProp }) => {
    const [username, setUsername] = useState("")
    const [mobile, setMobile] = useState("")
    const [warning, setWarning] = useState("")
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        if (!username.trim() || !mobile.trim) {
            setWarning("Lütfen, ad soyad ve telefon numarası giriniz.")
            return;
        }

        setLoading(true)
        await fakeRequest(500)
        navigation.navigate("ChatScreen", { username })
        setLoading(false)
    }
    return (
        <>
            <ImageBackground
                style={StyleSheet.absoluteFillObject}
                source={require('../../assets/images/login.jpg')}
                resizeMode={"cover"}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={{ backgroundColor: 'transparent' }}
                    label="Full Name"
                    theme={{ colors: { text: '#FFF', placeholder: '#C7C7CD' } }}
                    underlineColor='#FFF'
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    style={{ backgroundColor: 'transparent' }}
                    label="Mobile Phone"
                    theme={{ colors: { text: '#FFF', placeholder: '#C7C7CD' } }}
                    underlineColor='#FFF'
                    keyboardType="phone-pad"
                    onChangeText={text => setMobile(text)}
                />
            </View>
            <Button
                disabled={loading}
                loading={loading}
                style={styles.btn}
                mode="contained"
                onPress={onLogin}
            >
                ENTER
            </Button>
            <Snackbar
                style={{ backgroundColor: Colors.red600 }}
                visible={!!warning}
                onDismiss={() => setWarning("")}
                duration={2000}
            >
                <Text style={{ color: Colors.white }}>{warning}</Text>
            </Snackbar>
        </>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        top: '35%',
        marginHorizontal: '20.5%'
    },
    btn: {
        marginTop: '73.23%',
        width: '61.1%',
        alignSelf: 'center',
        borderRadius: 70,
    },
})

export default Login