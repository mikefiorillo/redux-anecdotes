const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  const data = await response.json()
  return data
}

const create = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  })
  return response.json()
}

const createVote = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`)
  const data = await response.json()
  const updated = { ...data, votes: data.votes + 1 }
  const updateResponse = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated),
  })
  return updateResponse
}

export default { getAll, create, createVote }
