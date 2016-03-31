import React, { 
  Component,
  NetInfo,
  Text,
  View,
  StyleSheet,
  NavigatorIOS,
  AsyncStorage,
   } from 'react-native'
import ViewPager from 'react-native-viewpager'

import IOSViewPager from './ViewPager'
import TabBarView from './Android_TabBar'
import Login from './LoginView'
import Regist from './RegistView'
import autobind from 'autobind-decorator'


let deviceWidth = require('Dimensions').get('window').width
let deviceHeight = require('Dimensions').get('window').height

@autobind
export default class IOS_index extends Component {
  constructor(props){
    super(props)
      // 0 TabBarView  1 login   2 空白  3 intorview 4 无网络
  }
  componentWillMount() {
    let {setAppStatus} = this.props;
    //判断是否有网络
    NetInfo.fetch().done((reach)=>{
      if(reach == 'none'){
        //显示离线页面
        setAppStatus(4)
      }else{
        AsyncStorage.getItem('Used',(err,bool)=>{
          AsyncStorage.getItem('loginUser',(err,obj)=>{
            if(!obj && !bool){
              //没有登录又是第一次打开
              setAppStatus(3)
            }else if(!obj && bool ){
              //没有登录不是第一次打开
              setAppStatus("TabBarView")
            }else if(obj){
              //登陆过查询用户信息
              this.props.setFetchData(obj.id,obj.account);
              setAppStatus("TabBarView")
            }
          })
        })
        // UserD.boolForKey('Used').then(bool => {
        //  UserD.objectForKey('loginUser').then(obj => {
        //    if(obj === null && !bool){
              
        //    }else if(obj === null && bool){
              
        //    }else if(obj !== null){
        //      this.props.setFetchData(obj.id,obj.account);
        //      setAppStatus("TabBarView")
        //    }
        //  })            
        // })
        //提前查询咨询页面,避免太卡
        //this.props.queryInfo()
      }
    })
  }
  render() {
    let {appStatus} = this.props.global
    switch (appStatus) {
      case "TabBarView":
        return(
            <TabBarView/>
          )       
        break
      case "goToLogin":
        return (
            <NavigatorIOS
              ref="nav"
              style ={{flex:1}}
              initialRoute ={{
                component:()=>(<Login {...this.props}/>),
                title:'登陆',
                barTintColor:'#41BE9C',
                tintColor:'white',
                titleTextColor:'white',
                leftButtonTitle:'取消',
                onLeftButtonPress:()=>{this.props.setAppStatus('TabBarView')},
                rightButtonTitle:'注册',
                onRightButtonPress:() => {
                  this.refs.nav.navigator.push({
                    title: "注册",
                    component:()=>(<Regist {...this.props}/>),
                    barTintColor:'#41BE9C',
                    tintColor:'white',
                    titleTextColor:'white',
                  })}
              }}
              //
              />
          )
          //
        break
      case 2:
        return (
          <View style={{flex:1,backgroundColor:'white'}}></View>
          )
        break
      case 3:
        return (
            <IOSViewPager
              {...this.props}
            />
          )
        break
      case 4:
        return(
          <View style={{flex:1,backgroundColor:'white'}}>
            <Text style={{flex:1,alignSelf:'center',marginTop:200}}>您已失去网络链接!</Text>
          </View>
        )
        break     
      default:
        return (
            <View style={{height:deviceHeight,width:deviceWidth,flex:1,backgroundColor:'lightblue'}}></View>
          )
        break
    }

  }
}
