const initialState = null

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return action.payload

    case 'CLEAR_AUTH':
      return initialState

    default:
      return state
  }
}

export default authReducer
