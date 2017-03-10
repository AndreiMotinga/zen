const getSaved = () => {
  const zenSaved = localStorage.getItem('zen:saved')
  const saved = zenSaved ? zenSaved : '[]'
  return JSON.parse(saved)
}

const initialState = {
  current: null,
  saved: getSaved()
}

export default initialState
