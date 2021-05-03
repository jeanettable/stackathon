import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import AllEvents from './components/AllEvents';
import SingleEvent from './components/SingleEvent';
import ProfileView from './components/ProfileView';
import EditProfile from './components/EditProfile';
import ImgUploader from './components/ImgUploader';
import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, isProduction, isOwner, isListOwner } = this.props
    // attached to props below in mapState

    return (
      <div>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path="/home" component={Home} />
            {!isLoggedIn && <Route path="/login" component={Login} />}
            {!isLoggedIn && <Route path="/signup" component={Signup} />}
            <Route path='/events' exact component={AllEvents} />
            <Route path='/events/:eventId' exact component={SingleEvent} />
            <Route path="/users/:userId" exact component={ProfileView} />
            <Route path="/users/:userId/edit" exact component={EditProfile} />
            <Route path="/users/:userId/imgup" exact component={ImgUploader} />

            {/* <Route path="/image-upload/:key" />
            <Route path="/pdf-upload/:key" /> */}
            {/* {isProduction && <Route exact path="/production/events" component={CreateEvent} />} */}
            {/* {isProduction && <Route exact path="/production/events/:eventId" component={EditEvent} />} */}
            {/* {isProduction && <Route exact path="/users" component={AllUsers} />} */}
            <Redirect to="/home" />
          </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isProduction: state.auth.isProduction,
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
