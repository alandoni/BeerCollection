import React from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { styles } from './Styles';
import { Image } from 'react-native-elements';

export default class BeerScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Your Beer Collection',
    }
  }

  state = {
    beerFromUser: null,
  }

  componentWillMount() {
    const beerFromUser = this.props.navigation.getParam('beerFromUser')
    this.setState({
      beerFromUser,
    });
  }

  changePicture = () => {
    const { navigate } = this.props.navigation;
    navigate('Camera', {id: this.state.beerFromUser.id});
  }

  render() {
    return (
      <View style={[styles.container, styles.margin]}>
        <Text style={[styles.listItemTitle, styles.marginBottom]}>{this.state.beerFromUser.beer.name}</Text>
        <Text style={styles.listItemSubtitle}>{this.state.beerFromUser.beer.type}</Text>

        <View style={[styles.fullHeight, styles.margin]}>
          <TouchableOpacity
            onPress={this.changePicture}
          >
          { this.state.beerFromUser.picture ?
            <Image
              style={[styles.height100, styles.width100]}
              source={{ uri: this.state.beerFromUser.picture }}
            />
          :
            <Image
              style={[styles.fullHeight, styles.margin]}
              source={require('../assets/images/beer_mug_preview.png')}
            />
          }
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}