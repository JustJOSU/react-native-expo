import React from 'react';
import { View, Text, FlatList, Button, SafeAreaView, StatusBar } from 'react-native';

const Item = ({ title }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{title}</Text>
    </View>
);

const CoinList = ({ coins }) => {
    const renderItem = ({ item }) => (
        <Item title={item.market} />
    );
    return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
            <Button title="test" />
            <Button title="test2" />
            <FlatList
                data={coins.krw}
                renderItem={renderItem}
                keyExtractor={item => item.market}
            />
        </SafeAreaView>
    )
}

export default CoinList;