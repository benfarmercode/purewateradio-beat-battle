import { create } from 'zustand'
import { supabase } from "@/lib/supabase";
import { Showdown } from '@/types/db';

interface ShowdownStore {
    showdown: Showdown | null
    fetchShowdown: () => void
    subscribeToShowdown: () => void
  }

export const useShowdownStore = create<ShowdownStore>(set => ({
    showdown: null,
    fetchShowdown: async () => {
        const { data } = await supabase
            .from('showdown')
            .select('*')
            .single()
        set({ showdown: data })
    },
    subscribeToShowdown: () => {
        return supabase
            .channel('current-screen-update')
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
            .subscribe()
    }
}))