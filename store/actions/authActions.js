export const login = (payload) => ({
  type: 'SET_AUTH',
  payload,
})

export const logout = () => ({
  type: 'CLEAR_AUTH',
})
