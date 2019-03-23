import React from 'react';
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { styles, colors } from './Styles';
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
    <View style={[styles.fullHeight, {marginTop: 40}]}>
      <ActivityIndicator size="large" color={colors.green} />
    </View>
  );
}