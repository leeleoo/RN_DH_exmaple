/**
 * States
 *
 */
import deviceInitState from './modules/device/deviceInitState'
import globalInitState from './modules/global/globalInitState'

/**
 * 初始化states
 *
 * @return {[type]} [description]
 */
const initState = {
  device: deviceInitState,
  global: globalInitState
}

export default initState
