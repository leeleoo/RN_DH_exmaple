var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} = React;

var deviceWidth = require('Dimensions').get('window').width;
//var TAB_UNDERLINE_REF = 'TAB_UNDERLINE';



export default class IndexTabBar extends React.Component {
  constructor(props){
    super(props)
  }
  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;
    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)}>
        <View style={{backgroundColor: isTabActive ? this.props.mainColor : 'transparent',borderRadius:3,height:30,justifyContent:'center'}}>
          <Text style={{color: isTabActive ? 'green' : 'black',marginLeft:6,marginRight:6}}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={{backgroundColor:'#F4F5F6'}}>
        <ScrollView
           horizontal
           pagingEnabled
           automaticallyAdjustContentInsets={false}
           showsHorizontalScrollIndicator={false}
           horizontal={true}
           style={{height:30,margin:5}}>
         {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
       </ScrollView>
      </View>
    );
  }
}