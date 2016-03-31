'use strict'
import Button from 'apsl-react-native-button'
import React, {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Navigator,
  ListView,
  ActivityIndicatorIOS,
  Platform,
  AsyncStorage,
} from 'react-native'

var API_URL = '/api/login'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions.js'

@connect(
  state=>({...state.global}),
  dispatch=>(bindActionCreators({
    ...Actions
},dispatch)))
class Login extends React.Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(['0','1','2','3']),
    }
  }

  _fetchData() {
    let {
      useName,
      passWord,

    } = this.state
    let {
      webDomain,
      setFetchData,
      setAppStatus,
      
    } = this.props
    var URL = webDomain+API_URL + '?account=' + useName+ '&pwd=' + passWord
    fetch(URL)
      .then((response) => response.json())
      .then((responseData) => {
        try{
          setFetchData(responseData.id,responseData.account)
          AsyncStorage.setItem('loginUser',responseData,()=>{
            setAppStatus('TabBarView')
          })

        }catch(e){
          alert('登陆失败');
        }
      })
      .done()
  }
  renderRow(rowData){
     if (rowData === '0') {
       return(
         <View style={{height:10}}>
         </View>
       )
     }else if(rowData === '1'){
       return(
          <View style={{height:45,backgroundColor:'white'}}>
            <TextInput
              style={{flex:1,marginLeft:20}}
              placeholder='用户名'
              onChangeText={(useName) => this.setState({useName})}/>
          </View>
       )
     }else if(rowData === '2'){
       return(
         <View style={{height:45,backgroundColor:'white'}}>
           <TextInput
             style={{flex:1,marginLeft:20}}
             placeholder='密码'
             secureTextEntry = {true}
             onChangeText={(passWord) => this.setState({passWord})}/>
         </View>
       )
     }else if(rowData === '3'){
       return(
         <View style={{height:80,flex:1}}>
           <Button style={{backgroundColor: '#41BE9C',borderWidth:0,height:38,margin:10,borderRadius:5}} textStyle={{fontSize: 18,color:'white'}} onPress={this._fetchData.bind(this)}>
            登陆
           </Button>
           <TouchableOpacity style={{flex:1}}>
           </TouchableOpacity>
         </View>
       )
     }
   }


  _renderSeparator(sectionID,rowID){
    if (rowID === '1') {
      return(
        <View key={rowID} style={{flex:1,height:0.5,backgroundColor:'#D7D7D7'}}></View>
      )
    }
  }

  render(){
    return (
     <ListView
       style={{backgroundColor:'#EBEBEC'}}
       dataSource={this.state.dataSource}
       renderRow={this.renderRow.bind(this)}
       renderSeparator={this._renderSeparator}
     />
    )
  }

}

module.exports = Login
