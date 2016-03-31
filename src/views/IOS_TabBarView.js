'use strict'
let React = require('react-native')


import { connect } from 'react-redux'
import {bindActionCreators}  from "redux"
import OwnPage from './ownPage'
import IndexView from './IndexView'
import ViewProduct from './ViewProduct'
import ViewInfo from './ViewInfo'
import Setting from './ViewSetting.js'
import * as Actions from '../store/actions.js'
import Fasd from './testView.js'

import TabBarNavigator from 'react-native-tabbar-navigator'

let {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Navigator,
  NavigatorIOS,
  TabBarIOS,
} = React

@connect(
	state=>({...state.global}),
	dispatch=>bindActionCreators({...Actions},dispatch))
export default class IOS_TabBarView extends React.Component {
	render() {
		return (
			<TabBarNavigator
			  navTintColor='#ffffff'
			  navBarTintColor='#41BE9C'
			  tabTintColor={this.props.mainColor}
			  tabBarTintColor='#f5f5f5'
			  onChange={(index)=>console.log(`selected index ${index}`)}>
			  <TabBarNavigator.Item title='首页' icon={require('../img/tab_1.png')} defaultTab>
			  	<IndexView {...this.props}/>
			  </TabBarNavigator.Item>
			  <TabBarNavigator.Item title='产品' icon={require('../img/tab_2.png')}>
			  	<ViewProduct/>
			  </TabBarNavigator.Item>
			  <TabBarNavigator.Item title='资讯' icon={require('../img/tab_3.png')}>
			  	<ViewInfo/>
			  </TabBarNavigator.Item>
			  <TabBarNavigator.Item title='我的' icon={require('../img/tab_4.png')}>
			  	<OwnPage {...this.props}/>
			  </TabBarNavigator.Item>
			  <TabBarNavigator.Item title='设置' icon={require('../img/tab_5.png')}>
			  	<Setting></Setting>
			  </TabBarNavigator.Item>
			</TabBarNavigator>
		)
	}
}






