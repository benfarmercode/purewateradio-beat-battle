import { View, Text, Alert, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors';
import Header from '@/components/Header';
import { Icons } from '@/constants/Icons';

export default function QRCode() {
   

    return (

        <View style={styles.container}>
            <Header absolute={true} logoColor={Colors.white} />
            <Image style={[styles.topBanner, { height: 150, tintColor: Colors.red }]} source={{ uri: Icons.dancers }} />
            <Image style={[styles.fighter,]} source={{ uri: Icons.fighters }} />
            <Image style={[styles.qrcode,]} source={{ uri: Icons.qrcode }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.darkBlue,
    },
   
    qrcode: {
        width: 500,
        height: 500,
        aspectRatio: 500 / 500,
        // tintColor: 'red',
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        // objectFit: 'contain',
        // zIndex: 1,
        // opacity: 1,
    },
    topBanner: {
        height: 'auto',
        width: '100%',
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.3,
        aspectRatio: 4838 / 346,
    },

    star: {
        width: '15%',
        height: 'auto',
        aspectRatio: 756 / 631,
        position: 'absolute',
        top: '85%',
        left: '25%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain',
        opacity: 0.5,
    },

    starSmall: {
        width: '15%',
        height: 'auto',
        aspectRatio: 363 / 378,
        // tintColor: 'red',
        position: 'absolute',
        top: '85%',
        left: '75%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain',
    },
    fighter: {
        width: '100%',
        height: 1000,
        aspectRatio: 2204 / 1301,
        // tintColor: 'red',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain',
        zIndex: -1,
        opacity: 0.1,
    },
})