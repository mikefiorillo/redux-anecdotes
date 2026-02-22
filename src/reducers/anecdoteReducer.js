import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    create: (state, action) => {
      console.log(action)
      return [...state, asObject(action.payload)]
    },
    createVote: (state, action) => {
      return state.map((obj) => {
        if (obj.id === action.payload.id) {
          return { ...obj, votes: obj.votes + 1 }
        } else {
          return obj
        }
      })
    },
    setAnecdotes: (state, action) => action.payload,
  },
})

const { setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const { create, createVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
