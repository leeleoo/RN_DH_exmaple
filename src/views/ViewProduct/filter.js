'use strict';
import RefreshableListView from 'react-native-refreshable-listview'
import ProductsType from './types'
import React, {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Navigator,
  ListView,
  ActivityIndicatorIOS,
  ActionSheetIOS,
} from 'react-native';


var API_URL = '/api/getProductByType';

export default class FilterProduct extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['1']),
    };
  }
  doSelectRow(rowData){
    this.props.navigator.push({
      title:'类目',
      component:<ProductsType/>,
    })
  }
  renderRow(rowData){
    return(
      <View style={{flex:1,height:56}}>
        <TouchableOpacity onPress={()=>this.doSelectRow(rowData)}>
           <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',height:40,marginLeft:10,marginRight:10,marginTop:16,backgroundColor:'white',borderWidth:1,borderColor:'#D7D7D7',borderRadius:2}}>
             <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
               <Text style={{alignSelf:'center',marginLeft:10}}>类目</Text>
             </View>
             <Image
               source={require('../../img/jiantou.png')}
               style={{height:14,width:8,alignSelf:'center',marginRight:10}}
               />
           </View>
        </TouchableOpacity>
      </View>
     )
  }


  _fetchData() {
    //
  }

  render(){
    return (
      <RefreshableListView
        style={{backgroundColor:'#EBEBEC'}}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        loadData={this._fetchData.bind(this)}
        refreshDescription="刷新数据"
      />
    )
  }

}

