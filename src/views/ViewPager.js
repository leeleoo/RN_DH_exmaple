import React, { 
	Component,
	NetInfo,
	Text,
	View,
	StyleSheet,
	Image,
	Platform,
	AsyncStorage,
	 } from 'react-native';
import autobind from 'autobind-decorator'
import ViewPager from 'react-native-viewpager';

let deviceWidth = require('Dimensions').get('window').width;
let deviceHeight = require('Dimensions').get('window').height;

@autobind
export default class ViewPagerComponent extends Component {
	constructor(props){
		super(props);
		let ds_page = new ViewPager.DataSource({
			pageHasChanged:(p1,p2)=> p1 !== p2,
		})
		let pageData = ds_page
			.cloneWithPages(['intro_1','intro_2','intro_3','intro_4'])
		this.state={
			pageData
		}
	}
	_renderIntroPage(data,pageID){
		if (data === 'intro_1') {
		  return (
		      <Image
		        source={require('../img/intro_1.png')}
		        style={{width:deviceWidth,height:deviceHeight}} />
		  );
		}else if (data === 'intro_2') {
		  return (
		      <Image
		        source={require('../img/intro_2.png')}
		        style={{width:deviceWidth,height:deviceHeight}} />
		  );
		}else if (data === 'intro_3') {
		  return (
		      <Image
		        source={require('../img/intro_3.png')}
		        style={{width:deviceWidth,height:deviceHeight}} />
		  );
		}else if (data === 'intro_4') {
		  return (
		      <View style ={{backgroundColor:'gray',flex:1}}>
		      </View>
		  );
		}
	}
	_renderPageIndicator(){
		return (
				<View></View>
			)
	}
	setUsed(i){
		if (i === 3){
			AsyncStorage.setItem('Used','true',(err)=>{
				console.log(err);
				setTimeout(()=>{
					this.props.setAppStatus("TabBarView")
				},200)
			})
		}
	}
	render() {
		return (
				<View style={{flex:1}}>
					<ViewPager
					  style={{width:deviceWidth}}
					  dataSource={this.state.pageData}
					  renderPage={this._renderIntroPage}
					  isLoop={false}
					  autoPlay={false}
					  onChangePage={this.setUsed}
					  renderPageIndicator={this._renderPageIndicator}/>
				</View>
			)

	}
}
