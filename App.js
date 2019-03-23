import React from 'react';
import firebase from './firebase';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import BeersFromUserScreenContainer from './screens/BeersFromUserScreen';
import LoginScreenContainer from './screens/LoginScreen';
import CreateUserScreenContainer from './screens/CreateUserScreen';
import BeersScreenContainer from './screens/BeersScreen';
import CreateBeerScreenContainer from './screens/CreateBeerScreen';
import { Provider } from 'react-redux';
import { colors } from './screens/Styles';
import { store } from './redux/reducers';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.green,
  },
  headerTintColor: colors.yellow,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRightContainerStyle: {
    paddingRight: 10,
    backgroundColor: colors.green,
  },
};

const SignedInStack = createStackNavigator({
  Home: BeersFromUserScreenContainer,
  Beers: BeersScreenContainer,
  CreateBeer: CreateBeerScreenContainer,
}, { defaultNavigationOptions }
);

const SignedOutStack = createStackNavigator({
  Login: LoginScreenContainer,
  CreateUser: CreateUserScreenContainer,
}, { defaultNavigationOptions }
);


const navigator = createSwitchNavigator({
  SignedIn: SignedInStack,
  SignedOut: SignedOutStack
}, {
  initialRouteName: 'SignedOut',
});

const AppContainer = createAppContainer(navigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}