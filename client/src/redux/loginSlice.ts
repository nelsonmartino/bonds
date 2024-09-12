import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  login: boolean
  name: string
}

const initialState: InitialState = {
  login: false,
  name: '',
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload.login
      state.name = action.payload.name
    },
  },
})

export const { setLogin } = loginSlice.actions
export default loginSlice.reducer
