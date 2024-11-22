import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase';
import GlobalStyles from '@/app-style/GlobalStyles';
import { Picker } from '@react-native-picker/picker';
import { useParticipants } from '@/hooks/useParticipants';
import { Colors } from '@/constants/Colors';

export default function AdminAppState() {

    const { participants, loading } = useParticipants();
    const [selectedParticipant, setSelectedParticipant] = useState();
    const [currentRound, setCurrentRound] = useState('1');
    const [currentSet, setCurrentSet] = useState('1');

    const updateAppState = async () => {
        const { data, error } = await supabase
            .from('app_state')
            .update({
                participant: selectedParticipant,
                current_round: currentRound,
                current_set: currentSet,
                current_score_1: 0,
                current_score_2: 0,
                current_score_3: 0,
            })
            .eq('id', 1)
    }

    return (
        <View style={GlobalStyles.adminControl}>
            <View>
                <Text style={GlobalStyles.name}>Current Participant: </Text>
                <Picker
                    selectedValue={selectedParticipant}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedParticipant(itemValue)
                    }>
                    {participants.map(participant => (
                        <Picker.Item key={`participant-${participant.id}`} label={participant.name} value={participant.id} color={Colors.darkBlue} />
                    ))}
                </Picker>
            </View>

            <View>
                <Text style={GlobalStyles.name}>Current Round: </Text>
                <TextInput
                    value={currentRound}
                    inputMode='numeric'
                    onChangeText={setCurrentRound}
                    style={GlobalStyles.input}
                    placeholder="Round"
                    placeholderTextColor={'gray'}
                />
            </View>

            <View>
                <Text style={GlobalStyles.name}>Current Set: </Text>
                <TextInput
                    value={currentSet}
                    inputMode='numeric'
                    onChangeText={setCurrentSet}
                    style={GlobalStyles.input}
                    placeholder="Set"
                    placeholderTextColor={'gray'}
                />
            </View>

            <Button onPress={updateAppState} title={'Update AppState'} />

        </View>
    )
}