import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import GlobalStyles from '@/app-style/GlobalStyles';

export default function AdminProfile() {
    const { user } = useAuth();

    return (
        <View style={GlobalStyles.adminControl}>
            <Text>User ID: {user?.id}</Text>
            <Text>Email: {user?.email}</Text>

            <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        fontWeight: 500,
        marginTop: 10,
    },
    inputs: {
        flexDirection: 'row'
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
    },
    buttonClicked:{
        backgroundColor: 'green',
    }
})