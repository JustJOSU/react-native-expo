import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CoinList from '../Components/CoinList';
import { getMarketCoins, connectTickerSocketThunk, startInit } from '../Reducer/coinReducer';

function TestScreen() {
    const { data, error } = useSelector(state => state.coinReducer.markets);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startInit());
    }, [dispatch])

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
