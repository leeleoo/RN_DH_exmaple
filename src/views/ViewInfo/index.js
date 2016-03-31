'use strict';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import IndexTabBar from './IndexTabBar';
import ListViewInfo from './ListViewInfo'
import React, {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Navigator,
  ListView,
  ActivityIndicatorIOS,
  ScrollView,
} from 'react-native';

//var API_URL = '/api/getNewByType';
var API_URL = '/api/getNewsType';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../store/actions.js'

@connect(
  state=>({...state.global}),
  dispatch=>(bindActionCreators({
    ...Actions
},dispatch)))
export default class ViewInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
		this.props.queryInfo()
  }
  renderListView(type,index){
    return (
       <ListViewInfo
       	key={index}
        type = {type}
        tabLabel={type.typename}/>
    )
  }

  render(){
  	console.log('this.props.InfoDS',this.props.InfoDS);
    return (
      <View style ={{flex:1,backgroundColor:'#EBEBEC',marginBottom:49}}>
        <ScrollableTabView renderTabBar={() => <IndexTabBar/>}>
          {this.props.InfoDS.map((type,index) => this.renderListView(type,index))}
        </ScrollableTabView>
      </View>

    )
  }

}

