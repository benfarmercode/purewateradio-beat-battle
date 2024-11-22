

import { View, StyleSheet, Alert, Text, ActivityIndicator, ScrollView, Image } from "react-native";
import { Stack } from 'expo-router';
import { useEffect, useState } from "react";
import { useWindowDimensions } from 'react-native';
import ScoreboardView from "@/components/ScoreboardView";
import ScoreboardViewCopy from "@/components/ScoreboardViewCopy";
import Header from "@/components/Header";

export default function Scoreboard() {
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        console.log(width, height)
    }, [width, height])

    return (
        <>
            <Stack.Screen options={{ title: 'Scoreboard' }} />
            <View style={{ flex: 1 }}>
                {/* {width < 768 &&
                    <ScrollView style={styles.scrollView}>
                        <ScoreboardViewCopy />
                    </ScrollView>
                }
                {width >= 768 && */}
                    <ScoreboardViewCopy />
                {/* } */}
            </View>
        </>
    );
}



const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
})
