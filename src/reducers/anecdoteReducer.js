import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { createNotification } from './notificationReducer'

const asObject = ({ id, content, votes }) => {
  return {
    content,
    id,
    votes,
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    createAnecdote: (state, action) => {
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

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const response = await anecdoteService.create(content)
    console.log(response)
    const { id, votes } = response
    if (!response) return 'error'
    dispatch(createAnecdote({ content, id, votes }))
    dispatch(createNotification(`You created '${content}'`))
    setTimeout(() => dispatch(createNotification('')), 5000)
  }
}

export const { createAnecdote, createVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
