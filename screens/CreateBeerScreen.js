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
import { saveBeer } from './../redux/actions/BeersActions';
import { ProgressView } from './Utils';

class CreateBeerScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
  };

  state = {
    name: '',
    type: '',
    beer: null,
  };

  createBeer = () => {
    const { name, type } = this.state;
    this.needProcess = true;
    this.props.saveBeer(name, type);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.beer && this.needProcess) {
      this.needProcess = false;
      this.goToHomeScreen();
    }
  }

  goToHomeScreen() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  changeName = (text) => {
    this.setState({name: text});
  }

  changeType = (text) => {
    this.setState({type: text});
  }


  render() {
    if (this.props.isLoading) {
      return <ProgressView />
    }
    return (
      <ScrollView style={[styles.container, styles.margin]}>
        <View>
          <Text>Name:</Text>
          <TextInput
            onChangeText={this.changeName}
            value={this.state.name}
            style={[styles.textInput, styles.marginBottom]}
          />

          <Text>Type:</Text>
          <TextInput 
            onChangeText={this.changeType}
            value={this.state.type}
            style={[styles.textInput, styles.marginBottom]}
          />

          { this.props.error ? 
            <Text style={[styles.error, styles.marginBottom]}>{this.props.error}</Text>
          : null }

          <Button
            onPress={this.createBeer}
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
    beer: state.beers.newBeer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveBeer: (name, type) => {
      dispatch(saveBeer({ name, type }));
    }
  }
};

const CreateBeerScreenContainer = connect(mapStateToProps, mapDispatchToProps)(CreateBeerScreen);

export default CreateBeerScreenContainer;
