import { connect } from 'react-redux'
import { fetchZen, saveCurrentZen } from '../modules/zen'

import Zen from '../components/Zen.jsx'

const mapDispatchToProps = {
  fetchZen,
  saveCurrentZen
}

const mapStateToProps = (state) => ({
  zen : state.zen
})

export default connect(mapStateToProps, mapDispatchToProps)(Zen)
