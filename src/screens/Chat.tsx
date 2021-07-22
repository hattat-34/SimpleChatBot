import React, { useState, useRef } from 'react'
import { Interactions } from 'aws-amplify';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../styles/Colors';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import awsconfig from '../../awsconfig';

type Dialog = {
    id: string,
    message: string,
    from: 'system' | 'me',
}

type ChatStackProp = StackScreenProps<RootStackParamList, 'ChatScreen'>

const Chat = ({ route }: ChatStackProp) => {
    const [text, setText] = useState('')
    const [dialog, setDialog] = useState<Dialog[]>([
        {
            id: Date.now().toString(),
            message: 'Hello, I am Scotty. I can help you to discover out of the world.',
            from: 'system',
        }
    ])
    const [completed, setCompleted] = useState(false)
    const listRef = useRef<FlatList<Dialog> | null>()

    const onSubmit = async () => {
        const message = text
        setText('');

        setDialog(dialog => ([
            ...dialog,
            {
                id: Date.now().toString(),
                message,
                from: 'me',
            }
        ]));

        const response = await Interactions.send(awsconfig.Interactions.bots.SpaceTrip.name, text);

        setDialog(dialog => ([
            ...dialog,
            {
                id: response.$metadata.requestId,
                message: response.message,
                from: 'system',
            }
        ]));

        response.dialogState == 'Fulfilled' && setTimeout(() => setCompleted(true), 300)
    }

    const renderMessages = ({ item }: { item: Dialog }) => {
        const position = item.from == 'me' ? 'right' : 'left'

        return (
            <View style={styles[position].container}>
                {
                    position == 'left' ?
                        <Image
                            style={styles.regular.botImg}
                            source={require('../../assets/images/avatar.png')}
                        />
                        :
                        null
                }
                <View style={styles[position].balloon}>
                    <Text style={[styles[position].text, styles.regular.bold]}>{position == 'left' ? 'Scotty' : route.params.username}</Text>
                    <Text style={styles[position].text}>{item.message}</Text>
                </View>
            </View>
        )
    }

    return (
        <View
            style={[
                styles.regular.container,
                completed ? { backgroundColor: '#E5E5E5' } : { backgroundColor: '#FFF' }
            ]}
        >
            <FlatList
                ref={ref => listRef.current = ref}
                contentContainerStyle={{ padding: 10 }}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={dialog}
                renderItem={renderMessages}
                onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => listRef.current?.scrollToEnd({ animated: true })}
            />
            <View style={styles.regular.seperator} />
            <View
                style={[
                    styles.regular.textBoxContainer,
                    text
                        ? { paddingLeft: 25 }
                        : { paddingHorizontal: 25 }
                ]}
            >
                <TextInput
                    multiline
                    editable={!completed}
                    style={styles.regular.textBox}
                    onChangeText={text => setText(text)}
                    value={text}
                    keyboardType='default'
                    returnKeyType='none'
                />
                {text.length > 0 &&
                    <TouchableOpacity style={styles.regular.submit}
                        activeOpacity={0.1}
                        onPress={onSubmit}
                    >
                        <Icon name='send' size={35} color={Colors.SECONDARY_COLOR} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = {
    regular: StyleSheet.create({
        container: {
            flex: 1,
        },
        textBoxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 10,
        },
        textBox: {
            flex: 1,
            maxHeight: 70,
            backgroundColor: '#E5E5E5',
            borderRadius: 61,
            paddingHorizontal: 25,
        },
        seperator: {
            borderBottomWidth: 1,
            marginVertical: 10,
            borderColor: '#D4D4D4',
        },
        bold: {
            fontFamily: 'ProximaNova-Bold',
            fontSize: 17,
            marginBottom: 5,
        },
        botImg: {
            width: 50,
            height: 50,
            marginRight: 10,
        },
        submit: {
            marginHorizontal: 10,
        },
    }),
    left: StyleSheet.create({
        container: {
            flexDirection: 'row',
            margin: 10,
        },
        balloon: {
            alignSelf: 'flex-start',
            backgroundColor: '#EEECF3',
            maxWidth: '75%',

            paddingHorizontal: 15,
            paddingTop: 10,
            paddingBottom: 15,
            borderRadius: 20,
        },
        text: {
            color: Colors.SECONDARY_COLOR,
            fontFamily: 'ProximaNova-Regular',
            fontSize: 15,
        },
    }),
    right: StyleSheet.create({
        container: {
            flexDirection: 'column',
            margin: 10,
        },
        balloon: {
            alignSelf: 'flex-end',
            backgroundColor: Colors.SECONDARY_COLOR,
            maxWidth: '60%',
            paddingHorizontal: 15,
            paddingTop: 10,
            paddingBottom: 15,
            borderRadius: 20,
        },
        text: {
            color: '#FFF',
            fontFamily: 'ProximaNova-Regular',
            fontSize: 15,
        },
    })
}
export default Chat