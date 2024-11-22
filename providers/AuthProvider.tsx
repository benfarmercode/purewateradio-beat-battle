import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type AuthContext = {
    session: Session | null;
    user: User | undefined;
    isAuthenticated: boolean
};

const AuthContext = createContext<AuthContext>({
    session: null,
    user: undefined,
    isAuthenticated: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    
    return (
        <AuthContext.Provider value={{session, user: session?.user, isAuthenticated: !!session?.user && !session?.user.is_anonymous}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);