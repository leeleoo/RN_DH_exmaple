
import TabNavigator from 'react-native-tab-navigator';
import React,{
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Navigator,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import OwnPage from '../ownPage'
import IndexView from '../IndexView'
import ViewProduct from '../ViewProduct'
import ViewInfo from '../ViewInfo'
import Setting from '../ViewSetting.js'

export default class TabBarViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab:this.props.route.type,
    };
  }

  render() {
    return(
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="首页"
          renderIcon={() => <Image source={require('../../img/tab_1.png')} />}
          renderSelectedIcon={() => <Image source={require('../../img/tab_1_selected.png')} />}
          onPress={() => {
            if (this.state.selectedTab !== 'home') {
           this.props.navigator.resetTo({ id: 'tabbar', title:'首页',type:'home'});
             }
           }}>
        	<IndexView
        		navigator={this.props.navigator}
        		{...this.props}
        	/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'product'}
          title="产品"
          renderIcon={() => <Image source={require('../../img/tab_2.png')} />}
          renderSelectedIcon={() => <Image source={require('../../img/tab_2_selected.png')} />}
          onPress={() => {
            if (this.state.selectedTab !== 'product') {
           this.props.navigator.resetTo({ id: 'tabbar', title:'产品',type:'product'});
             }
           }}>

          <ViewProduct
            navigator={this.props.navigator}

            />

        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'info'}
          title="资讯"
          renderIcon={() => <Image source={require('../../img/tab_3.png')} />}
          renderSelectedIcon={() => <Image source={require('../../img/tab_3_selected.png')} />}
          onPress={() => {
            if (this.state.selectedTab !== 'info') {
           this.props.navigator.resetTo({ id: 'tabbar', title:'资讯',type:'info'});
             }
           }}>

          <ViewInfo
            navigator={this.props.navigator}
            />

        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'my'}
          title="我的"
          renderIcon={() => <Image source={require('../../img/tab_4.png')} />}
          renderSelectedIcon={() => <Image source={require('../../img/tab_4_selected.png')} />}
          onPress={() => {
            if (this.state.selectedTab !== 'my') {
           this.props.navigator.resetTo({ id: 'tabbar', title:'我的',type:'my'});
             }
           }}>


          <OwnPage
            navigator={this.props.navigator}
            />

        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'set'}
          title="设置"
          renderIcon={() => <Image source={require('../../img/tab_5.png')} />}
          renderSelectedIcon={() => <Image source={require('../../img/tab_5_selected.png')} />}
          onPress={() => {
            if (this.state.selectedTab !== 'set') {
           		this.props.navigator.resetTo({ id: 'tabbar', title:'设置',type:'set'});
             }
           }}>
           <Setting></Setting>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }

}
