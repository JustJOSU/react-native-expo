import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, Text } from 'react-native';
import { io } from 'socket.io-client';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

const socket = io('http://172.20.10.2:3000');

let ignore = false;
function HomeScreen() {
    const [data, setData] = useState({ markets: [] });
    async function getMarket() {
        const result = await axios.get('http://172.20.10.2:3000/searchMarketCode');
        setData(result.data)
    }
    if (!ignore) {
        getMarket();
        ignore = true;
    }

    // useEffect(() => {
    //     socket.on("connect", () => {
    //         socket.on("message", (res) => {
    //             setData(res);
    //             console.log(res);
    //         })
    //     })
    // })
    const Item = ({ title }) => (
        <View>
            <Text>{title}</Text>
        </View>
    );
    const renderItem = ({ item }) => (
        <Item title={Object.keys(item)[0]} />
    )
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 6, backgroundColor: "blue" }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => Object.keys(item)[0]}
                />
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