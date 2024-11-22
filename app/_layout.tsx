import { Slot, Stack } from "expo-router";
import { StyleSheet, Image, SafeAreaView } from "react-native";
import AuthProvider from "@/providers/AuthProvider";
import * as SplashScreen from 'expo-splash-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect } from "react";
import { useAppStateStore } from "@/hooks/useAppStateStore";
import Header from "@/components/Header";

import { useFonts } from 'expo-font';
import { Colors } from "@/constants/Colors";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { appState, fetchAppState, subscribeToAppState } = useAppStateStore();
    const [loaded, error] = useFonts({
        'BNRoute22': require('@/assets/fonts/BNRoute22.otf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);


    useEffect(() => {
        // Fetch data and update both stores
        const runFetchAppState = async () => {
            await fetchAppState();
        };
        runFetchAppState();
        subscribeToAppState();
    }, []);

    if (!loaded && !error) {
        return null;
    }

    return (
        <AuthProvider>
            {/* <Slot /> */}
            <SafeAreaView style={styles.container}>
                <Stack screenOptions={{
                    // headerTitle: '',
                    // headerStyle: { backgroundColor: 'transparent' },
                    // headerShadowVisible: false,
                    // headerTitleAlign: 'center',
                    // headerLeft: () => (
                    //     <Image
                    //         source={require('@/assets/images/pwr-logo.png')}
                    //         style={styles.logo}
                    //     />
                    // ),
                    // headerRight: () => (
                    //     <Image
                    //         source={require('@/assets/images/redbull-logo.png')}
                    //         style={styles.logoRight}
                    //     />
                    // ),
                    // contentStyle: { backgroundColor: 'Colors.gray' },
                    headerShown: false,
                }}>
                </Stack>
            </SafeAreaView>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
    },
    logo: {
        width: 90,
        height: '100%',
        resizeMode: 'contain',
        tintColor: '#272E72',
        alignSelf: 'flex-start',
        left: 20
    },
    logoRight: {
        width: 150,
        height: '100%',
        resizeMode: 'contain',
        // tintColor: 'blue',
        alignSelf: 'flex-start',
        right: 20,

    },
    scores: {
        gap: 20
    },
})
