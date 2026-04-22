import RootRoute from "./root-route";
import { supabase } from "./lib/supabase";
import { useEffect } from "react";
import { useSetSession } from "./store/session";

export default function App() {

  const setSession = useSetSession();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <RootRoute />
  );
}
