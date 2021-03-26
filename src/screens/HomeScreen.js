import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, Text } from 'react-native';
import { io } from 'socket.io-client';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';


// const socket = io('http://172.20.10.2:3000');

function HomeScreen() {
    const [data, setData] = useState({ codes: [] });
    
    useEffect(() => {
        let ignore = false;
        
        async function fetchData() {
            const result = await axios.get('http://192.168.35.164:3000/searchMarketCode');
            const coinList = [];
            for(let value of result.data){
                let temp = {}
                temp[value] = 0;
                coinList.push(temp);
            }
            if(!ignore) setData(coinList);
        }

        fetchData();
        return () => { ignore = true; }
    }, [])
    // useEffect(() => {
    //     socket.on("connect", () => {
    //         socket.on("message", (data) => {
    //             setText(data)
    //         })
    //     })
    // })
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 6, backgroundColor: "blue" }}>
                <ScrollView>
                    <Text>{console.log(data)}</Text>
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