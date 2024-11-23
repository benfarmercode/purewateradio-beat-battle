import { View, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import ParticipantView from '@/components/ParticipantView'
import GlobalStyles from '@/app-style/GlobalStyles'
import { Participant } from '@/types/db'
import { useParticipants } from '@/hooks/useParticipants'
import { useAppStateStore } from '@/hooks/useAppStateStore'
import { Icons } from '@/constants/Icons'
import Header from '@/components/Header'
import { Colors } from '@/constants/Colors'
import TextFont from '@/components/TextFont'

export default function Winner() {
    const [totalScore, setTotalScore] = useState(0.0);
    const [winner, setWinner] = useState<Participant>()
    const { participants, loading } = useParticipants();

    const showdown = useAppStateStore((state) => state.showdown);
    // const currentScreen = useAppStateStore((state) => state.currentScreen);

    useEffect(() => {
        const winner = participants.find((participant) => participant.id === showdown?.winner);
        setWinner(winner);
    }, [showdown, participants]);

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={[styles.container, { backgroundColor: Colors.yellow }]}>
            <Header absolute={true} logoColor={Colors.yellow}/>
            <View style={styles.title}>
                {/* <TextFont text={'WINNER'} fontSize='xl' color={Colors.darkBlue} /> */}
            </View>

            <View style={styles.flexRow}>
                <View style={styles.participant}>
                    <Image
                        source={{ uri: winner?.icon_url }}
                        style={styles.avatar}
                    />
                    <TextFont text={winner ? winner.name : ''} fontSize='xl' color={Colors.darkBlue} />
                </View>
            </View>
            <Image style={[styles.fighter,]} source={{ uri: Icons.fighters }} />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginTop: 200,
        // position: 'absolute',
        top:'0%',
        left: '50%',
        transform: 'translate(-50%, -60%)',
    },
    flexRow: {
        flexDirection: 'row',
        // marginTop: 200,
        // gap: 10,
        flex: 1,
    },
    participant: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
        overflow: 'visible',
    },
    avatar: {
        width: '60%',
        height: '60%',
        // flex: 1,
        resizeMode: 'contain',
        opacity: 1,
        overflow: 'visible',
        marginBottom: 50,
        // backgroundColor: 'blue',
    },
    fighter: {
        width: '100%',
        height: 'auto',
        aspectRatio: 2204 / 1301,
        // tintColor: 'red',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain',
        zIndex: -1,
        opacity: 0.2,
        // tintColor: Colors.darkBlue,
    },

});