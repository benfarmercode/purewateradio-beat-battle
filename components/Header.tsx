import { View, Text, StyleSheet, Image, useWindowDimensions, Button, Pressable } from 'react-native'
import React from 'react'
import { Icons } from '@/constants/Icons'
import { Colors } from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { Link } from 'expo-router'

interface HeaderProps {
    absolute: boolean;
    showAdmin?: boolean
    logoColor?: string
}

const Header: React.FC<HeaderProps> = ({ absolute, showAdmin, logoColor }) => {
    const { width, height } = useWindowDimensions()
    let containerStyle = absolute ? styles.container : styles.containerRelative
    let tint = logoColor ? logoColor : Colors.darkBlue

    return (
        <>
            <View style={[containerStyle, { height: width < 768 ? 90 : 140 }]}>
                <View style={styles.inner}>
                    <Image
                        source={{ uri: Icons.purewateradio }}
                        style={[styles.logo, { tintColor: tint } ]}
                    />
                    <Image
                        source={{ uri: Icons.redbull }}
                        style={styles.logoRight}
                    />
                </View>
            </View>
            {showAdmin &&
                <View style={styles.adminLinks}>
                    <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
                    <Link href='/(public)/(tabs)/scoreboard'>Switch to viewer</Link>
                    <Link href='/(admin)/(tabs)/admin'>Switch to admin</Link>
                </View>
            }
            {width > 768 &&
                <View style={styles.hiddenButton}>
                    <Pressable onPress={() => supabase.auth.signOut()}>
                        <Text>Sign Out</Text>
                    </Pressable>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        backgroundColor: 'transparent',
        zIndex: 1,
        // position: 'relative',
    },
    containerRelative: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.gray,
        // position: 'relative',
    },
    inner: {
        paddingTop: 16,
        paddingBottom: 16,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        width: 'auto',
        height: '100%',
        resizeMode: 'contain',
        aspectRatio: 5000 / 2720,
        left: 16,
    },
    logoRight: {
        width: 'auto',
        height: '50%',
        resizeMode: 'contain',
        aspectRatio: 1920 / 332,
        right: 16,
    },
    adminLinks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        zIndex: 2,
    },
    hiddenButton: {
        opacity: 0,
        backgroundColor: 'red',
        zIndex: 2,
        width: 50,
        position: 'absolute',
        top: 0,
        left: 0,

    }
})

export default Header;