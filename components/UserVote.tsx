import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable, Button, ActivityIndicator, Alert } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from 'react';
import { Poll, Vote } from "@/types/db";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import GlobalStyles from "@/app-style/GlobalStyles";
import TextFont from "./TextFont";
import { Colors } from "@/constants/Colors";

export default function UserVote() {
    const id = '1'
    const [selected, setSelected] = useState('')
    const [userVote, setUserVote] = useState<Vote | null>(null)
    const [voteStatus, setVoteStatus] = useState('')

    const { user } = useAuth()

    const [poll, setPoll] = useState<Poll | null>(null)

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
            }
            setPoll(data)
        }
        fetchPolls();

        const fetchUserVote = async () => {
            if (!user?.id) {
                Alert.alert('Error', 'User information is missing');
                return;
            }

            let { data, error } = await supabase
                .from('vote')
                .select('*')
                .eq('poll_id', Number.parseInt(id))
                .eq('user_id', user.id)
                .limit(1)
                .single();

            if (error) {
                if (error.code != "PGRST116") {
                    Alert.alert(error.message);
                    console.log(error)
                }
                else {
                    console.log("No vote data fetched")
                    setVoteStatus('')
                }

            }
            setUserVote(data)
            if (data) {
                setSelected(data.option)
                console.log(data)
                // setVoteStatus(data.option)
            }
        }
        fetchUserVote();
    }, []);

    const vote = async () => {
        setVoteStatus('')
        if (!selected) {
            Alert.alert('Please select an option before voting!');
            console.warn('Please select an option before voting!');
            return;
        }

        if (!poll?.id || !user?.id) {
            Alert.alert('Error', 'Poll or user information is missing');
            console.warn('Error', 'Poll or user information is missing');
            return;
        }

        if (userVote) {
            const { data, error } = await supabase
                .from('vote')
                .upsert([{
                    id: userVote?.id || undefined,
                    option: selected,
                    poll_id: poll?.id,
                    user_id: user?.id
                }])
                .select()
                .single()

            if (error) {
                Alert.alert(error.message)
                console.error(error.message)
            }
            else {
                setUserVote(data);
                setVoteStatus("Vote updated!")
            }
        }
        else {
            const { data, error } = await supabase
                .from('vote')
                .insert([{
                    option: selected,
                    poll_id: poll?.id,
                    user_id: user?.id
                }])
                .select()
                .single()

            if (error) {
                Alert.alert(error.message)
                console.error(error.message)
            }
            else {
                setUserVote(data);
                setVoteStatus("Vote submitted!")
            }
        }
    }

    if (!poll) {
        return <ActivityIndicator />
    }

    return (
        <View style={styles.container}>
            <TextFont text={poll.question} fontSize='xl' color={Colors.white} />
            <View style={styles.optionsContainer}>
                {poll?.options?.map(option => (
                    <Pressable onPress={() => setSelected(option)} key={option} style={[styles.option, { backgroundColor: option === selected ? Colors.yellow : Colors.gray }]}>
                        {/* <Feather
                            name={option === selected ? 'check-circle' : 'circle'}
                            size={18}
                            color={option === selected ? Colors.blue : 'gray'} /> */}
                        <TextFont text={option} fontSize='large' color={Colors.darkBlue} />
                    </Pressable>
                ))}
            </View>
            <Button onPress={vote} title="Vote" />
            <View style={styles.voteStatus}>
                <TextFont text={voteStatus} fontSize='med' color={Colors.white} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        width: '100%',
    },
    question: {
        fontSize: 32,
        fontWeight: 600,
    },
    optionsContainer: {
        gap: 10,
        marginBottom: 20,
    },
    option: {
        // backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    optionText: {
        fontSize: 24
    },
    voteStatus:{
        position: 'absolute',
        bottom: 50,

    }
})