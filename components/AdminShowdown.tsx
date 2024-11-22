import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase';
import GlobalStyles from '@/app-style/GlobalStyles';
import { Picker } from '@react-native-picker/picker';
import { useParticipants } from '@/hooks/useParticipants';
import { Colors } from '@/constants/Colors';

export default function AdminShowdown() {

    const { participants, loading } = useParticipants();
    const [selectedParticipant1, setSelectedParticipant1] = useState<number>();
    const [selectedParticipant2, setSelectedParticipant2] = useState<number>();

    const updateShowdown = async () => {
        const { data, error } = await supabase
            .from('showdown')
            .update(
                {
                    participant_1: selectedParticipant1 ? selectedParticipant1 : null,
                    participant_2: selectedParticipant2 ? selectedParticipant2 : null,
                },
            )
            .eq('id', 1)
    }

    return (
        <View style={GlobalStyles.adminControl}>
            <View style={GlobalStyles.flexRow}>
                <Text style={GlobalStyles.name}>Finalist 1: </Text>
                <Picker
                    selectedValue={selectedParticipant1}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedParticipant1(itemValue)
                    }>
                    {participants.map(participant => (
                        <Picker.Item key={`showdown-participant-${participant.id}`} label={participant.name} value={participant.id} color={Colors.darkBlue} />
                    ))}
                </Picker>
            </View>

            <View style={GlobalStyles.flexRow}>
                <Text style={GlobalStyles.name}>Finalist 2: </Text>
                <Picker
                    selectedValue={selectedParticipant2}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedParticipant2(itemValue)
                    }>
                    {participants.map(participant => (
                        <Picker.Item key={`participant-${participant.id}`} label={participant.name} value={participant.id} color={Colors.darkBlue} />
                    ))}
                </Picker>
            </View>

            <Button onPress={updateShowdown} title={'Update Showdown'} />

        </View>
    )
}