'use strict';
import FeedBack from './FeedBack'
import Favorite from './Favorite'
import React, {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Navigator,
  ListView,
  AsyncStorage,
} from 'react-native';

export default class OwnPage extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.id) {
      this.props.navComponent.setNavItems({
        rightItem: {
          component: (
            <TouchableOpacity  style={{flex:1}}>
              <View style={{flex:1,marginRight:15,marginTop:20}}>
                <Text style={{color:'white',fontSize:14}}>注销</Text>
              </View>
            </TouchableOpacity>
          ),
          event: function() {
            this.doZhuXiao();
          }.bind(this)
        }
      });
    }
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['0','1','2','3']),
    };
  }

  doZhuXiao(){
    AsyncStorage.removeItem('loginUser',()=>{
      this.props.setFetchData('','');
      this.props.doLogin();
    })
  }

  onPress(rowData){
    if (rowData ==='2') {
      if (this.props.id ==='') {
        this.props.setAppStatus('goToLogin');
      }else {
        this.props.navigator.push({
              title:'我的收藏',
              component:<Favorite {...this.props}/>
          });
      }
    }else if (rowData ==='3') {
      this.props.navigator.push({
            title:'用户反馈',
            component:<FeedBack {...this.props}/>
      });
    }
  }

  renderRow(rowData){
     if (rowData === '0') {
       return(
         <View style={{height:130,backgroundColor:'white'}}>
           <Image
             source={require('../../img/wode.png')}
             style={{width:76,height:76,alignSelf:'center',marginTop:20}}/>
           <Text style={{fontSize:16,marginTop:10,alignSelf:'center'}}>{this.props.id === '' ? '游客' : this.props.account}</Text>
         </View>
       )
     }else if(rowData === '1'){
       return(
          <View style={{height:10}}>
          </View>
       )
     }else if(rowData === '2'){
       return(
         <TouchableOpacity onPress={()=> this.onPress(rowData)}>
           <View style={{height:50,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
             <View  style={{flexDirection:'row'}}>
               <Image
                 source={require('../../img/shoucang.png')}
                 style={{width:21,height:17,marginLeft:15,alignSelf:'center'}}/>
               <Text style={{fontSize:16,marginLeft:15,alignSelf:'center'}}>我的收藏</Text>
             </View>

               <Image
                 source={require('../../img/jiantou.png')}
                 style={{height:14,width:8,alignSelf:'center',marginRight:10}}
                 />
           </View>
         </TouchableOpacity>
       )
     }else if(rowData === '3'){
       return(
         <TouchableOpacity onPress={()=> this.onPress(rowData)}>
           <View style={{height:50,backgroundColor:'white',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
             <View  style={{flexDirection:'row'}}>
               <Image
                 source={require('../../img/fankui.png')}
                 style={{width:22,height:22,marginLeft:15,alignSelf:'center'}}/>
               <Text style={{fontSize:16,marginLeft:15}}>用户反馈</Text>
             </View>

               <Image
                 source={require('../../img/jiantou.png')}
                 style={{height:14,width:8,alignSelf:'center',marginRight:10}}
                 />
           </View>
         </TouchableOpacity>
       )
     }
   }
  _renderSeparator(sectionID,rowID){
    return(
      <View key={rowID} style={{flex:1,height:0.5,backgroundColor:'#D7D7D7'}}></View>
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