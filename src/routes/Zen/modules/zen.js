import initialState from './initialState'

// ------------------------------------
// Constants
// ------------------------------------
export const ZEN_FETCH = 'ZEN_FETCH'
export const ZEN_SAVE = 'ZEN_SAVE'
export const ZEN_SET_CURRENT = 'ZEN_SET_CURRENT'

// ------------------------------------
// Actions
// ------------------------------------
export const receiveZen = (text) => {
  return {
    type: ZEN_SET_CURRENT,
    payload: {
      text: text
    }
  }
}

export const saveCurrentZen = () => {
  return { type: ZEN_SAVE }
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
export const isSaved = (saved, zen) => {
  return !!saved.find(obj => obj.text === zen.text)
}

const zenSave = (state, action) => {
  if(!isSaved(state.saved, state.current)) {
    const saved = state.saved.concat(state.current)
    localStorage.setItem('zen:saved', JSON.stringify(saved))
    return {
      ...state,
      saved
    }
  }

  return state
}

const zenSetCurrent = (state, action) => {
  return ({
    ...state,
    current: action.payload,
  })
}

const ACTION_HANDLERS = {
  [ZEN_SET_CURRENT]: zenSetCurrent,
  [ZEN_SAVE]: zenSave
}


// ------------------------------------
// Reducer
// ------------------------------------
export default function zenReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
