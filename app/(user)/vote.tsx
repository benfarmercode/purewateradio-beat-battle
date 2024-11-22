
import { View, Text, StyleSheet, Image, Button, ActivityIndicator, Alert, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from 'react';
import GlobalStyles from "@/app-style/GlobalStyles";
import { useAppStateStore } from "@/hooks/useAppStateStore";
import UserVote from "@/components/UserVote";
import TextFont from "@/components/TextFont";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { Icons } from "@/constants/Icons";


export default function VoteScreen() {

    const votingState = useAppStateStore((state) => state.votingState);
    const {fetchVotingState} = useAppStateStore();
    const {width, height} = useWindowDimensions();

    useEffect(() => {
        fetchVotingState();
    }, [votingState]);

    if (!votingState) {
        return <ActivityIndicator />
    }

    return (
        <View style={GlobalStyles.container}>
            <Header absolute={true} logoColor={Colors.white} />
            <View style={[styles.container]}>

                {votingState == 'WAITING' &&
                    <TextFont text={'Voting has not opened yet.'} fontSize="xl" color={Colors.white}/>
                }
                {votingState == 'OPEN' &&
                    <UserVote />
                }
                {votingState == 'CLOSED' &&
                    <TextFont text={'Voting has closed.'} fontSize="xl" color={Colors.white}/>
                }
                <Image style={[styles.topBanner, { height: 150, tintColor: Colors.red }]} source={{ uri: Icons.dancers }} />
                <Image style={[styles.star,]} source={{ uri: Icons.star }} />
                <Image style={[styles.starSmall,]} source={{ uri: Icons.starSmall }} />
                <Image style={[styles.fighter,]} source={{ uri: Icons.fighters }} />
                {/* <Image style={[styles.wingLeft,]} source={{ uri: Icons.wingLeft }} /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: Colors.darkBlue,
    },
    wingLeft: {
        width: '15%',
        height: 'auto',
        aspectRatio: 597 / 422,
        position: 'absolute',
        top: '10%',
        left: '45%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain',
        opacity: 0.4,
    },
    inner: {
        padding: 16,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    question: {
        fontSize: 32,
        fontWeight: 600,
    },
    optionsContainer: {
        gap: 10,
    },
    option: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    optionText: {
        fontSize: 24
    },
    copyWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBanner: {
        height: 'auto',
        width: '100%',
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.3,
        aspectRatio: 4838/346,
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