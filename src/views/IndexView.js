'use strict';
import RefreshableListView from 'react-native-refreshable-listview';
import ViewPager from 'react-native-viewpager';
import Browser from 'react-native-browser';



import React, {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Navigator,
  ListView,
  ActivityIndicatorIOS,
  StyleSheet,
  ScrollView,
} from 'react-native';

var API_URL = '/api/getIndex';

var deviceWidth = require('Dimensions').get('window').width;


export default class IndexView extends React.Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var ds_page = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    var existArray =[]
    var noexistArray =[]

    this.state = {
      dataSource: ds.cloneWithRows(['0','1','2','3','4']),
      dataSource_page: ds_page,
      exist:existArray, //带图片链接
      noexist:noexistArray, //不带图片链接
      text:'',//网址
      searchText:'',//网址
      contentOffset:{x: 0, y: 0},
    };
  }	
  componentWillMount() {

  this.props.navComponent.setNavItems({
    rightItem: {
       component: (
         <View style={{width:this.props.deviceWidth,backgroundColor:'transparent',flex:1}}>
           <View style={{flex:1,flexDirection:'row',backgroundColor:'white',borderRadius:7,marginLeft:5,marginRight:5,marginTop:5,marginBottom:5}}>
             <Image
               source={require('../img/search.png')}
               style={{height:16,width:16,marginLeft:10,alignSelf:'center'}}/>
             <TextInput
               style={{flex:1,alignSelf:'center',marginLeft:5,marginRight:10,height:20}}
               onChangeText={(text) => this.setState({text})}
               placeholder = '输入网址'
               returnKeyType = 'search'
               onSubmitEditing ={()=>Browser.open(this.state.text, {
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
                   // console.log(URL);
                     fetch(URL)
                         .then((response) => response.json())
                         .then((responseData) => {
                          // console.log(responseData);
                         })
                         .done();
                     })}
               keyboardType = 'url'
               clearButtonMode = 'while-editing'
            	/>
           </View>
         </View>
       )
    	}

		})
  }
  componentDidMount() {
    this._fetchData();
  }

  doPushToSearchView(){
    this.props.navigator.push({
      title: '搜索',
      component: <SearchView/>
    });
  }

  _renderPage(data,pageID) {
  	let _data = data || {};
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
          //console.log(URL);
           fetch(URL)
               .then((response) => response.json())
               .then((responseData) => {
                 console.log(responseData);
               })
               .done();

             })}>
        <Image
          source={{uri:this.props.picDomain+_data.imgurl}}
          defaultSource = {require('../img/default.png')}
          style={{width:deviceWidth,height:120}} />
      </TouchableOpacity>
    );
  }

  _renderExist(exist,index){
    return(
        <View key={index} style={{width:37,height:60,marginLeft:23,marginTop:12}}>
                <TouchableOpacity onPress={()=>Browser.open(exist.url, {
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
                     fetch(URL)
                         .then((response) => response.json())
                         .then((responseData) => {
                           console.log(responseData);
                         })
                         .done();
                       })}>
					          <Image
					            source={{uri:this.props.picDomain+exist.thumburl}}
					            defaultSource = {require('../img/default.png')}
					            style={{width:37,height:37}}/>
					                </TouchableOpacity>
          <Text style ={{alignSelf:'center',marginTop:10,fontSize:10}}>{exist.keyword}</Text>
        </View>

    )
  }


  _renderNoexist(noexist,index,arr){
    var borderBottomWidth;
    if (parseInt(index/4) === parseInt(arr.length/4)) {
      borderBottomWidth =0;
    }else {
      borderBottomWidth =0.5;
    }
    return(
      <View key={index} style={{width:this.props.deviceWidth/4,height:40,borderBottomWidth:borderBottomWidth,borderBottomColor:'#D7D7D7',justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>Browser.open(noexist.url, {
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
          <Text style ={{alignSelf:'center'}}>{noexist.keyword}</Text>
        </TouchableOpacity>
      </View>
    )
  }


  renderRow(rowData){
     if (rowData === '0') {
     	let pageIden =  this.state.dataSource_page.pageIdentities.length;
     	if(pageIden === 0) return (<View></View>)
     if ( pageIden === 1) {
       return(
         <View style={{height:120,flex:1}}>
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
                fetch(URL)
                    .then((response) => response.json())
                    .then((responseData) => {
                      console.log(responseData);
                    })
                    .done();

                  })}>
             <Image
               source={{uri:this.props.picDomain+this.state.dataSource_page._dataBlob[0].imgurl}}
               defaultSource = {require('../img/default.png')}
               style={{width:deviceWidth,height:120}}/>
           </TouchableOpacity>
         </View>
       )
     }else {
       return(
         <View style={{height:120}}>
           <ViewPager
             style={{width:deviceWidth}}
             dataSource={this.state.dataSource_page}
             renderPage={this._renderPage.bind(this)}
             isLoop={true}
             autoPlay={true}/>
         </View>
       )
     }
     }else if (rowData === '1') {
       return(
         <View style={{backgroundColor:'white',flex:1,height:155,flexDirection:'row',flexWrap:'wrap'}}>
           {this.state.exist.map((exist,index)=>this._renderExist(exist,index))}
         </View>
       )
     }else if (rowData === '2') {
       return(
         <View style={{backgroundColor:'white',flex:1,height:65,justifyContent:'center'}}>
           <View style={{backgroundColor:'#4DA3F7',flex:1,marginLeft:22,marginRight:22,marginTop:13,marginBottom:13,borderRadius:3,flexDirection:'row'}}>
             <View style={{flex:1,flexDirection:'row',backgroundColor:'white',marginLeft:3,marginTop:3,marginBottom:3,borderRadius:2}}>
               <Image
                 source={require('../img/baidu.png')}
                 style={{height:24,width:25,marginLeft:5,alignSelf:'center'}}/>
                 <TextInput
                   style={{flex:1,alignSelf:'center',marginLeft:5,marginRight:10,height:33}}
                   placeholder='输入关键字'
                   onFocus ={() => this.setState({contentOffset:{x: 0, y: 200}})}
                   onChangeText={(searchText) => this.setState({searchText})}
                   onEndEditing={() => this.setState({contentOffset:{x: 0, y: 0}})}/>
             </View>
             <View style={{alignSelf:'center',width:60}}>
               <TouchableOpacity  style={{alignSelf:'center'}} onPress={this._doPushToSearchView.bind(this)}>
                <Text style={{color:'white',fontSize:15}}>搜索</Text>
               </TouchableOpacity>
             </View>
           </View>

         </View>
       )
     }else if (rowData === '3') {
       return(
         <View style={{backgroundColor:'#F2F2F2',flex:1,height:12}}>
         </View>
       )
     }else{
       return(
         <View style={{backgroundColor:'white',flex:1,height:(parseInt(this.state.noexist.length/4)+((this.state.noexist.length%4 === 0) ? 0 : 1))*40,flexDirection:'row',flexWrap:'wrap'}}>
           {this.state.noexist.map((noexist,index,arr)=>this._renderNoexist(noexist,index,arr))}
         </View>
       )
     }
  }

  _renderSeparator(sectionID,rowID){
    return(
      <View key={rowID} style={{flex:1,height:0.5,backgroundColor:'#D7D7D7'}}></View>
    )
  }

  _doPushToSearchView(){
    var url = 'https://m.baidu.com/from=844b/s?word=' + this.state.searchText
    url = encodeURI(url);
     Browser.open(url, {
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
         // console.log(URL);
           fetch(URL)
               .then((response) => response.json())
               .then((responseData) => {
              //   console.log(responseData);
               })
               .done();

           });

  }

  _fetchData() {
    var URL = this.props.webDomain+API_URL;
    console.log(URL);

     fetch(URL)
         .then((response) => { 
            console.log(response)
            return response.json()})
         .then((responseData) => {
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          var ds_page = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
          });
          console.log(responseData);
        //  console.log('res',responseData);
          this.setState({
          	exist:responseData.exist,
            noexist:responseData.noexist,
            dataSource:ds.cloneWithRows(['0','1', '2','3','4']),
            dataSource_page:this.state.dataSource_page.cloneWithPages(responseData.advert)
          });
         })
         .done();
  }

  render(){
    return (
      <RefreshableListView
        style={{backgroundColor:'#EBEBEC'}}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderSeparator={this._renderSeparator}
        loadData={this._fetchData.bind(this)}
        contentOffset={this.state.contentOffset}
        refreshDescription="刷新数据"
      />

    )
  }

}


