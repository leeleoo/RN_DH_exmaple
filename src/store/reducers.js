import { combineReducers } from 'redux'
/**
 * 默认的reducer
 *
 */
import device from './modules/device/deviceReducer'
import global from './modules/global/globalReducer'

/**
 * 合并Reducer
 *
 */
const rootReducer = combineReducers({
  device,
  global
})

export default rootReducer
