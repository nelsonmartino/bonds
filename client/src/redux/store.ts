import { configureStore } from '@reduxjs/toolkit'
import bondsReducer from './bondsSlice'
import loginReducer from './loginSlice'

export const store = configureStore({
  reducer: {
    bonds: bondsReducer,
    login: loginReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {bonds: BondsState}
export type AppDispatch = typeof store.dispatch
