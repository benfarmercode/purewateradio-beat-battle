import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export default function AuthLayout() {
    const { session, user, isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Redirect href="/(admin)/(tabs)/admin" />
    }
    if (user) {
        return <Redirect href="/(public)/(tabs)/scoreboard" />
    }

    return <Slot />
}