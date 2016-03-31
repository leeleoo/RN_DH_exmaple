'use strict';
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
  WebView,
  Alert,
} from 'react-native';

var WEBVIEW_REF = 'webview';

export default class Browser extends React.Component {
  constructor(props) {
    super(props);
  }
  _renderLoading(){
  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>正在加载页面...</Text>
    </View>
  )
  }

  componentDidMount() {
    console.log(this.props.route.passData);
  }

  goBack() {
    this.refs[WEBVIEW_REF].goBack();
  }

  goForward() {
    this.refs[WEBVIEW_REF].goForward();
  }

  reload() {
    this.refs[WEBVIEW_REF].reload();
  }

  doCollect(){
  var title =  this.props.route.passData.title;
  var url = this.props.route.passData.url;
  var URL = this.props.webDomain+'/api/addcollect' + '?uid=' + DataManager.getFetchData().id +'&title=' + title + '&url=' + url ;
   fetch(URL)
       .then((response) => response.json())
       .then((responseData) => {
         if (responseData.result === 0) {
             Alert.alert('收藏成功！');
         }
       })
       .done();
  }

  render(){
    return (
      <View style={{flex:1}}>
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={true}
          style={{flex:1}}
          url={this.props.route.passData.url}
          javaScriptEnabledAndroid={true}
          startInLoadingState={true}
          renderLoading={this._renderLoading}
          />
        <View style={{height:49,backgroundColor:'#f5f5f5',borderTopWidth:0.5,borderTopColor:'gray',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <TouchableOpacity onPress={this.goBack.bind(this)}>
            <Image
            source={require('../img/houtui.png')}
            style={{width:14,height:25}}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.goForward.bind(this)}>
            <Image
            source={require('../img/qianjin.png')}
            style={{width:16,height:25}}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.reload.bind(this)}>
            <Image
            source={require('../img/shuaxin.png')}
            style={{width:25,height:28}}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.doCollect.bind(this)}>
            <Image
            source={require('../img/collect.png')}
            style={{width:22,height:28}}
            />
          </TouchableOpacity>

        </View>
      </View>

    )
  }

}

