import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const CoinList = ({ coins, prices }) => {
    const [price, setPrice] = useState(Object.entries(prices.krw));
    const [select, setSelect] = useState('krw');
    useEffect(() => {
        setPrice(Object.entries(prices[select]));
    }, [prices])

    const Item = ({ item, index }) => (
        <View style={{ borderWidth: 1, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{`${item[0]} : ${item[1]}`}</Text>
        </View>
    );
    const renderItem = ({ item, index }) => (
        <Item item={item} index={index} />
    );
    const handleEvent = (select) => {
        setSelect(select);
    }
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
            <TouchableOpacity onPress={() => handleEvent('krw')}>
                <Text>KRW</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEvent('btc')} >
                <Text>BTC</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEvent('usdt')} >
                <Text>USDT</Text>
            </TouchableOpacity>
            <FlatList
                data={price}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

export default CoinList;