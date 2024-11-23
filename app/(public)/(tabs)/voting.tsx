import { View, Text, Alert, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Poll, Vote } from '@/types/db';
import { supabase } from '@/lib/supabase';
import GlobalStyles from '@/app-style/GlobalStyles';
import TextFont from '@/components/TextFont';
import { Colors } from '@/constants/Colors';
import Header from '@/components/Header';
import { Icons } from '@/constants/Icons';
import { useAppStateStore } from '@/hooks/useAppStateStore';

export default function Voting() {
    const id = '1';

    const [poll, setPoll] = useState<Poll | null>(null)
    const votingState = useAppStateStore((state) => state.votingState);
    const { fetchVotingState } = useAppStateStore();
    // const [votes, setVotes] = useState<Vote[] | null>(null)

    const votes = useAppStateStore((state) => state.votes)
    const fetchVotes = useAppStateStore(state => state.fetchVotes);
    const { appState } = useAppStateStore();

    // Fetch votes on mount
    useEffect(() => {
        console.log("Fetching votes...");
        fetchVotes();// This fetches votes from the Supabase table and updates the store
    }, [appState]);

    useEffect(() => {
        fetchVotingState();
    }, [votingState]);


    // const fetchVotes = async () => {
    //     console.log('Fetching...');
    //     let { data, error } = await supabase
    //         .from('vote')
    //         .select('*')

    //     if (error) {
    //         Alert.alert('Error fetching data')
    //         console.log('Error fetching data')
    //     } else if (data) {
    //         setVotes(data)
    //     }
    // }
    // useEffect(() => {
    //     console.log("NEW VOTES")
    //     console.log(votes)
    // }, [votes]);

    useEffect(() => {
        const fetchPolls = async () => {
            console.log('Fetching...');
            let { data, error } = await supabase
                .from('polls')
                .select('*')
                .eq('id', Number.parseInt(id))
                .single();

            if (error) {
                Alert.alert('Error fetching data')
                console.log('Error fetching data')
            } else if (data) {
                setPoll(data)
            }
        }
        fetchPolls();
        // fetchVotes();
    }, []);

    if (!poll) {
        return;
    }

    const countVotes = (votes: Vote[], option: string) => {
        return Number(votes?.filter((vote) => {
            return vote.option == option
        }).length) * 100 / votes?.length
    }

    return (

        <View style={styles.container}>
            <Header absolute={true} logoColor={Colors.white} />
            <Image style={[styles.topBanner, { height: 150, tintColor: Colors.red }]} source={{ uri: Icons.dancers }} />
            <Image style={[styles.star,]} source={{ uri: Icons.star }} />
            <Image style={[styles.starSmall,]} source={{ uri: Icons.starSmall }} />
            <Image style={[styles.fighter,]} source={{ uri: Icons.fighters }} />
            <TextFont text={poll.question.toUpperCase()} fontSize='xl' color={Colors.white} />
            <View style={styles.optionsContainer}>
                <View style={styles.options}>
                    {poll?.options?.map(option => (
                        <View key={option} style={styles.option}>
                            <View style={styles.optionText}>
                                {votes && votingState != 'WAITING' &&
                                    <View style={[styles.innerCount, { width: `${countVotes(votes, option)}%` }]}>
                                    </View>
                                }
                                <TextFont text={option} fontSize='large' color={Colors.darkBlue} />
                            </View>
                            {votes && votingState != 'WAITING' &&
                                <View style={styles.optionResult}>
                                    <TextFont
                                        text={String(countVotes(votes, option).toFixed(1)) + '%'}
                                        fontSize='med'
                                        color={Colors.white}
                                    />
                                </View>
                            }
                        </View>
                    ))}
                </View>
            </View>

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
        opacity: 0.2,
    },
    heading: {
        fontSize: 56,
        fontWeight: 600,
        textAlign: 'center',
    },
    optionsContainer: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    options: {
        gap: 5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    option: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    optionText: {
        flex: 1,
        backgroundColor: Colors.gray,
        borderColor: Colors.darkBlue,
        borderWidth: 2,
        padding: 50,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,

    },
    optionResult: {
        paddingHorizontal: 40
    },
    innerCount: {
        width: '10%',
        padding: 50,
        borderRadius: 50,
        position: 'absolute',
        // flex: 1,
        backgroundColor: Colors.yellow,
    }
})