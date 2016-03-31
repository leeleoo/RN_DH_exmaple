'use strict'


import { connect } from 'react-redux'
import {bindActionCreators}  from "redux"
import OwnPage from '../ownPage'
import IndexView from '../IndexView'
import ViewProduct from '../ViewProduct'
import ViewInfo from '../ViewInfo'
import Setting from '../ViewSetting.js'
import Fasd from '../testView.js'
import * as Actions from '../../store/actions.js'

import Fankui from '../ownPage/FeedBack'
// import ChanPinShaiXuan from '../ViewProduct/filter'
// import ChanPinShaiXuanType from '../ViewProduct/types.js'
// import ShouCang from '../ownPage/Favorite.js'
// import Browser from './Browser'

import NavigationBar from 'react-native-navigation-bar';
import TabBarViewComponent from './TabBarViewComponent.js';

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

@connect(
	state=>({...state.global}),
	dispatch=>bindActionCreators({...Actions},dispatch))
export default class TabBarView extends React.Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, nav) {
    console.log('22222sun');
    switch (route.id) {
    	case 'tabbar':
    	  return <TabBarViewComponent
    	  				{...this.props}
    	          navigator={nav}
    	          route={route}

    	          />;
      case 'fankui':
        return <Fankui
                navigator={nav}
                route={route}
                />;
    }
  }
  render(){
	  return (
	    <Navigator
	      style={{flex:1,paddingTop:56}}
	      initialRoute={{ id: 'tabbar', title:'首页',type:'home'}}
	      renderScene={this.renderScene}
	      configureScene={(route) => {
	        return Navigator.SceneConfigs.FloatFromRight;
	      }}
	      navigationBar={
	        <Navigator.NavigationBar
	          routeMapper={NavigationBarRouteMapper}
	          style={{backgroundColor:'#41BE9C'}}
	        />
	      }
	    />
	    //
	  )
	}

}


var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
   if (route.type === 'home')
    return(
      <View style={{flex:1,alignSelf:'center',marginLeft:5,marginRight:10,backgroundColor:'white',marginTop:8,marginBottom:8,borderRadius:5}}>
      <TextInput
        style={{flex:1,backgroundColor:'white',marginLeft:5,marginRight:5,marginTop:8}}
        placeholder='输入网址'
        onSubmitEditing={(a)=>navigator.push({ id: 'browser' ,title:'详情',passData:{url:a.nativeEvent.text,title:a.nativeEvent.text}})}
        />
      </View>
    )
    let _leftButtonIcon;
    if (index ===0) {
      _leftButtonIcon = null
    }else {
      _leftButtonIcon = {uri:lightBackArrow};
    }
    return(
      <View style={{width:width,height:60}}>
     <NavigationBar
          title={route.title}
          height={60}
          titleColor={'#fff'}
          backgroundColor={'#41BE9C'}
          leftButtonIcon={_leftButtonIcon}
          onLeftButtonPress={() => navigator.pop()}
      />
      </View>

    )
  },

  RightButton: function(route, navigator, index, navState) {
    if (route.type === 'product') {
      return (
        <TouchableOpacity  style={{flex:1}}   onPress={()=> navigator.push({ id: 'shaixuan' ,title:'筛选'})}>
          <View style={{flex:1,marginRight:15,flexDirection:'row',alignItems:'center'}}>
            <Image style={{width: 24, height: 18}} source={require('../../img/shaixuan.png')}/>
            <Text style={{color:'white',fontSize:14}}>筛选</Text>
          </View>
        </TouchableOpacity>
      )
    }else if (route.type === 'my') {
      if (DataManager.getFetchData().id ==='') {
        return null;
      }
      return (
        <TouchableOpacity  style={{flex:1,justifyContent:'center'}}   onPress={()=>{
                AsyncStorage.removeItem('loginUser',function(error){
                  console.log(error);
                  if (error === null) {
                  DataManager.setFetchData('','');
                  AppActions.refreshLogin();
                  }
                })
        }}>
            <Text style={{color:'white',fontSize:16,marginRight:15}}>注销</Text>
        </TouchableOpacity>
      )
    }else if (route.id === 'collect') {
      return (
        <TouchableOpacity  style={{flex:1,justifyContent:'center'}}   onPress={()=>AppActions.editCollect()}>
            <Text style={{color:'white',fontSize:16,marginRight:15}}>编辑</Text>
        </TouchableOpacity>
      )
    }
    else {
      return null;
    }
  },

  Title: function(route, navigator, index, navState) {
    return null;
  },
};

var lightBackArrow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAA2FBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8lb+eLAAAAR3RSTlMAAQIDBAYICQsMDQ4QERQXGBofJykqODlAQUlMUldeYWhrbW98f4KMlJWYnZ6goqutr7K0tbrAwcPMzs/T5ujp6+/z9ff7/dlYrXMAAAJCSURBVHja7dBXUlQBFEXR+wwtmHNWzBgxZzHDnf+M/LHUgg52lT++s/YM1q7639p/6enmxxeXJxXaxW/d3d1bVzL9d/pX94ZA/3r/0caQ7Q88sMMfd2CXP+zAFH/Ugan+oAMz/DEHZvpDDszxRxyY6w84sMA/+gML/SM/8Bf+7gfh/u4b4f7uo+H+Xg/39/ch2989Cff3ari/94X734T7+0K4//2Q7f+ymu3/eizcf5yfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn39a18P9J8P99SrcvxLur9Ph/jq31IDzo/PXmaUGfD4yugEHO/3A2/QDpzr9wK30A8NDBxxwwAEHHHDAAQcccMABBxxwwAEHHHBg2QOHHXDAAQcccMABBxxwYGwHHjnggAMOOOCAAw444IADDjjggAMOOOCAAw444IADDjjggAMOOOCAAw444IADDjjggANLHvjkgAMOOOCAAw444IADDjjggAMOOOCAAw6M7sCGAw444IADDix5YHOSfuB1pR84m37gZaUf2Jt+YKXCDxyo7ANbQ2UfuFuVfeBEZR+4XRV94MlQ0Qee7alKPjBu/+IDY/cvOjB+//wDCf55BzL8sw88D/HPOpDjn34gyT/tQJZ/94E0/84Def6q4f5v/+NAf1Vd3f7pvzlUZitr77a3P1w7VPon/QDqIm8Mnw8FiAAAAABJRU5ErkJggg==';
