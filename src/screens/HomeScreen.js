import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://172.20.10.2:3000');

const Item = ({ title }) => (
    <View style={{ margin: 10 }}>
        <Text>CODE : {title.code}</Text>
        <Text>PRICE : {title.price}</Text>
    </View>
);

function HomeScreen() {
    const [data, setData] = useState(() => {
        async function fetchData() {
            const result = await axios.get('http://172.20.10.2:3000/searchMarketCode');
            setData(result.data);
        }
        fetchData();
    });
    const dRef = useRef();

    useEffect(() => {
        dRef.current = data;
    })

    useEffect(() => {
        socket.on("connect", () => {
            console.log('socket 연결');
            socket.on("message", (res) => {
                let temp = dRef.current.filter(obj => obj.code !== res.code);
                temp.push({ code: res.code, price: res.price })
                temp.sort(function (a, b) {
                    if (a.code < b.code) {
                        return -1;
                    }
                    if (a.code > b.code) {
                        return 1;
                    }
                    return 0;
                })
                setData(temp);
            })
        })
    })

    const renderItem = ({ item }) => (
        <Item title={item} />
    );

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 6, backgroundColor: "blue" }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.code}
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