import { Tabs, Stack, Redirect, Link, Slot } from 'expo-router';
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Button, View } from 'react-native';
import { supabase } from '@/lib/supabase';

// import { TabBarIcon } from '@/components-example/navigation/TabBarIcon';

export default function TabLayout() {
    const { user, isAuthenticated } = useAuth();

    if(!user){
        return <Redirect href="/" />
    }
    else if(!isAuthenticated){
        return <Redirect href="/(public)/(tabs)/scoreboard" />
    }

    return (
        <>
            <Stack.Screen options={
                {
                    headerStyle: { backgroundColor: 'gold' },
                    title: 'Admin Dashboard',
                    headerRight: () => (
                        <View style={{right:20}}>
                            <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
                            <Link href='/(public)/(tabs)/scoreboard'>Switch to viewer</Link>
                        </View>
                    )
                }
            } />
            <Slot />
        </>

    );
}