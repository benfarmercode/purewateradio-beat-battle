import { Database } from '@/types/supabase';
export type Poll = Database['public']['Tables']['polls']['Row'];
export type Vote = Database['public']['Tables']['vote']['Row'];
export type Participant = Database['public']['Tables']['participants']['Row'];
export type AppState = Database['public']['Tables']['app_state']['Row'];
export type CurrentScreen = Database['public']['Tables']['current_screen']['Row'];
export type Score = Database['public']['Tables']['scores']['Row'];
export type Showdown = Database['public']['Tables']['showdown']['Row'];
export type VotingState = Database['public']['Tables']['voting_state']['Row'];
export type Scores = Database['public']['Tables']['scores'];
export type Round = Database['public']['Tables']['rounds']['Row'];