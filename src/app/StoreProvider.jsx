// Mark this component as client-side (required for useRef and Redux hooks in Next.js)
'use client'

// Import useRef hook from React to hold a persistent reference
import { useRef } from 'react'

// Import Redux Provider to make the store available to child components
import { Provider } from 'react-redux'

// Import the function that creates a Redux store
import { makeStore } from '../lib/store'

// StoreProvider component wraps the app and provides Redux store to children
export default function StoreProvider({ children }) {
  // useRef holds a reference to the store across re-renders
  // This ensures that a new store is not created on every render
  const storeRef = useRef(null)

  // Create the store only if it hasn't been created yet
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  // Wrap children in Redux Provider so they can access the store via useSelector/useDispatch
  return <Provider store={storeRef.current}>{children}</Provider>
}
