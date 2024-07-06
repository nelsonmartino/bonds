import { createSlice } from '@reduxjs/toolkit'
import { Bond } from '../types'

interface InitialState {
  bonds: Bond[]
}

const initialState: InitialState = {
  bonds: [],
}

export const bondsSlice = createSlice({
  name: 'bonds',
  initialState,
  reducers: {
    loadBonds: (state, action) => {
      state.bonds = action.payload
    },
  },
})

export const { loadBonds } = bondsSlice.actions
export default bondsSlice.reducer
