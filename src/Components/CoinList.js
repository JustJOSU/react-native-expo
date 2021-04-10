import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const CoinList = ({ coins }) => {
    const [market, setMarket] = useState(Object.keys(coins.krw));

    const Item = ({ title }) => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{title}</Text>
        </View>
    );
    const renderItem = ({ item }) => (
        <Item title={item} />
    );
    const handleEvent = (select) => {
        setMarket(coins[select]);
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
                data={market}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    )
}

export default CoinList;