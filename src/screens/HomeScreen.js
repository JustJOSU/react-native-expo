import React from 'react';
import { StyleSheet, Image, View, ScrollView, Text } from 'react-native';

const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64
};

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 6, backgroundColor: "blue" }}>
                <ScrollView>
                    <Text style={{ fontSize: 96 }}>Scroll me plz</Text>
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Text style={{ fontSize: 96 }}>If you like</Text>
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Text style={{ fontSize: 96 }}>Scrolling down</Text>
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Text style={{ fontSize: 96 }}>What's the best</Text>
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Text style={{ fontSize: 96 }}>Framework around?</Text>
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Image source={logo} />
                    <Text style={{ fontSize: 80 }}>React Native</Text>
                </ScrollView>
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