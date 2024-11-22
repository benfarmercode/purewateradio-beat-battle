import { Tabs, Stack, Redirect, Link, Href, useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { supabase } from '@/lib/supabase';
import { useAppStateStore } from '@/hooks/useAppStateStore';

// import { TabBarIcon } from '@/components-example/navigation/TabBarIcon';

export default function TabLayout() {
    const { user, isAuthenticated } = useAuth();
    const [ oldScreen, setOldScreen ] = useState('');
    const [redirect, setRedirect] = useState(false);
    const router = useRouter()


    const currentScreen = useAppStateStore((state) => state.currentScreen);

    useEffect(() => {
        console.log(oldScreen)
        console.log(currentScreen)
        setOldScreen(currentScreen)
        const onScreen = window.location.pathname.slice(1)
        console.log(window.location.pathname.slice(1))
        if(currentScreen && currentScreen != onScreen){
            router.push(`/(public)/(tabs)/${currentScreen}` as Href)
        }
        // if (oldScreen && currentScreen) {
        //     setRedirect(true); // Trigger redirect when the slug is available
        // }
    }, [currentScreen]);

    if (!user) {
        return <Redirect href="/" />
    }

    if (redirect) {
        return <Redirect href={`/(public)/(tabs)/${currentScreen}` as Href} />;
    }

    return (
        <>
        <Stack 
            screenOptions={
                {headerShown: false}
            }
        
        />
            {/* <Tabs
                screenOptions={{
                    tabBarActiveTintColor: 'red',
                    headerShown: false,
                }}>
                <Tabs.Screen
                    name="scoreboard"
                    options={{
                        title: 'Scoreboard',
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons name="scoreboard" size={24} color="black" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="beat"
                    options={{
                        title: 'Beat',
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons name="account-music" size={24} color="black" />
                        ),
                    }}
                />
                 <Tabs.Screen
                    name="showdown"
                    options={{
                        title: 'Showdown',
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons name="account-music" size={24} color="black" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="voting"
                    options={{
                        title: 'Voting',
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons name="vote" size={24} color="black" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="round"
                    options={{
                        title: 'Round',
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons name="circle" size={24} color="black" />
                        ),
                    }}
                />
            </Tabs> */}
        </>

    );
}