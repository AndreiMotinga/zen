import React from 'react'
import classes from './Zen.scss'
import Btn from '../../../components/Btn'
const { shape, object, string, array, func } = React.PropTypes

export const Zen = ({ zen, fetchZen, saveCurrentZen }) => {
  return (
    <div>
      <h1>{ zen.current
              ? zen.current.text
              : "Experience Internet wisdom" }
      </h1>
        <Btn onClick={fetchZen}>Fetch a wisdom</Btn>
        {' '}
        { zen.current
            ? <Btn onClick={saveCurrentZen}>Save</Btn>
            : ''
        }

      {zen.saved.length
      ? <div>
          <h3> Saved wisdoms </h3>
            <ul>
              {zen.saved.map(zen =>
                <li key={zen.id}>
                  {zen.text}
                </li>
              )}
            </ul>
          </div>
        : ''
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
