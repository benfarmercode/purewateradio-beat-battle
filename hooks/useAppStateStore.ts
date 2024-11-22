import { create } from 'zustand'
import { supabase } from "@/lib/supabase";
import { AppState, CurrentScreen, Showdown, VotingState, Round, Vote } from '@/types/db';

// const default<AppState> = {
//     created_at: '',
//     current_round: '',
//     current_set: '',
//     id: 0,
//     participant: 0,
//     slug: '',
// }

const roundNames = [
    {
        title: 'Pass the Aux',
        description: 'Each of the five producers will have a chance to showcase their style by “passing the aux” and playing their best beat. Producers will have a time limit of 1 minute to present their beat.'
    },
    {
        title: 'Set the Scene',
        description: 'Vote for the winning prompt.'
    },
    {
        title: 'Flip the Script',
        description: ''
    },
    {
        title: 'The Showdown',
        description: 'Each producer receives the same sample a few weeks before the event, giving them ample time to craft a unique beat that transforms the original sample. During the event, each producer will play their prepared sample flip for the judge and the audience.'
    },
]

interface AppStateStore {
    appState: AppState | null
    currentScreen: string
    showdown: Showdown | null
    votingState: string
    rounds: Round[] | null
    votes: Vote[] | null
    voteRefreshes: number
    fetchRounds: () => void
    fetchAppState: () => void
    fetchVotingState: () => void
    fetchVotes: () => void
    subscribeToAppState: () => void
}

export const useAppStateStore = create<AppStateStore>(set => ({
    appState: null,
    currentScreen: '',
    showdown: null,
    votingState: 'WAITING',
    rounds: null,
    votes: null,
    voteRefreshes: 0,
    fetchAppState: async () => {
        const { data } = await supabase
            .from('app_state')
            .select('*')
            .single()
        set({ appState: data })
    },
    fetchRounds: async () => {
        const { data } = await supabase
            .from('rounds')
            .select('*')
            .order('id')
        set({ rounds: data })
    },
    fetchVotingState: async () => {
        const { data } = await supabase
            .from('voting_state')
            .select('*')
            .single()
        set({ votingState: data?.voting_state })
    },
    fetchVotes: async () => {
        let { data, error } = await supabase
            .from('vote')
            .select('*')
        console.log("STOREVOTES: ", data)
        set({ votes: data })
    },
    subscribeToAppState: () => {
        return supabase
            .channel('current-screen-update')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'app_state',
                },
                (payload) => {
                    const newAppState = payload.new as AppState
                    console.log("APPSTATE UPDATE", payload);
                    set({ appState: newAppState })
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'current_screen',
                },
                (payload) => {
                    const newCurrentScreen = payload.new as CurrentScreen
                    console.log("CURRENT SCREEN UPDATE", payload);
                    set({ currentScreen: newCurrentScreen.slug })
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'showdown',
                },
                (payload) => {
                    const newShodown = payload.new as Showdown
                    console.log("SHOWDOWN UPDATE", payload);
                    set({ showdown: newShodown })
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'voting_state',
                },
                (payload) => {
                    const state = payload.new as VotingState
                    console.log("VOTINGSTATE UPDATE", payload);
                    set({ votingState: state.voting_state })
                }
            )
            .subscribe()
    }
}))