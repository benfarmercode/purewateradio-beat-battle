// hooks/useParticipants.ts
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { supabase } from "@/lib/supabase";
import { Participant } from "@/types/db";

export const useParticipants = () => {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchParticipants = async () => {
            setLoading(true);
            let { data, error } = await supabase
                .from('participants')
                .select('*')
                .order('id', { ascending: true });

            setLoading(false);

            if (error) {
                Alert.alert('Error fetching data');
                console.log('Error fetching data', error);
            } else if (data) {
                setParticipants(data);
            }
        };

        fetchParticipants();
    }, []);

    return { participants, loading };
};
