import React from 'react'
import classes from './Zen.scss'
const { shape, object, string, array, func } = React.PropTypes

export const Zen = (props) => {
  const { zen, fetchZen, saveCurrentZen } = props
  return (
    <div>
      <h1>{zen.current ? zen.current.text : ''}</h1>
      <div>
        <h2 className={classes.zenHeader}>
          {zen ? zen.value : ''}
        </h2>
        <button className='btn btn-default' onClick={fetchZen}>
          Fetch a wisdom
        </button>
        {' '}
        <button className='btn btn-default' onClick={saveCurrentZen}>
          Save
        </button>
      </div>
      <h3> Saved wisdoms </h3>
      {zen.saved.length
        ? <div className={classes.savedWisdoms}>
          <ul>
            {zen.saved.map(zen =>
              <li key={zen.id}>
                {zen.text}
              </li>
            )}
          </ul>
        </div>
        : <span>None so far</span>
      }
    </div>
  )
}

Zen.propTypes = {
  zen: shape({
    current: object,
    saved: array.isRequired,
  }),
  fetchZen: func.isRequired,
  saveCurrentZen: func.isRequired
}

export default Zen
