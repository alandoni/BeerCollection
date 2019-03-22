import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import BeersFromUserScreenContainer from './screens/BeersFromUserScreen';
import LoginScreenContainer from './screens/LoginScreen';
import CreateUserScreenContainer from './screens/CreateUserScreen';
import BeersScreenContainer from './screens/BeersScreen';
import CreateBeerScreenContainer from './screens/CreateBeerScreen';
import { Provider } from 'react-redux';
import { colors } from './screens/Styles';
import { store } from './redux/reducers';

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreenContainer,
    Home: BeersFromUserScreenContainer,
    CreateUser: CreateUserScreenContainer,
    Beers: BeersScreenContainer,
    CreateBeer: CreateBeerScreenContainer,
  },
  {
    defaultNavigationOptions: {
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
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}