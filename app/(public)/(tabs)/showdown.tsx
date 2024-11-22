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

export default function Showdown() {
    const [totalScore, setTotalScore] = useState(0.0);
    const [participant1, setParticipant1] = useState<Participant>()
    const [participant2, setParticipant2] = useState<Participant>()
    const { participants, loading } = useParticipants();

    const showdown = useAppStateStore((state) => state.showdown);
    // const currentScreen = useAppStateStore((state) => state.currentScreen);

    useEffect(() => {
        const participantOne = participants.find((participant) => participant.id === showdown?.participant_1);
        setParticipant1(participantOne);

        const participantTwo = participants.find((participant) => participant.id === showdown?.participant_2);
        setParticipant2(participantTwo);

    }, [showdown, participants]);

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={[styles.container, { backgroundColor: '#A50808' }]}>
            <Header absolute={true} logoColor={Colors.yellow}/>
            <View style={styles.title}>
                <TextFont text={'The Showdown'} fontSize='large' color={Colors.gray} />
            </View>

            <View style={styles.flexRow}>
                <View style={styles.participant}>
                    <Image
                        source={{ uri: participant1?.icon_url }}
                        style={styles.avatar}
                    />
                    <TextFont text={participant1 ? participant1.name : ''} fontSize='large' color={Colors.gray} />
                </View>
                <View style={styles.participant}>

                    <Image
                        source={{ uri: participant2?.icon_url }}
                        style={styles.avatar}
                    />
                    <TextFont text={participant2 ? participant2.name : ''} fontSize='large' color={Colors.gray} />

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
        marginTop: 140,
    },
    flexRow: {
        flexDirection: 'row',
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
        width: '50%',
        height: '50%',
        // flex: 1,
        resizeMode: 'contain',
        opacity: 1,
        overflow: 'visible',
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