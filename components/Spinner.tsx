import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native'
import React from 'react'

const Spinner = () => {
    return (
        <View testID='container' style={styles.centered}>
            <ActivityIndicator testID='spinner' size='large' color='#0000ff' />
        </View>
    )
}
export default Spinner

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})