import React from 'react';
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { styles } from './Styles';
export const showDeleteAlert = (title, action, item) => {
  Alert.alert(
    'Attention!', title,
    [
      {
        text: 'Delete',
        onPress: () => {
          action(item);
        },
      },
      {
        text: 'Cancel',
      },
    ],
  );
}

export function NavigationButton(props) {
  return (
    <TouchableOpacity onPress={() => props.onPress()} style={styles.navigationButton}>
      <Text style={[styles.navigationButton, props.textStyle]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

export function ProgressView() {
  return (
    <View style={styles.fullHeight}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}