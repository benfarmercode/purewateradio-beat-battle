import { View, StyleSheet, useWindowDimensions } from 'react-native'
// import React, { useEffect, useState } from 'react'
import GlobalStyles from '@/app-style/GlobalStyles';
import AdminScoring from '@/components/AdminScoring';
import AdminProfile from '@/components/AdminProfile';
import AdminAppState from '@/components/AdminAppState';
import AdminCurrentScreen from '@/components/AdminCurrentScreen';
import AdminShowdown from '@/components/AdminShowdown';
import AdminVoting from '@/components/AdminVoting';
import Header from '@/components/Header';
import { ScrollView } from 'react-native';

export default function Admin() {

    const {width, height} = useWindowDimensions()

    const layout = width < 768 ? styles.col : styles.twoCol;


    return (
        <View style={styles.container}>

            <Header absolute={false} showAdmin={true} />

            <ScrollView>
                <View style={styles.controls}>

                    <View style={layout}>
                        <AdminAppState />
                        <AdminScoring />
                    </View>

                    <View style={layout}>
                        <AdminCurrentScreen />
                        <AdminShowdown />
                    </View>

                    <View style={layout}>
                        <AdminVoting />
                        <AdminProfile />
                    </View>


                </View>

            </ScrollView>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    name: {
        fontWeight: 500,
        marginTop: 10,
    },
    controls: {
        // gap: 15,
        flex: 1,
        height: '100%',
        gap: 15,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    twoCol: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        // gap: 50,
    },
    col: {
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        gap: 15,
        alignItems: 'stretch',
    },
})