import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, FlatList, Text } from 'react-native';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://172.20.10.2:3000');

const Item = ({ title }) => (
    <View style={{ margin: 10 }}>
        <Text>CODE : {title.code}</Text>
        <Text>PRICE : {title.price}</Text>
    </View>
);

let ignore = false;
function HomeScreen() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get('http://172.20.10.2:3000/searchMarketCode')
            setData(result.data);
        }
        if (!ignore) {
            fetchData();
            ignore = true;
        }
    }, [])

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