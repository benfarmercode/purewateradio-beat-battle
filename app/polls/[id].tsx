import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable, Button, ActivityIndicator, Alert } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from 'react';
import { Poll, Vote } from "@/types/db";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";

const poll = {
    question: 'React Native vs Flutter?',
    options: [
        'React Native',
        'Flutter',
        'SwiftUI',
    ]
}

export default function PollDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [selected, setSelected] = useState('')
    const [userVote, setUserVote] = useState<Vote | null>(null)

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
                }
                console.log(error)
            }
            setUserVote(data)
            if (data) {
                setSelected(data.option)
            }
        }
        fetchUserVote();
    }, []);

    const vote = async () => {
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
            else setUserVote(data);
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
            else setUserVote(data);
        }
    }

    if (!poll) {
        return <ActivityIndicator />
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Poll Voting' }} />
            <Text style={styles.question}>{poll.question}</Text>
            <View style={styles.optionsContainer}>
                {poll?.options?.map(option => (
                    <Pressable onPress={() => setSelected(option)} key={option} style={styles.option}>
                        <Feather
                            name={option === selected ? 'check-circle' : 'circle'}
                            size={18}
                            color={option === selected ? 'green' : 'gray'} />
                        <Text>
                            {option}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Button onPress={vote} title="Vote" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 20,
    },
    question: {
        fontSize: 20,
        fontWeight: 600,
    },
    optionsContainer: {
        gap: 5,
    },
    option: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
})