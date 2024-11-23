import { View, Text, StyleSheet, ActivityIndicator, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import ParticipantView from '@/components/ParticipantView'
import GlobalStyles from '@/app-style/GlobalStyles'
import { Participant } from '@/types/db'
import { useParticipants } from '@/hooks/useParticipants'
import { useAppStateStore } from '@/hooks/useAppStateStore'
import { Colors } from '@/constants/Colors'
import TextFont from '@/components/TextFont'
import { Icons } from '@/constants/Icons'
import Header from '@/components/Header'

export default function Beat() {
    const [totalScore, setTotalScore] = useState(0.0);
    const [currentParticipant, setCurrentParticipant] = useState<Participant>()
    const { participants, loading } = useParticipants();

    const { appState, fetchRounds, rounds } = useAppStateStore();

    const {width, height} = useWindowDimensions()

    // const currentScreen = useAppStateStore((state) => state.currentScreen);

    useEffect(() => {
        const newParticipant = participants.find((participant) => participant.id === appState?.participant);
        setCurrentParticipant(newParticipant);

        if (appState) {
            const total = appState?.current_score_1 + appState?.current_score_2 + appState?.current_score_3;
            setTotalScore(total)
        }

        const runFetchRounds = async () => {
            await fetchRounds();
        };
        runFetchRounds();
    }, [appState, participants]);

    if (loading) {
        return <ActivityIndicator />;
    }

    if (!rounds) {
        return <ActivityIndicator />;
    }

    const textColor = Colors.gray;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.blue }}>
            <Header absolute={true}/>
            <View style={[styles.screen,]}>
                <View style={styles.col}>
                    <View style={styles.name}>
                        <TextFont text={String(currentParticipant?.name)} fontSize='xl' color={Colors.white} />
                    </View>
                    <View style={styles.participant}>
                        <Image
                            source={{ uri: currentParticipant?.icon_url }}
                            style={styles.avatar}
                        />
                        <Image style={[styles.wingRight,]} source={{ uri: Icons.wingRight }} />
                        <Image style={[styles.starSmall,]} source={{ uri: Icons.starSmall }} />
                    </View>
                </View>

                <View style={styles.col}>

                    <View style={styles.roundName}>
                        <TextFont text={'Round ' + appState?.current_round + ': ' + rounds[Number(appState?.current_round) - 1].title} fontSize='large' color={textColor} />
                        {/* <TextFont text={'Set ' + appState?.current_set} fontSize='med' color={textColor} /> */}
                    </View>

                    {/* <View style={styles.scoresWrapper}>
                        <TextFont text={String(totalScore)} fontSize='2xl' color={textColor} />
                        <View style={styles.judgesWrapper}>
                            <View>
                                <TextFont text={String(appState?.current_score_1)} fontSize='large' color={textColor} />
                                <TextFont text={'XINA'} fontSize='med' color={textColor} />
                            </View>
                            <View>
                                <TextFont text={String(appState?.current_score_2)} fontSize='large' color={textColor} />
                                <TextFont text={'OBI'} fontSize='med' color={textColor} />
                            </View>
                            <View>
                                <TextFont text={String(appState?.current_score_3)} fontSize='large' color={textColor} />
                                <TextFont text={'ECHO'} fontSize='med' color={textColor} />
                            </View>
                        </View>

                    </View> */}

                    <Image style={[styles.musicNote,]} source={{ uri: Icons.musicNote }} />


                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    roundName: {
        margin: 'auto',
    },
    screen: {
        flexDirection: 'row',
        // backgroundColor: Colors.gray,
        flex: 1,
    },
    col: {
        width: '50%',
        // marginTop: 16,
        overflow: 'visible',
        // flex: 1,
    },
    wingRight: {
        width: '15%',
        height: 'auto',
        aspectRatio: 599 / 422,
        // tintColor: 'red',
        position: 'absolute',
        top: '25%',
        left: '75%',
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
        left: '25%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain',
    },
    musicNote: {
        width: '100%',
        height: 'auto',
        aspectRatio: 797/867,
        // tintColor: 'red',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain',
        opacity: 0.1,
    },
    participant: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'relative',
        overflow: 'visible',
    },
    avatar: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: 'contain',
        opacity: 0.9,
        overflow: 'visible',
        // backgroundColor: 'blue',
        // borderRadius: '100%',
    },
    scoresWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    totalScore: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 128,
    },
    judgesWrapper: {
        padding: 10,
        gap: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 0.33,
    },
    judgeName: {
        textAlign: 'center',
        fontWeight: 'bold',
        // fontSize: 48,
    },
    judgeScore: {
        textAlign: 'center',
        fontWeight: 'bold',
        // fontSize: 128,
    },
    name: {
        position: 'absolute',
        top: '80%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 1,
        // fontSize: 60,
    },
    round: {
        fontSize: 20
    },
    set: {
        fontSize: 20
    },

});
