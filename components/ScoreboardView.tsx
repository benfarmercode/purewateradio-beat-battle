

import { View, StyleSheet, Alert, Text, ActivityIndicator, ScrollView, Image } from "react-native";
import { useEffect, useState } from "react";
import { Score } from "@/types/db";
import { useParticipants } from "@/hooks/useParticipants";
import { useScores } from "@/hooks/useScores";

import { useWindowDimensions } from 'react-native';
import TextFont from "./TextFont";

export default function Scoreboard() {

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
        <View style={width < 768 ? styles.participantsMobile : styles.participantsDesktop}>
            {participants
                .sort((a, b) => b.total_score - a.total_score)
                .map((participant) => {
                    const participantScores = scores.filter(score => score.participant === participant.id);
                    const totalScore = calculateTotalScore(participantScores)
                    return (
                        <View key={`${participant.id}-score-column`} style={width < 768 ? styles.participantWrapperMobile : styles.participantWrapperDesktop}>
                            <View style={width < 768 ? styles.imageWrapperMobile : styles.imageWrapperDesktop}>
                                <Image style={width < 768 ? styles.imageMobile : styles.imageDesktop}
                                    source={{ uri: participant.image_url }}
                                />
                            </View>
                            <View style={width < 768 ? styles.scoresMobile : styles.scoresDesktop}>
                                {participantScores.length > 0 ? (
                                    participantScores.map((participantScore, index) => {
                                        const totalScore = (participantScore.score_1 || 0) + (participantScore.score_2 || 0) + (participantScore.score_3 || 0);
                                        return (
                                            <Text key={`${participant.id}-round-${participantScore.round_number}-${index}`} style={styles.totalScore}>
                                                {totalScore}
                                            </Text>
                                        );
                                    })
                                ) : (
                                    <Text key={participant.id} style={styles.totalScore}>
                                        0
                                    </Text>
                                )}
                            </View>
                        </View>
                    );
                })}
        </View>
    );
}



const styles = StyleSheet.create({
    participantsMobile: {
        flexDirection: 'column',
        flex: 1,
    },
    participantsDesktop: {
        flexDirection: 'row',
        flex: 1,
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
        resizeMode: 'cover',
        opacity: 0.9,
        backgroundColor: 'blue',
        // borderRadius: '100%',
    },
    imageMobile: {
        width: 300,
        height: 300,
        // flex: 1,
        resizeMode: 'cover',
        opacity: 0.9,
        backgroundColor: 'blue',
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