import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase';
import GlobalStyles from '@/app-style/GlobalStyles';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '@/constants/Colors';

export default function AdminCurrentScreen() {
    const [selectedScreen, setSelectedScreen] = useState();

    const updateCurrentScreen = async () => {
        console.log("Updating current screen")
        const { data, error } = await supabase
            .from('current_screen')
            .update({
                slug: selectedScreen,
            })
            .eq('id', 1)
    }

    return (
        <View style={GlobalStyles.adminControl}>
            <View>
                <Text style={GlobalStyles.name}>Current Screen: </Text>
                <Picker
                    selectedValue={selectedScreen}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedScreen(itemValue)
                    }>
                    <Picker.Item label="Scoreboard" value="scoreboard" color={Colors.darkBlue} />
                    <Picker.Item label="Beat" value="beat" color={Colors.darkBlue} />
                    <Picker.Item label="Showdown" value="showdown" color={Colors.darkBlue} />
                    <Picker.Item label="Voting" value="voting" color={Colors.darkBlue} />
                    <Picker.Item label="Round" value="round" color={Colors.darkBlue} />
                    <Picker.Item label="QR-Code" value="qrcode" color={Colors.darkBlue} />
                    <Picker.Item label="Winner" value="winner" color={Colors.darkBlue} />
                </Picker>
            </View>
            <Button onPress={updateCurrentScreen} title={'Update CurrentScreen'} />
        </View>
    )
}