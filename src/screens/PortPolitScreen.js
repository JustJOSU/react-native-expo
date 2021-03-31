import React from 'react';
import { View, Button, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { increseCount, decreseCount } from '../reducers/counter';

const PortPolioScreen = () => {
    const dispatch = useDispatch();

    const objects = useSelector(state => state.counter);

    const increase = () => {
        dispatch(increseCount());
    }
    const decrese = () => {
        dispatch(decreseCount());
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{objects.count}</Text>
            <Text>{objects.tick}</Text>
            <Button title="증가" onPress={increase} />
            <Button title="감소" onPress={decrese} />
        </View>
    )
}

export default PortPolioScreen;