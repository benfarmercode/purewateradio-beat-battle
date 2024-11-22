import { View, Text, Image, StyleSheet, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ParticipantView from '@/components/ParticipantView'
import GlobalStyles from '@/app-style/GlobalStyles'
import { Participant } from '@/types/db'
import { useParticipants } from '@/hooks/useParticipants'
import { useAppStateStore } from '@/hooks/useAppStateStore'
import Header from '@/components/Header'
import { Colors } from '@/constants/Colors'
import { Icons } from '@/constants/Icons'
import TextFont from '@/components/TextFont'

export default function Beat() {
    // const [rounds, setRounds] = useState(null)
    const appState = useAppStateStore((state) => state.appState);
    const rounds = useAppStateStore((state) => state.rounds)
    const { fetchRounds } = useAppStateStore();
    const { height, width } = useWindowDimensions();
    // const roundName = useAppStateStore((state) => state.roundName);
    // const currentScreen = useAppStateStore((state) => state.currentScreen);

    useEffect(() => {
        fetchRounds();
        console.log(rounds)
    }, []);

    if (!rounds) {
        return
    }

    return (
        <>
            <Header absolute={true} />
            <View style={[styles.container]}>

                <View style={[styles.inner]}>
                    <View style={{ width: width < 768 ? '100%' : 700 }}>
                        <TextFont text={'Round ' + appState?.current_round + ':'} fontSize={'med'} color={Colors.darkBlue} />
                        <TextFont text={rounds[Number(appState?.current_round) - 1].title + ':'} fontSize={'xl'} color={Colors.darkBlue} />
                        <TextFont text={String(rounds[Number(appState?.current_round) - 1].description)} fontSize={'med'} color={Colors.darkBlue} />
                    </View>

                </View>
                <Image style={[styles.topBanner, { height: width < 768 ? 50 : 150, tintColor: Colors.red }]} source={{ uri: Icons.dancers }} />
                <Image style={[styles.star,]} source={{ uri: Icons.star }} />
                <Image style={[styles.starSmall,]} source={{ uri: Icons.starSmall }} />
                <Image style={[styles.fighter,]} source={{ uri: Icons.fighters }} />
            </View>
        </>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 16,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    copyWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBanner: {
        width: '100%',
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },

    star: {
        width: '15%',
        height: 'auto',
        aspectRatio: 756 / 631,
        position: 'absolute',
        top: '75%',
        left: '25%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain',
    },

    starSmall: {
        width: '15%',
        height: 'auto',
        aspectRatio: 363 / 378,
        // tintColor: 'red',
        position: 'absolute',
        top: '75%',
        left: '75%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain',
    },
    fighter: {
        width: '100%',
        height: 'auto',
        aspectRatio: 2204 / 1301,
        // tintColor: 'red',
        position: 'absolute',
        top: '30%',
        left: '0%',
        transform: 'translate(-0%, -0%)',
        objectFit: 'contain',
        zIndex: -1,
        opacity: 0.1,
    },
    screen: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    preheading: {
        fontSize: 40
    },
    heading: {
        fontSize: 60
    },
    description: {
        fontSize: 20,
        maxWidth: 300,
    },

});
