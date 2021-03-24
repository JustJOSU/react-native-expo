import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, Text } from 'react-native';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://172.20.10.2:3000');

const HomeScreen = () => {
    const [code, setCode] = useState({});
    axios.get('http://172.20.10.2:3000/searchMarketCode')
        .then(data => {
            setCode([data.data]);
        })

    const [text, setText] = useState('');
    useEffect(() => {
        socket.on("connect", () => {
            socket.on("message", (data) => {
                setText(data)
            })
        })
    })
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 6, backgroundColor: "blue" }}>
                <ScrollView>
                    <Text>{console.log(code)}</Text>
                    {/* <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Text style={{ fontSize: 96 }}>If you like</Text>
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Text style={{ fontSize: 96 }}>Scrolling down</Text>
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Text style={{ fontSize: 96 }}>What's the best</Text>
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Text style={{ fontSize: 96 }}>Framework around?</Text>
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Text style={{ fontSize: 80 }}>React Native</Text> */}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
});

export default HomeScreen;