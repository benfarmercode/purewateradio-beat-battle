import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase';
import GlobalStyles from '@/app-style/GlobalStyles';
import { Picker } from '@react-native-picker/picker';
import { useParticipants } from '@/hooks/useParticipants';
import { useAppStateStore } from '@/hooks/useAppStateStore';
import { Colors } from '@/constants/Colors';

export default function AdminVoting() {

    const [votingState, setVotingState] = useState('WAITING');
    const { fetchVotingState } = useAppStateStore();

    const options = [
        'WAITING',
        'OPEN',
        'CLOSED'
    ]

    const updateVotingState = async () => {
        const { data, error } = await supabase
            .from('voting_state')
            .update(
                {
                    voting_state: votingState,
                },
            )
            .eq('id', 1)
    }

    const refreshVoting = async () => {
        const { data, error } = await supabase
            .from('app_state')
            .update(
                {
                    vote_refreshes: Math.random()
                },
            )
            .eq('id', 1)
    }


    // fetchVotingState()
    // const init = useAppStateStore((state) => state.votingState)
    // setVotingState(init)


    return (
        <View style={GlobalStyles.adminControl}>
            <View style={[styles.control, { paddingBottom: 16 }]}>
                <Text style={GlobalStyles.name}>Voting State: </Text>
                <Picker
                    selectedValue={votingState}
                    onValueChange={(itemValue, itemIndex) =>
                        setVotingState(itemValue)
                    }>
                    {options.map(option => (
                        <Picker.Item key={`voting-state-${option}`} label={option} value={option} color={Colors.darkBlue} />
                    ))}
                </Picker>
            </View>

            <View style={styles.control}>
                <Button onPress={updateVotingState} title={'Update Voting State'} />
            </View>

            <View style={styles.control}>
                <Button onPress={refreshVoting} title={'Fetch Votes'} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    control: {
        flex: 1,
    },
})