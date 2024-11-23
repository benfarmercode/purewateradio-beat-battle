import React, { useState } from 'react'
import {
    Alert,
    StyleSheet,
    View,
    AppState,
    Button,
    Image,
    Text,
    Pressable,
    useWindowDimensions
} from 'react-native'
import { supabase } from '@/lib/supabase'
import TextFont from '@/components/TextFont'
import { Redirect, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Icons } from '@/constants/Icons';
import Header from '@/components/Header';
import { useAuth } from '@/providers/AuthProvider';

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function Home() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const { height, width } = useWindowDimensions();

    async function signInAnonymously() {
        setLoading(true)
        const { error } = await supabase.auth.signInAnonymously()
        if (error) {
            Alert.alert(error.message)
            console.log(error.message)
        }
        else {
            router.push("/(user)/vote");
        }
        setLoading(false)
    }

    const routeToLogin = () => {
        setLoading(true)
        router.push("/(auth)/login");
        setLoading(false)
    }

    if (user && !isAuthenticated) {
        return <Redirect href="/(user)/vote" />
    }

    return (
        <>
            <Header absolute={true} />
            <View style={[styles.container]}>

                <Image style={[styles.topBanner, { height: width < 768 ? 70 : 150, tintColor: Colors.red }]} source={{ uri: Icons.dancers }} />
                {/* <Image style={[styles.star,]} source={{ uri: Icons.star }} />
                <Image style={[styles.starSmall,]} source={{ uri: Icons.starSmall }} /> */}
                <Image style={[styles.fighter,]} source={{ uri: Icons.fighters }} />
                <View style={styles.inner}>
                    <View style={styles.copyWrapper}>
                        <TextFont text='PUREWATERADIO x REDBULL PRESENT' fontSize='med' color={Colors.darkBlue} />
                        <TextFont text='THE HEAT: PRODUCER SHOWCASE' fontSize='xl' color={Colors.darkBlue} />
                    </View>
                    <View>
                        <Button title="ENTER" disabled={loading} onPress={() => signInAnonymously()} />
                    </View>
                    <Pressable style={styles.hiddenButton} disabled={loading} onPress={() => routeToLogin()}>
                        <Text>LOGIN</Text>
                    </Pressable>
                </View>

            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 16,
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    copyWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBanner: {
        width: '100%',
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },

    star: {
        width: '15%',
        height: 'auto',
        aspectRatio: 756 / 631,
        position: 'absolute',
        top: '75%',
        left: '25%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain',
        opacity: 0.8,
    },

    starSmall: {
        width: '15%',
        height: 'auto',
        aspectRatio: 363 / 378,
        // tintColor: 'red',
        position: 'absolute',
        top: '75%',
        left: '75%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'contain',
        opacity: 0.8,
    },
    fighter: {
        width: '100%',
        height: 'auto',
        aspectRatio: 2204 / 1301,
        // tintColor: 'red',
        position: 'absolute',
        top: '30%',
        left: '0%',
        transform: 'translate(-0%, -0%)',
        objectFit: 'contain',
        zIndex: -1,
        opacity: 0.1,
    },
    // verticallySpaced: {
    //     paddingTop: 4,
    //     paddingBottom: 4,
    //     alignSelf: 'stretch',
    // },
    hiddenButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: 'lightgray',
        padding: 20,
        opacity: 0,
    },
    mt20: {
        marginTop: 20,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
    },
})


