import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  login: boolean
}

const initialState: InitialState = {
  login: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      console.log(action)
      state.login = action.payload
    },
  },
})

export const { setLogin } = loginSlice.actions
export default loginSlice.reducer
