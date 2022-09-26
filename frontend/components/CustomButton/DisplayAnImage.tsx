import React from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';


const DisplayAnImage = () => {
    const { height } = useWindowDimensions()
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: 'http://clipart-library.com/images_k/dog-png-transparent/dog-png-transparent-4.png',
                }} style={[styles.image, { height: height * 0.3 }]}
                resizeMode="contain"
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
    },
    image: {
        width: "70%",
        minWidth: 300,
        maxHeight: 200,
    },
});
export default DisplayAnImage;