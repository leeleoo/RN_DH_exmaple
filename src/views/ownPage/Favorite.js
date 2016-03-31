'use strict';
import RefreshableListView from 'react-native-refreshable-listview';
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
} from 'react-native';

var API_URL = '/api/getCollect';

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
      editState:false,
    };
    this.props.navComponent.setNavItems({
      rightItem: {
        component: (
          <TouchableOpacity  style={{flex:1}}>
            <View style={{flex:1,marginRight:20,justifyContent:'center'}}>
              <Text style={{color:'white',fontSize:14}}>编辑</Text>
            </View>
          </TouchableOpacity>
        ),
        event: function() {
          this.setState({editState:!this.state.editState});
          this._fetchData();

        }.bind(this)
      }
    });
  }

  componentDidMount() {
    this._fetchData();
  }


  renderRow(rowData,sectionID,rowID){
    console.log(this.state.editState);
    if (this.state.editState ===false) {
      return this.renderRowFirst(rowData);
    }else {
      return this.renderRowSecond(rowData,sectionID,rowID);
    }
  }

  renderRowFirst(rowData){
    return(
      <TouchableOpacity onPress={()=>Browser.open(rowData.url, {
          showUrlWhileLoading: true,
          navigationButtonsHidden: false,
          showActionButton: false,
          showDoneButton: true,
          doneButtonTitle: '取消',
          showPageTitles: true,
          disableContextualPopupMenu: false,
          hideWebViewBoundaries: false,
          hasCollected:true
        },function(){}
        )}>
       <View style={{borderBottomWidth:0.5,borderBottomColor:'#D7D7D7',backgroundColor:'white',height:50,flex:1,}}>
         <Text style={{fontSize:15,marginLeft:15,marginTop:8}} numberOfLines={1}>{rowData.title}</Text>
         <Text style={{fontSize:12,color:'gray',marginLeft:15,marginTop:4}} numberOfLines={1}>{rowData.url}</Text>
      </View>
      </TouchableOpacity>
    )
  }

  renderRowSecond(rowData,sectionID,rowID){
    return(
      <TouchableOpacity onPress={()=>{
              var URL = this.props.webDomain + '/api/deleteCollectionByID' + '?id=' + rowData.id;
              console.log(URL);
               fetch(URL)
                   .then((response) => response.json())
                   .then((responseData) => {
                     console.log(responseData);
                     this._fetchData();
                   })
                   .done();
        }}>
       <View style={{backgroundColor:'white',height:50,flex:1,flexDirection:'row'}}>
         <View style={{flex:1, marginRight:10}}>
           <Text style={{fontSize:15,marginLeft:15,marginTop:8}} numberOfLines={1}>{rowData.title}</Text>
           <Text style={{fontSize:12,color:'gray',marginLeft:15,marginTop:4}} numberOfLines={1}>{rowData.url}</Text>
         </View>
         <Image
           source={require('../../img/delete.png')}
           style={{width:22,height:22,alignSelf:'center', marginRight:10}}/>
       </View>
      </TouchableOpacity>
    )
  }

  _renderSeparator(sectionID,rowID){
    return(
      <View key={rowID} style={{flex:1,height:0.5,backgroundColor:'#D7D7D7'}}></View>
    )
  }

  _fetchData() {
    // Get an array for a given key...
    var URL = this.props.webDomain+API_URL + '?uid=' + this.props.id;
    console.log(URL);
     fetch(URL)
         .then((response) => response.json())
         .then((responseData) => {
           console.log(responseData);
           this.setState({
             dataSource: this.state.dataSource.cloneWithRows(responseData),
           })
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
        refreshDescription="刷新数据"
      />
    )
  }

}

module.exports = Favorite;
