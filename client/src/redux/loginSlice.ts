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
      const { login = false, name = '' } = action.payload || {}
      state.login = login
      state.name = name
    },
    setLogout: () => ({ ...initialState }),
  },
})

export const { setLogin, setLogout } = loginSlice.actions
export default loginSlice.reducer
