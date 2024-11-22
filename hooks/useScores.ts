// hooks/useParticipants.ts
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { supabase } from "@/lib/supabase";
import { Score } from "@/types/db";

export const useScores = () => {
    const [scores, setScores] = useState<Score[]>([]);
    const [scoresLoading, setScoresLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchScores = async () => {
            setScoresLoading(true);
            let { data, error } = await supabase
                .from('scores')
                .select('*')

            setScoresLoading(false);

            if (error) {
                Alert.alert('Error fetching data');
                console.log('Error fetching data', error);
            } else if (data) {
                setScores(data);
            }
        };

        fetchScores();
    }, []);

    return { scores, scoresLoading };
};
