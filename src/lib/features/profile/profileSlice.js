const initialState = {
    profile: null,
    loading: false,
    error: null,
    updating: false,
};
 
//fetch user profile
export const fetchProfile = createAsyncThunk(
    "profile/fetchProfile",
    async (_, { rejectWithValue }) => {
        try {
            const { supabase } = await import("@/lib/supabase/supabase");
            const {
                data: { session },
                error: sessionError,
            } = await supabase.auth.getSession();
 
            if (sessionError || !session?.access_token) {
                throw new Error("No active session found");
            }
 
            const response = await fetch("/api/profile", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${session.access_token}`,
                    "Content-Type": "application/json",
                },
            });
 
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch profile");
            }
 
            const data = await response.json();
            return data.profile;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
 