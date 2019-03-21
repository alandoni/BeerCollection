import { StyleSheet } from 'react-native';

const colors = {
  red: '#f4511e',
  green: '#375133',
  okGreen: '#008000',
  orange: '#ff9933',
  gray: '#555555',
  lightGray: '#a0a0a0',
  lighterGray: '#f1efef',
  white: '#fafafa',
  black: '#000000',
  lightYellow: '#fffedf',
  yellow: '#fff71a',
  brown: '#663300',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  fullHeight: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    fontSize: 18, 
  },
  button: {
    backgroundColor: colors.green,
  },
  buttonText: {
    color: colors.yellow,
  },
  error: {
    marginLeft: 10,
    paddingLeft: 8,
    marginRight: 10,
    paddingRight: 8,
    borderColor: colors.red,
    borderWidth: 1,
    borderStyle: 'dashed',
    backgroundColor: colors.lightYellow,
    color: colors.red,
  },
  colorOkGreen: {
    color: colors.okGreen,
  },
  colorOrange: {
    color: colors.orange,
  },
  link: {
    color: colors.green,
    textDecorationLine: 'underline',
  },
  margin: {
    margin: 10
  },
  marginBottom: {
    marginBottom: 10
  }
});

export { styles, colors };