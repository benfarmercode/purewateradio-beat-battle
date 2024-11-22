

import { View, StyleSheet, Alert, Text, ActivityIndicator, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import { Score } from "@/types/db";
import { useParticipants } from "@/hooks/useParticipants";
import { useScores } from "@/hooks/useScores";

import { useWindowDimensions } from 'react-native';
import { Colors } from "@/constants/Colors";
import { Icons } from "@/constants/Icons";
import TextFont from "./TextFont";
import Header from "./Header";

export default function ScoreboardCopy() {

    const { participants, loading } = useParticipants();
    const { scores, scoresLoading } = useScores();

    const { height, width } = useWindowDimensions();

    const calculateTotalScore = (participantScores: Score[]) => {
        let totalScore = 0;
        if (participantScores.length > 0) {
            participantScores.forEach(participantScore => {
                totalScore += (participantScore.score_1 || 0) + (participantScore.score_2 || 0) + (participantScore.score_3 || 0);
            })
        }

        return totalScore
    }

    useEffect(() => {
        participants.forEach(participant => {
            const participantScores = scores.filter(score => score.participant === participant.id)
            if (participantScores.length > 0) {
                participantScores.forEach(participantScore => {
                    const totalScore = (participantScore.score_1 || 0) + (participantScore.score_2 || 0) + (participantScore.score_3 || 0)
                })
            }
        })
    }, [scores, participants]);

    if (loading || scoresLoading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
            <Header absolute={true} />
            <View style={styles.copyWrapper}>
                <TextFont text='PUREWATERADIO x REDBULL PRESENT' fontSize='sm' color={Colors.darkBlue} />
                <TextFont text='THE HEAT: PRODUCER SHOWCASE' fontSize='large' color={Colors.darkBlue} />
            </View>
            <View style={width < 768 ? styles.participantsMobile : styles.participantsDesktop}>
                <Image style={[styles.topBanner, { height: width < 768 ? 50 : 150, tintColor: Colors.red }]} source={{ uri: Icons.dancers }} />
                <Image style={[styles.fighter,]} source={{ uri: Icons.fighters }} />
                {participants
                    .sort((a, b) => b.total_score - a.total_score)
                    .map((participant) => {
                        const participantScores = scores.filter(score => score.participant === participant.id);
                        const totalScore = calculateTotalScore(participantScores)
                        return (
                            <View key={`${participant.id}-score-column`} style={width < 768 ? styles.participantWrapperMobile : styles.participantWrapperDesktop}>
                                <View style={width < 768 ? styles.imageWrapperMobile : styles.imageWrapperDesktop}>
                                    <Image style={width < 768 ? styles.imageMobile : styles.imageDesktop}
                                        source={{ uri: participant.icon_url }}
                                    />
                                </View>
                                <View style={width < 768 ? styles.scoresMobile : styles.scoresDesktop}>
                                    {participantScores.length > 0 ? (
                                        participantScores.map((participantScore, index) => {
                                            const setScore = (participantScore.score_1 || 0) + (participantScore.score_2 || 0) + (participantScore.score_3 || 0);
                                            return (
                                                <TextFont text={String(setScore)} key={`${participant.id}-round-${participantScore.round_number}-${index}`} fontSize="large" color={Colors.darkBlue} />
                                            );
                                        })
                                    ) : (
                                        <TextFont text={'0'} key={`${participant.id}-round`} fontSize="large" color={Colors.darkBlue} />
                                    )}
                                </View>
                            </View>
                        );
                    })}
                <Image style={[styles.wingLeft,]} source={{ uri: Icons.wingLeft }} />
                <Image style={[styles.wingRight,]} source={{ uri: Icons.wingRight }} />
            </View>
        </View>

    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    copyWrapper: {
        flex: 0.1,
        width: '100%',
        position: 'absolute',
        top: 90,
    },
    topBanner: {
        width: '100%',
        position: 'absolute',
        top: '90%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.25,
    },

    wingLeft: {
        width: '15%',
        height: 'auto',
        aspectRatio: 597 / 422,
        position: 'absolute',
        top: '25%',
        left: '25%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain',
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
    star: {
        width: '15%',
        height: 'auto',
        aspectRatio: 756 / 631,
        position: 'absolute',
        top: '25%',
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
        top: '25%',
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
        top: '0%',
        left: '0%',
        transform: 'translate(-0%, -10%)',
        objectFit: 'contain',
        zIndex: -1,
        opacity: 0.1,
    },
    participantsMobile: {
        flexDirection: 'column',
        flex: 1,
        position: 'relative',
        marginTop: 150,
    },
    participantsDesktop: {
        flexDirection: 'row',
        flex: 1,
        position: 'relative',
    },
    participantWrapperMobile: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        // width: '20%'
    },
    participantWrapperDesktop: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        width: '20%'
    },
    imageWrapperMobile: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 1,
        position: 'relative',
        // height: 300,
    },
    imageWrapperDesktop: {
        justifyContent: 'center',
        // alignItems: 'flex-start',
        flex: 1,
        position: 'relative',
        height: '100%',
    },
    imageDesktop: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: 'contain',
        opacity: 0.9,
        // borderRadius: '100%',
    },
    imageMobile: {
        width: '100%',
        height: '100%',
        // flex: 1,
        resizeMode: 'contain',
        opacity: 0.9,
        // borderRadius: '100%',
    },
    scoresMobile: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: '5%',
        flex: 1,
    },
    scoresDesktop: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 200,
        left: '50%',
        transform: 'translate(-50%, 0)',
        // gap: '5%',
    },
    roundScore: {
        color: 'black',
        fontWeight: 'medium',
    },
    totalScore: {
        color: 'black',
        fontWeight: 'bold',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        tintColor: 'blue',
        alignSelf: 'flex-start',
        left: 20
    },

})


// const styles = StyleSheet.create({
//     participants: {
//         flexDirection: 'row',
//         flex: 1,
//     },
//     participantColumn: {
//         flexDirection: 'column',
//         justifyContent: 'center',
//         width: '20%'
//     },
//     scores: {
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     roundScore: {
//         color: 'black',
//         fontWeight: 'medium',
//     },
//     totalScore: {
//         color: 'black',
//         fontWeight: 'bold',
//     },
//     logo: {
//         width: 100,
//         height: 100,
//         resizeMode: 'contain',
//         tintColor: 'blue',
//         alignSelf: 'flex-start',
//         left: 20
//     },

// })