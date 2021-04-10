import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CoinList from '../Components/CoinList';
import { getMarketCoins, connectTickerSocketThunk, startInit } from '../Reducer/coinReducer';

function TestScreen() {
    const marketsData = useSelector(state => state.coinReducer.markets);
    const tickerData = useSelector(state => state.coinReducer.tickerList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startInit());
    }, [dispatch])

    if (marketsData.error) {
        return (
            <View>
                <Text>에러발생!!!</Text>
            </View>
        )
    }
    if (!marketsData.data) return null;
    return <CoinList coins={marketsData.data} prices={tickerData.data} />
};

export default TestScreen;
