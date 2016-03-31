'use strict';
import RefreshableListView from 'react-native-refreshable-listview';
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


var API_URL = '/api/getProductType';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../store/actions.js'
@connect(
  state=>({...state.global}),
  dispatch=>(bindActionCreators({
    ...Actions
},dispatch)))
export default class ProduectTypeFilter extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {

  }
  _getProductType(){
    let { getProductType,webDomain } = this.props
    getProductType(webDomain+API_URL) //获取产品分类数据
  }
  doSelectRow(rowData){
    let {webDomain,navigator,selectProByID } = this.props
      selectProByID({
        url:webDomain+'/api/getProductByType'+'?pid='+rowData.pid,
        pid:rowData.pid
      },()=>{
       navigator.popToTop();
      })
  }

  renderRow(rowData){
       return(
         <View style={{flex:1,height:56}}>
         <TouchableOpacity onPress={()=>this.doSelectRow(rowData)}>
           <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',height:40,marginLeft:10,marginRight:10,marginTop:16,backgroundColor:'white',borderWidth:1,borderColor:'#D7D7D7',borderRadius:2}}>
             <Text style={{alignSelf:'center',marginLeft:10}}>{rowData.ptypename}</Text>
             <Image
               source={require('../../img/jiantou.png')}
               style={{height:14,width:8,alignSelf:'center',marginRight:10}}
               />
           </View>
         </TouchableOpacity>
         </View>
       )
  }
  render(){
    let {
      proTpyeDataArray
    } = this.props
    return (
      <RefreshableListView
        style={{backgroundColor:'#EBEBEC'}}
        dataSource={proTpyeDataArray}
        renderRow={this.renderRow.bind(this)}
        loadData={this._getProductType.bind(this)}
        refreshDescription="刷新数据"
      />
    )
  }

}

