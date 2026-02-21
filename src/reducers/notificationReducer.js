import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification: (state, action) => action.payload,
  },
})

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer
