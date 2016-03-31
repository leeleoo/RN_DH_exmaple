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

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['0','1', '2','3']),
      nameArray:['检查更新','清除缓存','当前版本','给我们鼓励'],
    };
  }

  onPress(rowData){
    if (rowData ==='0') {
      alert('当前已是最新版本！');
    }else if (rowData ==='1') {
      alert('清除成功！');
    }else if (rowData ==='3') {
    }
  }

  renderRow(rowData){
     if(rowData === '2'){
       return(
          <View style={{height:50,backgroundColor:'white',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{fontSize:16,marginLeft:15}}>{this.state.nameArray[rowData]}</Text>
                <Text style={{fontSize:16,marginRight:15,color:'gray'}}>1.0</Text>
          </View>
       )
     }else{
       return(
         <TouchableOpacity onPress={()=> this.onPress(rowData)}>
          <View style={{height:50,backgroundColor:'white',justifyContent:'center'}}>
                <Text style={{fontSize:16,marginLeft:15}}>{this.state.nameArray[rowData]}</Text>
          </View>
        </TouchableOpacity>
       )
     }
  }

  _renderSeparator(a,b){
    return(
      <View  key={b} style={{flex:1,height:0.5,backgroundColor:'#D7D7D7'}}></View>
    )
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

