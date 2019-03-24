
import React from 'react';
import { Camera, Permissions } from 'expo';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { styles } from './Styles';
import { Image } from 'react-native-elements';

export default class CameraScreen extends React.Component {

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: Camera.Constants.FlashMode.off,
  };

  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  changeFlash = () => {
    if (this.state.flash === Camera.Constants.FlashMode.off) {
      this.setState({flash: Camera.Constants.FlashMode.on})
    } else {
      this.setState({flash: Camera.Constants.FlashMode.off})
    }
  }

  changeType = () => {
    if (this.state.type === Camera.Constants.Type.back) {
      this.setState({type: Camera.Constants.Type.front})
    } else {
      this.setState({type: Camera.Constants.Type.back})
    }
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 1, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({
        picture: data
      });
    }
  }

  save = () => {

  }
  
  cancel = () => {
    if (this.state.picture) {
      this.setState({picture: null});
    } else {
      const { goBack } = this.props.navigation;
      goBack();
    }
  }

  render() {
    return (
      <View style={styles.container} >
        { this.state.picture ?
          <Image
            style = {styles.camera}
            source={{ data: this.state.picture }}
          />
        :
          <Camera
            ref={camera => { this.camera = camera }}
            style = {styles.camera}
            type={this.state.type}
            autoFocus={Camera.Constants.AutoFocus.on}
            flashMode={this.state.flash}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera'}
          />
        }
        <SafeAreaView>
          <View style={styles.simulateNavigationBar}>
            <TouchableOpacity 
              onPress={this.cancel}
              style={styles.simulateNavigationBarButton}
            >
              <Text style={styles.buttonTextWhite}> CANCEL </Text>
            </TouchableOpacity>
            { this.state.picture ?
            <TouchableOpacity
              onPress={this.save}
              style={[styles.simulateNavigationBarButton]}
            >
              <Text style={[styles.buttonTextWhite, styles.textRight]}> SAVE </Text>
            </TouchableOpacity>
            : null }
          </View>
          { !this.state.picture ?
            <View style={styles.cameraButtonsContainer}>
              <TouchableOpacity
                onPress={this.changeFlash}
                style={[ styles.cameraButton, styles.centerContent ]}
              >
                <Text style={styles.buttonTextWhite}> FLASH </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.takePicture}
                style={[ styles.cameraButton, styles.centerContent ]}
              >
                <Text style={styles.buttonTextWhite}> SNAP </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.changeType}
                style={[ styles.cameraButton, styles.centerContent ]}
              >
                <Text style={styles.buttonTextWhite}> CHANGE CAMERA </Text>
              </TouchableOpacity>
            </View>
          : null }
        </SafeAreaView>
      </View>
    );
  }
}