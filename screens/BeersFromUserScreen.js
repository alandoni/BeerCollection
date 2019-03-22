import React from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableHilight,
} from 'react-native';
import { styles } from './Styles';
import { ProgressView, NavigationButton } from './Utils';
import { connect } from 'react-redux';
import { showDeleteAlert } from './Utils';
import { deleteBeerFromUser, getBeersFromUser } from './../redux/actions/BeersFromUserActions';

class BeersFromUserScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Your Beer Collection',
      headerRight: (
        <NavigationButton onPress={() => params.addNewBeer()} title="+" />
      ),
    };
  };

  state = {
    items: [],
  };

  componentDidMount() {
    this.props.navigation.setParams({ addNewBeer: this.addNewBeer });
    this.props.getBeers();
  }

  addNewBeer = () => {
    const { navigate } = this.props.navigation;
    navigate('Beers');
  }

  confirmDelete = (item) => {
    showDeleteAlert('Are you sure you want to delete this beer from your collection?', this.deleteItem, item);
  }

  deleteItem = (item) => {
    this.props.deleteBeer(item.id);
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>{item.name}</Text>
        <Text style={styles.listItemSubtitle}>{item.type}</Text>
        <TouchableHilight>
          <Text style={styles.listItemTitle}>X</Text>
        </TouchableHilight>
      </View>
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
    items: state.beersFromUsers.beersFromUsers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBeers: (userId) => {
      dispatch(getBeersFromUser(userId));
    },
    deleteBeer: (id) => {
      dispatch(deleteBeerFromUser(id));
    }
  }
};

const BeersFromUserScreenContainer = connect(mapStateToProps, mapDispatchToProps)(BeersFromUserScreen);

export default BeersFromUserScreenContainer;
