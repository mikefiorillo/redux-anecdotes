import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    createFilter: (_state, action) => action.payload,
  },
})

export const { createFilter } = filterSlice.actions
export default filterSlice.reducer
