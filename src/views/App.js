import React, {
  View,
  Platform
} from 'react-native'
import IOSApp from './IOS_index'
import AndroidApp from './Android_index'



//import { original, community, dribbble, cnodejs } from '../route'


import autobind from 'autobind-decorator'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../store/actions'

class App extends React.Component {
  constructor(args) {
    super(args)
  }

  render(){
    if(Platform.OS === 'ios'){
      return (
          <IOSApp {...this.props}/>
        )
    }
      return (
          <AndroidApp {...this.props}/>
        )
  }
}

const stateToProps = (state) => ({...state})
const dispatchToProps = (dispatch) => bindActionCreators({...Actions}, dispatch)

export default connect(stateToProps, dispatchToProps)(App)