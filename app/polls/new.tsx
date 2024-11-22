import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native'
import { useState } from 'react'
import { Redirect, router, Stack } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

export default function CreatePoll() {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [error, setError] = useState('');

    const { user } = useAuth();

    const createPoll = async () => {
        setError('')
        if (!question) {
            setError('Please provide a question')
        }
        const validOptions = options.filter(option => !!option)
        if (validOptions.length < 2) {
            setError('Please provide at least two valid options');
        }
        console.warn('Create poll');

        const { data, error } = await supabase
            .from('polls')
            .insert([ {question, options: validOptions} ])
            .select()

        if(error){
            Alert.alert(error.message);
            console.log(error.message)
        }

        router.back()
    }

    if (!user) {
        return <Redirect href="/login" />
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Create Poll' }} />
            <Text style={styles.label}>Create Poll</Text>
            <TextInput
                value={question}
                onChangeText={setQuestion}
                style={styles.input}
                placeholder="Type your question here"
                placeholderTextColor={'gray'}
            />

            <Text style={styles.label}>Options</Text>
            {options.map((option, index) => (
                // ******(*** CHANGE THIS KEY!!!!!!!!!!!
                <View key={index} style={styles.inputWrapper}>
                    <TextInput
                        value={option}
                        onChangeText={(text) => {
                            const updated = [...options];
                            updated[index] = text;
                            setOptions(updated);
                        }}
                        style={styles.input}
                        placeholder={`Option ${index + 1}`}
                        placeholderTextColor={'gray'}
                    />
                    <Feather
                        name="x"
                        size={18}
                        color="gray"
                        onPress={() => {
                            //delete option
                            const updated = [...options];
                            updated.splice(index, 1)
                            setOptions(updated);
                        }}
                        style={styles.remove}
                    />
                </View>

            ))}

            <Button onPress={() => { setOptions([...options, '']) }} title={'Add option'} />

            <Button onPress={createPoll} title={'Create poll'} />

            <Text style={styles.error}>{error}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 5
    },
    label: {
        fontWeight: 500,
        marginTop: 10,
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
    }

})