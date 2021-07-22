import React, { useEffect } from 'react'
import { Interactions } from 'aws-amplify';
import { ChatBot } from 'aws-amplify-react-native'

const Chat = () => {

    let userInput = "Beam me up, Scotty!";

    useEffect(() => {
        (async () => {
            // Provide a bot name and user input
            const response = await Interactions.send("SpaceTrip", userInput);

            // Log chatbot response
            console.log(response.message);
        })()
    }, [])

    const onComplete = () => {
        console.log("onComplete")
    }

    return (
        <ChatBot
            botName="SpaceTrip"
            onComplete={onComplete}
            conversationModeOn
        />
    )
}

export default Chat