import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import LoginScreenContainer from './screens/LoginScreen';
import CreateUserScreen from './screens/CreateUserScreen';
import { Provider } from 'react-redux';
import { colors } from './screens/Styles';
import { store } from './redux/reducers';

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreenContainer,
    Home: HomeScreen,
    CreateUser: CreateUserScreen,
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