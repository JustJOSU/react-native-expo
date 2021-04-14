import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const CoinList = ({ coins, prices }) => {
    const [price, setPrice] = useState(Object.entries(prices.KRW));
    const [select, setSelect] = useState('KRW');
    const [prevPrice, setPrevPrice] = useState(price);

    useEffect(() => {
        setPrevPrice(price);
        setPrice(Object.entries(prices[select]));
    }, [prices])


    const Item = ({ item, index }) => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>
                {`${item[0]} : `}
                <View style={styles.change_price(item[1]['diff'])}>
                    <Text style={styles.price(item[1]['change'])}>{item[1]['trade_price']}</Text>
                </View>
            </Text>
        </View>
    );
    const renderItem = ({ item, index }) => (
        <Item item={item} index={index}></Item>
    );
    const handleEvent = (select) => {
        setSelect(select);
        setPrice(Object.entries(prices[select]));
        setPrevPrice(price);
    }
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
            <TouchableOpacity onPress={() => handleEvent('krw')}>
                <Text>KRW</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEvent('BTC')} >
                <Text>BTC</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEvent('USDT')} >
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

const styles = {
    price: (change) => {
        switch (change) {
            case 'RISE':
                return { color: 'red' };
            case 'FALL':
                return { color: 'blue' };
            default:
                return { color: 'black' };
        }
    },
    change_price: (change) => {
        if (change) {
            return {
                borderWidth: 1,
                borderColor: change
            }
        }
    }
}

export default CoinList;