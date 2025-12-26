import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
  }

  const signOut = () => supabase.auth.signOut()

  if (loading) return <div>Loading...</div>

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>MaFy Course Test</h1>
      {!user ? (
        <button onClick={signInWithGoogle} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Login with Google
        </button>
      ) : (
        <div>
          <p>Logged in as: <strong>{user.email}</strong></p>
          <button onClick={signOut}>Logout</button>
          <div style={{ marginTop: '20px', color: 'green' }}>
            ✓ Connection to Supabase is active.
          </div>
        </div>
      )}
    </div>
  )
}

export default App
