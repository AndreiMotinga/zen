import { connect } from 'react-redux'
import { fetchZen, saveCurrentZen, removeZen, clearSaved } from '../modules/zen'
import Zen from '../components/Zen.jsx'

const mapDispatchToProps = {
  fetchZen,
  clearSaved,
  saveCurrentZen,
  removeZen: (zen) => removeZen(zen)
}

const mapStateToProps = (state) => ({
  zen : state.zen,
})

export default connect(mapStateToProps, mapDispatchToProps)(Zen)
