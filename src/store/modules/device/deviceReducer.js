import { createReducer } from '../../../util'
import types from '../../types'
import InitialState from './deviceInitState'


export default createReducer(InitialState, {
  [types.SET_PLATFORM]: (state, platform) => ({
    platform
  }),
  [types.SET_VERSION]: (state, version) => ({
  	version
  })
})
