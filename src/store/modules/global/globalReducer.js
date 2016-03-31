import { createReducer } from '../../../util'
import initialState from './globalInitState'
import types from '../../types'

export default createReducer(initialState, {
  [types.SET_SESSION_TOKEN]: (state, data) => {
    return {'sessionToken': data.payload}
  },

  [types.SET_STORE]: (state, data) => {
    return {'store':data.payload}
  },
  [types.GET_STATE]: (state, data) => {

  },
  [types.SET_STATE]: (state, data) => {

  },
  [types.SET_FETCH_DATA]: (state,data) => {
    return {id:data.id,account:data.account}
  },
  [types.SET_APP_STATUS]: (state,payload) => {
    return {appStatus:payload}
  },
  [types.SET_PRODUCT_DATA]: (state,payload) => {
    return {...state,...payload}
  },
  [types.SELECT_PID]: (state,payload) => {
    return payload
  },
  [types.SET_INDEX_DS]: (state,payload) =>{
    return ({...state,...payload})
  },
  [types.SET_PRODUCT_TYPE_DATA]: (state,payload) =>{
    return ({...state,...payload})
  },
  [types.SET_INFO_DS]: (state,payload) =>{
    return ({...state,...payload})
  }
})
