import React from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableHighlight,
} from 'react-native';
import { styles, colors } from './Styles';
import { getBeers } from './../redux/actions/BeersActions';
import { saveBeerFromUser } from './../redux/actions/BeersFromUserActions';
import { ProgressView, NavigationButton } from './Utils';
import { connect } from 'react-redux';

class BeersScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Registered Beers',
      headerRight: (
        <NavigationButton onPress={() => params.createNewBeer()} title="+" />
      ),
    };
  };

  state = {
     items: [],
  };

  componentDidMount() {
    this.props.navigation.setParams({ createNewBeer: this.createNewBeer });
    this.props.getBeers();
  }

  createNewBeer = () => {
    const { navigate } = this.props.navigation;
    navigate('CreateBeer');
  }

  selectBeer = (item) => {
    this.props.saveBeerFromUser(item.id, this.props.userId);
  }

  renderItem = ({item}) => {
    return (
      <TouchableHighlight
        style={styles.listItem}
        underlayColor={colors.lightGreen}
        onPress={this.selectBeer}
      >
        <View>
          <Text style={styles.listItemTitle}>{item.name}</Text>
          <Text style={styles.listItemSubtitle}>{item.type}</Text>
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
    items: state.beers.beers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBeers: () => {
      dispatch(getBeers());
    },
    saveBeerFromUser: (beerId, userId) => {
      dispatch(saveBeerFromUser({beerId, userId}));
    }
  }
};

const BeersScreenContainer = connect(mapStateToProps, mapDispatchToProps)(BeersScreen);

export default BeersScreenContainer;