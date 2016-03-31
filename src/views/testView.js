/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class OverWriteDH extends Component {
  constructor(props){
    super(props)
    this.state = {
      opacity:0.5
    }
  }
  componentDidMount() {
    setInterval(()=>{
      var opacity = this.state.opacity
      opacity -= 0.05
      this.setState({
        opacity:opacity
      });
    },100)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{opacity:this.state.opacity}}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

