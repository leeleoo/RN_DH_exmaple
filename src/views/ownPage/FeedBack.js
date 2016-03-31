'use strict';
import React, {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Navigator,
  ListView,
  ActivityIndicatorIOS,
} from 'react-native';

var API_URL = '/api/addTicking'
class FanKui extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['0','1', '2','3', '4']),
      text:'',
      email:'',
    };
  }

  onPress(rowData){

  }

  renderRow(rowData){
     if (rowData === '0') {
       return(
         <View style={{height:40,flex:1,justifyContent:'center'}}>
         <Text style={{color:'gray',fontSize:12,marginLeft:10}}>您的建议和不满就是我们最好的动力</Text>
         </View>
       )
     }else if (rowData === '1') {
       return(
         <View style={{height:100,flex:1}}>
           <TextInput
              style={{flex:1,backgroundColor:'white'}}
              onChangeText={(text) => this.setState({text})}
              placeholder = '  请输入您的建议'
              multiline = {true}
            />
         </View>
       )
     }else if (rowData === '2') {
       return(
         <View style={{height:40,flex:1,justifyContent:'center'}}>
         <Text style={{color:'gray',fontSize:12,marginLeft:10}}>留下您的邮箱</Text>
         </View>
       )
     }else if (rowData === '3') {
       return(
         <View style={{height:44,flex:1}}>
           <TextInput
              style={{flex:1,backgroundColor:'white'}}
              onChangeText={(email) => this.setState({email})}
              placeholder = '  请输入您的邮箱'
              keyboardType ='email-address'
            />
         </View>
       )
     }else if (rowData === '4') {
       return(
         <View style={{height:65,flex:1}}>
           <TouchableOpacity style={{flex:1}}onPress={()=>this._fetchData()}>
             <View style={{flex:1,marginLeft:10,marginRight:10,marginTop:20,backgroundColor:'#E53A53',borderRadius:5,justifyContent:'center'}}>
             <Text style={{color:'white',fontSize:12,alignSelf:'center'}}>提交</Text>
             </View>
           </TouchableOpacity>
         </View>
       )
     }
  }

  _fetchData() {

    var URL = this.props.webDomain+API_URL + '?content=' + this.state.text+ '?email=' + this.state.email;
    console.log(URL);
     fetch(URL)
         .then((response) => response.json())
         .then((responseData) => {
           console.log(responseData);
           if (responseData.result === 0) {
             alert('提交成功!');
             this.props.navigator.pop();
           }
         })
         .done();
  }

  render(){
    return (
     <ListView
       style={{backgroundColor:'#EBEBEC'}}
       dataSource={this.state.dataSource}
       renderRow={this.renderRow.bind(this)}
     />
    )
  }

}

module.exports = FanKui;
