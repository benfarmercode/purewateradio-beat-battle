import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import React, { useState } from 'react'

type Props = {
    name: string,
    image: ImageSourcePropType,
    // score: number
}

export default function ParticipantView({ name, image }: Props) {
    return (
        <View style={styles.participant}>
            {/* <Text style={styles.name}>{name}</Text> */}
            <Image
                source={image}
                style={styles.avatar}
            />
            {/* <Text style={styles.score}>{score}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    participant: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
    },
    avatar: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: 'cover',
        opacity: 0.9,
        // backgroundColor: 'blue',
        // borderRadius: '100%',
    },
    name: {
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: 500,
        // marginBottom: 5
    },
})