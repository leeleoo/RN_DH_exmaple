'use strict';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RefreshableListView from 'react-native-refreshable-listview';
import Browser from 'react-native-browser';
import ViewPager from 'react-native-viewpager';


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

var API_URL = '/api/getNewByType';
var deviceWidth = require('Dimensions').get('window').width;

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../store/actions.js'

@connect(
  state=>({...state.global}),
  dispatch=>(bindActionCreators({
    ...Actions
},dispatch)))
export default class ListViewInfo extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var ds_page = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    this.state = {
      dataSource: ds,
      dataSource_page: ds_page,
    };

  }
  componentWillMount() {
    this._fetchData();
  }

  _renderPage(data,pageID) {
    let _data = data || {}
    return (
      <TouchableOpacity onPress={()=>Browser.open(_data.url, {
          showUrlWhileLoading: true,
          navigationButtonsHidden: false,
          showActionButton: true,
          showDoneButton: true,
          doneButtonTitle: '取消',
          showPageTitles: true,
          disableContextualPopupMenu: false,
          hideWebViewBoundaries: false,
        },function(error,url,title){

          var URL = this.props.webDomain+'/api/addcollect' + '?uid=' + this.props.id +'&title=' + title + '&url=' + url ;
          console.log(URL);
           fetch(URL)
               .then((response) => response.json())
               .then((responseData) => {
                 console.log(responseData);
               })
               .done();

             })}>
        <Image
          source={{uri:this.props.picDomain+_data.imgurl}}
          defaultSource = {require('../../img/default.png')}
          style={{width:deviceWidth-10,height:60,margin:5}}/>
      </TouchableOpacity>
    );
  }

  renderRow(rowData, sectionID, rowID){
    if (rowID === '0') {
      if (this.state.dataSource_page.pageIdentities.length === 1) {
        return(
          <View style={{flex:1}}>
            <View style={{height:70}}>
              <TouchableOpacity onPress={()=>Browser.open(this.state.dataSource_page._dataBlob[0].url, {
                  showUrlWhileLoading: true,
                  navigationButtonsHidden: false,
                  showActionButton: true,
                  showDoneButton: true,
                  doneButtonTitle: '取消',
                  showPageTitles: true,
                  disableContextualPopupMenu: false,
                  hideWebViewBoundaries: false,
                },function(error,url,title){

                  var URL = this.props.webDomain+'/api/addcollect' + '?uid=' + this.props.id +'&title=' + title + '&url=' + url ;
                  console.log(URL);
                   fetch(URL)
                       .then((response) => response.json())
                       .then((responseData) => {
                         console.log(responseData);
                       })
                       .done();

                     })}>
                <Image
                  source={{uri:this.props.picDomain+this.state.dataSource_page._dataBlob[0].imgurl}}
                  defaultSource = {require('../../img/default.png')}
                  style={{width:deviceWidth-10,height:60,margin:5}}/>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>Browser.open(rowData.url, {
                showUrlWhileLoading: true,
                navigationButtonsHidden: false,
                showActionButton: true,
                showDoneButton: true,
                doneButtonTitle: '取消',
                showPageTitles: true,
                disableContextualPopupMenu: false,
                hideWebViewBoundaries: false,
              },function(error,url,title){

               var URL = this.props.webDomain+'/api/addcollect' + '?uid=' + this.props.id +'&title=' + title + '&url=' + url ;
               console.log(URL);
                fetch(URL)
                    .then((response) => response.json())
                    .then((responseData) => {
                      console.log(responseData);
                    })
                    .done();

                   })}>
             <View style={{flexDirection:'row',backgroundColor:'white',flex:1,height:80}}>
               <View style={{marginLeft:15,marginTop:16,flex:1,justifyContent:'space-between'}}>
                 <Text style={{fontSize:15}} numberOfLines={2}>{rowData.title}</Text>
                 <Text style={{fontSize:12,color:'gray',marginBottom:10}} numberOfLines={1}>{rowData.content}</Text>
               </View>
               <Image
                 source={{uri:this.props.picDomain+rowData.imgurl}}
                 defaultSource = {require('../../img/default.png')}
                 style={{width:80,height:60,marginRight:10,marginTop:10,marginBottom:10}}/>
             </View>
            </TouchableOpacity>

            </View>

          )
      }else {
        return(
          <View style={{flex:1}}>
            <View style={{height:70}}>
            <ViewPager
              style={{width:deviceWidth}}
              dataSource={this.state.dataSource_page}
              renderPage={this._renderPage.bind(this)}
              isLoop={true}
              autoPlay={false}/>
            </View>
            <TouchableOpacity onPress={()=>Browser.open(rowData.url, {
                showUrlWhileLoading: true,
                navigationButtonsHidden: false,
                showActionButton: true,
                showDoneButton: true,
                doneButtonTitle: '取消',
                showPageTitles: true,
                disableContextualPopupMenu: false,
                hideWebViewBoundaries: false,
              },function(error,url,title){

               var URL = this.props.webDomain+'/api/addcollect' + '?uid=' + this.props.id +'&title=' + title + '&url=' + url ;
               console.log(URL);
                fetch(URL)
                    .then((response) => response.json())
                    .then((responseData) => {
                      console.log(responseData);
                    })
                    .done();

                   })}>
             <View style={{flexDirection:'row',backgroundColor:'white',flex:1,height:80}}>
               <View style={{marginLeft:15,marginTop:16,flex:1,justifyContent:'space-between'}}>
                 <Text style={{fontSize:15}} numberOfLines={2}>{rowData.title}</Text>
                 <Text style={{fontSize:12,color:'gray',marginBottom:10}} numberOfLines={1}>{rowData.content}</Text>
               </View>
               <Image
                 source={{uri:this.props.picDomain+rowData.imgurl}}
                 defaultSource = {require('../../img/default.png')}
                 style={{width:80,height:60,marginRight:10,marginTop:10,marginBottom:10}}/>
             </View>
            </TouchableOpacity>

            </View>

          )
      }

    }else {
      return(
        <TouchableOpacity onPress={()=>Browser.open(rowData.url, {
            showUrlWhileLoading: true,
            navigationButtonsHidden: false,
            showActionButton: true,
            showDoneButton: true,
            doneButtonTitle: '取消',
            showPageTitles: true,
            disableContextualPopupMenu: false,
            hideWebViewBoundaries: false,
          },function(error,url,title){

           var URL = this.props.webDomain+'/api/addcollect' + '?uid=' + this.props.id +'&title=' + title + '&url=' + url ;
           console.log(URL);
            fetch(URL)
                .then((response) => response.json())
                .then((responseData) => {
                  console.log(responseData);
                })
                .done();

               })}>
         <View style={{flexDirection:'row',backgroundColor:'white',flex:1,height:80}}>
           <View style={{marginLeft:15,marginTop:16,flex:1,justifyContent:'space-between'}}>
             <Text style={{fontSize:15}} numberOfLines={2}>{rowData.title}</Text>
             <Text style={{fontSize:12,color:'gray',marginBottom:10}} numberOfLines={1}>{rowData.content}</Text>
           </View>
           <Image
             source={{uri:this.props.picDomain+rowData.imgurl}}
             defaultSource = {require('../../img/default.png')}
             style={{width:80,height:60,marginRight:10,marginTop:10,marginBottom:10}}/>
         </View>
        </TouchableOpacity>
      )
    }

  }


  _renderSeparator(sID,rowID){
    return(
      <View key={rowID} style={{flex:1,height:0.5,backgroundColor:'#D7D7D7'}}></View>
    )
  }

  _fetchData() {
    var URL = this.props.webDomain+API_URL + '?nid=' + this.props.type.nid;
     fetch(URL)
         .then((response) => response.json())
         .then((responseData) => {
           console.log(responseData);
           this.setState({
             dataSource: this.state.dataSource.cloneWithRows(responseData.list),
             dataSource_page:this.state.dataSource_page.cloneWithPages(responseData.advert),
           })
         })
         .done();
  }


  render(){
    return (
      <RefreshableListView
        style={{backgroundColor:'#EBEBEC',flex:1}}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderSeparator={this._renderSeparator}
        loadData={this._fetchData.bind(this)}
        refreshDescription="刷新数据"
      />
    )
  }

}

