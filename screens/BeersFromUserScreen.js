import React from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { styles, colors } from './Styles';
import { ProgressView, NavigationButton } from './Utils';
import { connect } from 'react-redux';
import { showDeleteAlert } from './Utils';
import { deleteBeerFromUser, getBeersFromUser } from './../redux/actions/BeersFromUserActions';
import { getBeers } from './../redux/actions/BeersActions';
import { logout, listenAuth } from './../redux/actions/LoginAction';
import { Image } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

class BeersFromUserScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Your Beer Collection',
      headerRight: (
        <NavigationButton onPress={() => params.addNewBeer()} title="+" />
      ),
      headerLeft: (
        <NavigationButton onPress={() => params.logout()} textStyle={styles.navigationButtonText} title="Logout" />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ addNewBeer: this.addNewBeer });
    this.props.navigation.setParams({ logout: this.logout });
    this.props.listenAuth();
    this.props.getBeers();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isLoggedIn === false) {
      this.backToLogin();
    }
  }

  logout = () => {
    this.props.logout();
  }

  addNewBeer = () => {
    const { navigate } = this.props.navigation;
    navigate('Beers');
  }

  backToLogin = () => {
    const { navigate } = this.props.navigation;
    navigate('SignedOut');
  }

  takePicture = (item) => {
    this.goToCamera();
  }

  goToCamera = () => {
    const { navigate } = this.props.navigation;
    navigate('Camera');
  }

  confirmDelete = (item) => {
    showDeleteAlert('Are you sure you want to delete this beer from your collection?', 
      this.deleteItem, 
      item,
    );
  }

  deleteItem = (item) => {
    this.props.deleteBeer(item.id);
  }

  renderItem = ({item}) => {
    return (
      <TouchableHighlight onPress={() => { this.takePicture(item) }}>
        <View style={[ styles.listItem, styles.row ]}>
          <Image 
            style={styles.listItemImage}
            source={require('../assets/images/beer_mug_preview.png')}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View style={[ styles.fullWidth, styles.column ]}>
            <Text style={styles.listItemTitle}>{item.beer.name}</Text>
            <Text style={styles.listItemSubtitle}>{item.beer.type}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={[ styles.centerContent, styles.fullHeight ]}
              onPress={() => this.confirmDelete(item)}>
              <Text style={[ styles.listItemTitle ]}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.props.isLoading) {
      return <ProgressView />
    }
    return (
      <View style={styles.container}>
        { this.props.error ?
          <Text style={styles.error}>{this.props.error}</Text>
        : null }
        { this.props.items && this.props.items.length > 0 ?
          <FlatList
            data={this.props.items}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            style={styles.fullHeight}
          />
        : null }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { 
    error: state.general.error,
    isLoading: state.general.isLoading,
    isLoggedIn: state.login.isLoggedIn,
    items: state.beers.beersFromUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBeers: (userId) => {
      dispatch(getBeers());
      dispatch(getBeersFromUser(userId));
    },
    deleteBeer: (id) => {
      dispatch(deleteBeerFromUser(id));
    },
    logout: () => {
      dispatch(logout());
    },
    listenAuth: () => {
      dispatch(listenAuth());
    }
  }
};

const BeersFromUserScreenContainer = connect(mapStateToProps, mapDispatchToProps)(BeersFromUserScreen);

export default BeersFromUserScreenContainer;
