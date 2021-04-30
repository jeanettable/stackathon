import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import eventsReducer from './events'
import auth from './auth'
import singleEventReducer from './singleEvent'

const reducer = combineReducers({ 
  auth ,
  events: eventsReducer,
  singleEvent: singleEventReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger( {collapsed: true} ))
);

const store = createStore(reducer, middleware);

export default store
export * from './auth'
