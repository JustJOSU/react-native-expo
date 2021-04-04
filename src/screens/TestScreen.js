import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CoinList from '../Components/CoinList';
import { getMarketCoins } from '../Reducer/coinReducer';

function TestScreen() {
    const { data, loading, error } = useSelector(state => state.coinReducer.coins);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMarketCoins());
    }, [dispatch])

    if (loading) {
        return (
            <View>
                <Text>로딩중...</Text>
            </View>
        )
    }
    if (error) {
        return (
            <View>
                <Text>에러발생!!!</Text>
            </View>
        )
    }
    if (!data) return null;
    return <CoinList coins={data} />
};

export default TestScreen;
