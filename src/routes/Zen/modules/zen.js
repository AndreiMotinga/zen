import initialState from './initialState'

// ------------------------------------
// Constants
// ------------------------------------
export const ZEN_FETCH = 'ZEN_FETCH'
export const ZEN_SAVE = 'ZEN_SAVE'
export const ZEN_SET_CURRENT = 'ZEN_SET_CURRENT'
export const ZEN_REMOVE = 'ZEN_REMOVE'
export const ZEN_CLEAR_SAVED = 'ZEN_CLEAR_SAVED'

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

export const removeZen = (zen) => {
  return {
    type: ZEN_REMOVE,
    payload: {
      zen
    }
  }
}

export const clearSaved = () => {
  return {
    type: ZEN_CLEAR_SAVED
  }
}

export const actions = {
  clearSaved,
  saveCurrentZen,
  fetchZen,
  removeZen
}

// ------------------------------------
// Action Handlers
// ------------------------------------
export const isSaved = (saved, zen) => {
  return !!saved.find(obj => obj.text === zen.text)
}

const compare = (a,b) => {
  if (a.text < b.text)
    return -1;
  if (a.text > b.text)
    return 1;
  return 0;
}

const zenSave = (state) => {
  if(!isSaved(state.saved, state.current)) {
    const saved = state.saved.concat(state.current)
                             .sort((a,b) => compare(a,b))
    localStorage.setItem('zen:saved', JSON.stringify(saved))
    return {
      ...state,
      saved
    }
  }

  return state
}

const zenRemove = (state, action) => {
  const saved = state.saved.filter(zen => zen !== action.payload.zen)
  localStorage.setItem('zen:saved', JSON.stringify(saved))
  return ({
    ...state,
    saved
  })
}

const zenSetCurrent = (state, action) => {
  return ({
    ...state,
    current: action.payload,
  })
}

const zenClearSaved = (state) => {
  const saved = []
  localStorage.setItem('zen:saved', JSON.stringify(saved))
  return ({
    ...state,
    saved
  })
}

const ACTION_HANDLERS = {
  [ZEN_SET_CURRENT]: zenSetCurrent,
  [ZEN_SAVE]: zenSave,
  [ZEN_REMOVE]: zenRemove,
  [ZEN_CLEAR_SAVED]: zenClearSaved
}


// ------------------------------------
// Reducer
// ------------------------------------
export default function zenReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
