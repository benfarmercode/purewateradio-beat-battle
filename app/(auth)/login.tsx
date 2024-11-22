import React, { useState } from 'react'
import {
    Alert,
    StyleSheet,
    View,
    AppState,
    Button,
    TextInput,
    Text,
    useWindowDimensions
} from 'react-native'
import { supabase } from '@/lib/supabase'
import GlobalStyles from '@/app-style/GlobalStyles'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import TextFont from '@/components/TextFont'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const {width, height} = useWindowDimensions();

    async function signInAnonymously() {
        setLoading(true)
        const { error } = await supabase.auth.signInAnonymously()
        if (error) {
            Alert.alert(error.message)
            console.log(error.message)
        }
        setLoading(false)
        router.push('/(public)/(tabs)/scoreboard')
    }

    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            Alert.alert(error.message)
            console.log(error.message)
        }
        setLoading(false)
        router.push('/(admin)/(tabs)/admin')
    }

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({ email, password })

        if (error) {
            Alert.alert(error.message)
            console.log(error.message)
        } else if (!session) {
            const message = 'Please check your inbox for email verification!'
            Alert.alert(message)
            console.log(message)
        }
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <TextFont text={'Sign in'} fontSize='large'/>
                <TextInput
                    style={[styles.input, {width: width < 768 ? '100%' : 700}]}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    placeholderTextColor={'gray'}
                    autoCapitalize={'none'}
                />
                <TextInput
                    style={[styles.input, {width: width < 768 ? '100%' : 700}]}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor={'gray'}
                    autoCapitalize={'none'}
                />
                <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
                {/* <View style={styles.verticallySpaced}>
                <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
            </View> */}
                <Button title="Sign up as guest" disabled={loading} onPress={() => signInAnonymously()} />
                <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.darkBlue,
    },
    inner: {
        marginTop: 40,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        // backgroundColor: 'red',
        gap: 20,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
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