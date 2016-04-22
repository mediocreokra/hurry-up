import React, {
  Text,
  View,
  Component,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

// import {getAllEvents} from '../helpers/request-helpers';
import {getDirections} from '../helpers/request-helpers';
import Directions from './directions-event';
import Event from './event-row';
var Icon = require('react-native-vector-icons/Ionicons');

var Icon = require('react-native-vector-icons/Ionicons');
const deviceWidth = Dimensions.get('window').width;

class AllEvents extends Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   var that = this;
  //   getAllEvents(that);
  // }

  buttonClicked() {
    //look into using websockets instead of refresh button / or state control

    var that = this;
    getAllEvents(that);
    this.render();
  }

  getDirections(event) {
    console.log('event city = ' + event.city);
    var that = this;
    navigator.geolocation.getCurrentPosition((position) => {

      // getDirections
      getDirections(event, position, that);
      console.log('currentPosition response = ' + position);
      
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

    console.log('button clicked for directions');
  }

  displayTime(time) {
    var dateTime = time.toString();
    var hours = dateTime.substring(16,18);
    var postfix;
    if (Number(hours) > 12) {
      postfix = 'PM';
      hours = hours - 12;
    } else {
      postfix = 'AM';
    }
    var minutes = dateTime.substring(19,21);
    return hours + ':' + minutes + ' ' + postfix;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
        {this.props.events.map((event, index) => 
          <Event key = {index} event={event}/>
        )}
          <Text style={styles.welcome}>no more events</Text>
        </ScrollView>
        <TouchableHighlight
          style={styles.button}
          onPress={this.buttonClicked.bind(this)}>
          <View>
            <Text style={styles.buttonText}>Refresh!</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  EventContainer: {
    flex: 1,
    margin: 7,
    padding: 15,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: '#F5F5F6',
  },
  EventRow: {
    flex: 1,
    flexDirection:'row',
  },
  EventTitle: {
    margin: 5,
    fontSize: 14,
    color: '#ACB2BE',
    textDecorationLine: 'underline'
  },
  EventInput: {
    flex: 1,
    alignItems: 'flex-end',
  },
  EventText: {
    flex: 1,
    margin: 5,
    fontSize: 16,
    color: '#F5F5F6',
  },
  welcome: {
    margin: 20,
    fontSize: 20,
    color: '#ACB2BE',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
  },
  button: {
    padding: 15,
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: '#34778A',
  },
  buttonText: {
    fontSize: 16,
    color: '#F5F5F6',
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-Light',
  },

  iconButton: {
    padding: 15,
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: '#34778A',
  }
});

export default AllEvents;
