import {ListView} from 'react-native'
import ViewPager from 'react-native-viewpager';
let getDS = () => (new ListView.DataSource({rowHasChanged: () => ri !== r2}))
let getDSPage = () => (new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2,}))

const InitialState = {
  sessionToken: null,
  currentUser: null,
  showState: false,
  currentState: null,
  store: null,
  deviceWidth:require('Dimensions').get('window').width,
  //  picDomain:'http://172.20.0.141:9093',
  //  webDomain:'http://172.20.0.141:9093',
	picDomain: 'http://localhost:3000',
	webDomain: 'http://localhost:3000/china',
	mainColor: '#4DA3F7', //蓝色
	id: '',
	account: '',
  appStatus: '0',
  pid:'',
  proDS: getDS(),
  proIndexDS: getDS(),
  proIndexDSPage:getDSPage(),
  proTpyeDataArray:getDS(),
  proTypeLoaded:false,
  InfoDS:[],
  InfoDS_loaded:false,
}

export default InitialState
