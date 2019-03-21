import React from 'react';
import {
  Text,
  FlatList,
  View,
} from 'react-native';
import firebase from './../firebase';
import { Button } from 'react-native-elements';
import { styles } from './Styles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Lista",
    
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.listenFirebaseAuth();
    this.requestData();
  }

  listenFirebaseAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("We are authenticated now!");
      } else {
        this.goToLogin();
      }
    });
  }

  goToLogin = () => {
    const { navigate } = this.props.navigation;
    navigate('LoginScreen');
  }

  requestData = async () => {
    
  }

  deleteItemWithConfirmation = (item) => {
    
  }

  deleteItem = (item) => {

  }

  renderItem = ({item}) => {
    return (
      <View>
        <Text>item</Text>
        <Button 
          onPress={() => this.deleteItemWithConfirmation(item)}
          value="x"
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.error ?
          <Text style={styles.error}>{this.state.error}</Text>
        : null }
        <FlatList
          data={this.state.shopLists}
          extraData={this.state.refresh}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          style={styles.fullHeight}
        />
      </View>
    );
  }
}
