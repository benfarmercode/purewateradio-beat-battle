import { View, Text, StyleSheet, TextInput, Button, Alert, ActivityIndicator } from 'react-native'
import { useEffect, useState } from 'react'
import GlobalStyles from '@/app-style/GlobalStyles';
import { supabase } from '@/lib/supabase';
import { useAppStateStore } from '@/hooks/useAppStateStore';
import { useParticipants } from '@/hooks/useParticipants';
import { Participant, Score } from '@/types/db';

export default function AdminScoring() {
    const [score1, setScore1] = useState('0');
    const [score2, setScore2] = useState('0');
    const [score3, setScore3] = useState('0');

    const [currentParticipant, setCurrentParticipant] = useState<Participant>()
    const { participants, loading } = useParticipants();

    const appState = useAppStateStore((state) => state.appState);

    useEffect(() => {
        const newParticipant = participants.find((participant) => participant.id === appState?.participant);
        setCurrentParticipant(newParticipant);
    }, [appState, participants]);

    useEffect(() => {
        setScore1('0')
        setScore2('0')
        setScore3('0')
    }, [currentParticipant]);

    const submitScore = async () => {
        const score1Number = score1 ? parseFloat(score1) : undefined;
        const score2Number = score2 ? parseFloat(score2) : undefined;
        const score3Number = score3 ? parseFloat(score3) : undefined;

        const updateAppState = async () => {
            const { data, error } = await supabase
                .from('app_state')
                .update({
                    current_score_1: score1Number,
                    current_score_2: score2Number,
                    current_score_3: score3Number
                })
                .eq('id', 1)
        }

        updateAppState();

        if (!appState?.participant || !appState?.current_round || !appState?.current_set) {
            Alert.alert('Error', 'Missing participant, round, or set information.');
            return;
        }

        // Perform the upsert
        const { data, error } = await supabase
            .from('scores')
            .upsert(
                {
                    participant: appState.participant,
                    round_number: appState.current_round,
                    set_number: appState.current_set,
                    score_1: score1Number,
                    score_2: score2Number,
                    score_3: score3Number
                },
                {
                    onConflict: 'participant, round_number, set_number'
                },
            )

        if (error) {
            Alert.alert('Error submitting score', error.message);
        } else {
            console.log("Score submitted successfully", data);
        }
    };

    const calculateTotalScore = () => {
        console.log("Set total score");
    }

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={GlobalStyles.adminControl}>

            <View>
                <View style={GlobalStyles.flexRow}>
                    <View style={GlobalStyles.flexRow}>
                        <Text style={styles.name}>{currentParticipant?.name}</Text>
                    </View>
                    <View style={GlobalStyles.flexRow}>
                        <Text style={styles.name}>Round: {appState?.current_round}</Text>
                    </View>
                    <View style={GlobalStyles.flexRow}>
                        <Text style={styles.name}>Set: {appState?.current_set}</Text>
                    </View>
                </View>

                <View>
                    <View style={styles.inputs}>
                        <Text style={styles.name}>XINA</Text>
                        <TextInput
                            value={score1}
                            onChangeText={setScore1}
                            style={styles.input}
                            placeholder="Score 1: XINA"
                            placeholderTextColor={'gray'}
                        />

                        <Text style={styles.name}>OBI</Text>
                        <TextInput
                            value={score2}
                            onChangeText={setScore2}
                            style={styles.input}
                            placeholder="Socre 2: OBI"
                            placeholderTextColor={'gray'}
                        />

                        <Text style={styles.name}>ECHO</Text>
                        <TextInput
                            value={score3}
                            onChangeText={setScore3}
                            style={styles.input}
                            placeholder="Score 3: ECHO"
                            placeholderTextColor={'gray'}
                        />
                    </View>
                </View>
            </View>




            <Button onPress={submitScore} title={'Submit'} />
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        fontWeight: 500,
        marginTop: 10,
    },
    inputs: {

    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
    inputWrapper: {
        justifyContent: 'center',
    },
    remove: {
        position: 'absolute',
        right: 10,
    },
    error: {
        color: 'crimson'
    }

})