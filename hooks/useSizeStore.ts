import { create } from 'zustand'
import { supabase } from "@/lib/supabase";
import { useWindowDimensions } from 'react-native';

// const default<AppState> = {
//     created_at: '',
//     current_round: '',
//     current_set: '',
//     id: 0,
//     participant: 0,
//     slug: '',
// }

// interface SizeStore {
//     width: number
//     height: number
//   }

// export const useSizeStore = create<SizeStore>(set => ({
//     width: 0,
//     height: 0,
//     fetchSize: () => {
//         const window = Dimensions.get('window');
//         set({ width: data, height: data })
//     },
//     subscribeToAppState: () => {
//         return supabase
//             .channel('current-screen-update')
//             .on(
//                 'postgres_changes',
//                 {
//                     event: 'UPDATE',
//                     schema: 'public',
//                     table: 'app_state',
//                 },
//                 (payload) => {
//                     const newAppState = payload.new as AppState
//                     console.log("APPSTATE UPDATE", payload);
//                     set({ appState: newAppState })
//                 }
//             )
//             .on(
//                 'postgres_changes',
//                 {
//                     event: 'UPDATE',
//                     schema: 'public',
//                     table: 'current_screen',
//                 },
//                 (payload) => {
//                     const newCurrentScreen = payload.new as CurrentScreen
//                     console.log("CURRENT SCREEN UPDATE", payload);
//                     set({ currentScreen: newCurrentScreen.slug })
//                 }
//             )
//             .on(
//                 'postgres_changes',
//                 {
//                     event: 'UPDATE',
//                     schema: 'public',
//                     table: 'showdown',
//                 },
//                 (payload) => {
//                     const newShodown = payload.new as Showdown
//                     console.log("SHOWDOWN UPDATE", payload);
//                     set({ showdown: newShodown })
//                 }
//             )
//             .on(
//                 'postgres_changes',
//                 {
//                     event: 'UPDATE',
//                     schema: 'public',
//                     table: 'voting_state',
//                 },
//                 (payload) => {
//                     const state = payload.new as VotingState
//                     console.log("VOTINGSTATE UPDATE", payload);
//                     set({ votingState: state.voting_state })
//                 }
//             )
//             .subscribe()
//     }
// }))