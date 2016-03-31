'use strict';
import RefreshableListView from 'react-native-refreshable-listview';
import Browser from 'react-native-browser';
import ViewPager from 'react-native-viewpager';

import ProductFilter from './filter'
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

var API_URL = '/api/getProductByType';
var deviceWidth = require('Dimensions').get('window').width;
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../store/actions.js'
@connect(
  state=>({...state.global}),
  dispatch=>(bindActionCreators({
    ...Actions
},dispatch)))
export default class ViewProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var { getProductType,webDomain,navComponent,navigator } = this.props
    navComponent.setNavItems({
      rightItem: {
        component: (
          <TouchableOpacity  style={{flex:1}}>
            <View style={{flex:1,marginRight:15,flexDirection:'row',alignItems:'flex-end'}}>
              <Image style={{width: 24, height: 18,marginBottom:10}} source={require('../../img/shaixuan.png')}/>
              <Text style={{color:'white',fontSize:14,marginBottom:12}}>筛选</Text>
            </View>
          </TouchableOpacity>
        ),
        event:()=>{
          navigator.push({
            title:'筛选',
            component:<ProductFilter/>,
          })
        }
      }
    });
    this._fetchData();
    //提前查询分类信息

    getProductType(webDomain+'/api/getProductType') //获取产品分类数据
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
      if (this.props.proIndexDSPage.pageIdentities.length === 1) {
        return(
          <View style={{flex:1}}>
            <View style={{height:70}}>
              <TouchableOpacity onPress={()=>Browser.open(this.props.proIndexDSPage._dataBlob[0].url, {
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
                  source={{uri:this.props.picDomain+this.props.proIndexDSPage._dataBlob[0].imgurl}}
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
             <View style={{flexDirection:'row',backgroundColor:'white'}}>
               <Image
                 source={{uri:this.props.picDomain+rowData.imgurl}}
                 defaultSource = {require('../../img/default.png')}
                 style={{width:100,height:100,marginLeft:15,marginTop:10,marginBottom:10}}/>
               <View style={{marginLeft:10,marginRight:20,marginTop:16,flex:1}}>
                 <Text style={{fontSize:16,marginBottom:3}} numberOfLines={2}>{rowData.pname}</Text>
                 <Text style={{fontSize:12,color:'gray',marginTop:8}} numberOfLines={2}>{rowData.address}</Text>
                 <Text style={{fontSize:16,color:'#F84646',marginTop:8}} numberOfLines={2}>¥{rowData.pprice}</Text>

               </View>
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
              dataSource={this.props.proIndexDSPage}
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
             <View style={{flexDirection:'row',backgroundColor:'white'}}>
               <Image
                 source={{uri:this.props.picDomain+rowData.imgurl}}
                 defaultSource = {require('../../img/default.png')}
                 style={{width:100,height:100,marginLeft:15,marginTop:10,marginBottom:10}}/>
               <View style={{marginLeft:10,marginRight:20,marginTop:16,flex:1}}>
                 <Text style={{fontSize:16,marginBottom:3}} numberOfLines={2}>{rowData.pname}</Text>
                 <Text style={{fontSize:12,color:'gray',marginTop:8}} numberOfLines={2}>{rowData.address}</Text>
                 <Text style={{fontSize:16,color:'#F84646',marginTop:8}} numberOfLines={2}>¥{rowData.pprice}</Text>

               </View>
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
         <View style={{flexDirection:'row',backgroundColor:'white'}}>
           <Image
             source={{uri:this.props.picDomain+rowData.imgurl}}
             defaultSource = {require('../../img/default.png')}
             style={{width:100,height:100,marginLeft:15,marginTop:10,marginBottom:10}}/>
           <View style={{marginLeft:10,marginRight:20,marginTop:16,flex:1}}>
             <Text style={{fontSize:16,marginBottom:3}} numberOfLines={2}>{rowData.pname}</Text>
             <Text style={{fontSize:12,color:'gray',marginTop:8}} numberOfLines={2}>{rowData.address}</Text>
             <Text style={{fontSize:16,color:'#F84646',marginTop:8}} numberOfLines={2}>¥{rowData.pprice}</Text>

           </View>
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


  _fetchData() {
    let {
      selectProByID,
      webDomain,
      pid,
    } = this.props
    console.log('pid',pid);
    fetch(webDomain+API_URL+'?pid='+pid)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('产品',responseData);
        this.props.setIndexDS(responseData)
      })
      .done()
  }

  render(){ 
    return(
      <RefreshableListView
        style={{backgroundColor:'#EBEBEC'}}
        dataSource={this.props.proIndexDS}
        renderRow={this.renderRow.bind(this)}
        renderSeparator={this._renderSeparator}
        loadData={this._fetchData.bind(this)}
        refreshDescription="刷新数据"
      />
    )
  }

}

