import React from 'react';
import {
  ScrollView,
  TextInput,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './Styles';
import { connect } from 'react-redux';
import { createUser } from './../redux/actions/RegisterAction';
import { ProgressView } from './Utils';

const PASSWORD_WEAK = 'This Password is too weak!';
const PASSWORD_STRONG = 'Strong!';
const PASSWORD_MEDIUM = 'Medium!';

class CreateUserScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };

  state = {
    email: '',
    password: '',
    retypePassword: '',
  };

  createNewUser = () => {
    if (this.state.passwordStrength === PASSWORD_WEAK) {
      return;
    }
    const { email, password, retypePassword } = this.state;
    this.needProcess = true;
    this.props.createUser(email, password, retypePassword);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.user && this.needProcess) {
      this.needProcess = false;
      this.goToHomeScreen();
    }
  }

  goToHomeScreen() {
    const { navigate } = this.props.navigation;
    navigate('SignedIn');
  }

  changeLogin = (text) => {
    this.setState({email: text});
  }

  changePassword = (text) => {
    this.setState({password: text});

    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');

    if (text.length === 0) {
      this.setState({passwordStrength: null})
      return;
    }
    if (strongRegex.test(text)) {
      this.setState({passwordStrength: PASSWORD_STRONG, error: null});
    } else if (mediumRegex.test(text)) {
      this.setState({passwordStrength: PASSWORD_MEDIUM, error: null});
    } else {
      this.setState({passwordStrength: PASSWORD_WEAK})
    }
  }

  getStyleBasedOnStrength = () => {
    if (this.state.passwordStrength === PASSWORD_WEAK) {
      return styles.error;
    } else if (this.state.passwordStrength === PASSWORD_MEDIUM) {
      return styles.colorOrange;
    } else {
      return styles.colorOkGreen;
    }
  }

  changeRetypePassword = (text) => {
    this.setState({retypePassword: text});
  }

  render() {
    if (this.props.isLoading) {
      return <ProgressView />
    }
    return (
      <ScrollView style={[styles.container, styles.margin]}>
        <View>
          <Text>Email:</Text>
          <TextInput
            onChangeText={this.changeLogin}
            value={this.state.email}
            style={[styles.textInput, styles.marginBottom]}
          />

          <Text>Password:</Text>
          <TextInput 
            onChangeText={this.changePassword}
            value={this.state.password}
            style={[styles.textInput, styles.marginBottom]}
          />

          { this.state.passwordStrength ?
            <Text style={[styles.marginBottom, this.getStyleBasedOnStrength()]}>{this.state.passwordStrength}</Text>
          : null }

          <Text>Confirm Password:</Text>
          <TextInput
            onSubmitEditing={this.validatePassword}
            onBlur={this.validatePassword}
            onChangeText={this.changeRetypePassword}
            value={this.state.retypePassword}
            style={[styles.textInput, styles.marginBottom]}
          />

          { this.props.error ? 
            <Text style={[styles.error, styles.marginBottom]}>{this.props.error}</Text>
          : null }

          <Button
            onPress={this.createNewUser}
            title="Register"
            buttonStyle={[styles.button]}
            titleStyle={styles.buttonText}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return { 
    error: state.general.error,
    isLoading: state.general.isLoading,
    user: state.createUser.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: (email, password, retypePassword) => {
      dispatch(createUser(email, password, retypePassword));
    }
  }
};

const CreateUserScreenContainer = connect(mapStateToProps, mapDispatchToProps)(CreateUserScreen);

export default CreateUserScreenContainer;
