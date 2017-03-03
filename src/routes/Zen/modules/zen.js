// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_ZEN = 'FETCH_ZEN'
export const SAVE_CURRENT_ZEN = 'SAVE_CURRENT_ZEN'
export const RECEIVE_ZEN = 'RECEIVE_ZEN'

// ------------------------------------
// Actions
// ------------------------------------
let id = 0
export const receiveZen = (text) => {
  return {
    type: RECEIVE_ZEN,
    payload: {
      text: text,
      id: id += 1
    }
  }
}

export const saveCurrentZen = () => {
  return { type: SAVE_CURRENT_ZEN }
}

export const fetchZen = () => {
  return (dispatch, getState) => {
    return fetch('https://api.github.com/zen')
      .then(data => data.text())
      .then(text => dispatch(receiveZen(text)))
  }
}

export const actions = {
  fetchZen,
  saveCurrentZen
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_ZEN]    : (state, action) => {
    return ({
      ...state,
      current: action.payload,
    })
  },
  [SAVE_CURRENT_ZEN]    : (state, action) => {
    return ({
      ...state,
      saved: state.saved.concat(state.current)
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  current: null,
  saved: []
}

export default function zenReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
