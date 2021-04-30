import React from 'react'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  console.log('home props>>>', props);
  const { first } = props;

  return (
    <div>
      <h3>Welcome, {first}!</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    first: state.auth.first
  }
}

export default connect(mapState)(Home)
