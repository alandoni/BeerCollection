import { StyleSheet } from 'react-native';

const colors = {
  red: '#f4511e',
  green: '#375133',
  okGreen: '#008000',
  lightGreen: '#d5dfd2',
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
  },
  navigationButton: {
    backgroundColor: colors.green,
    color: colors.yellow,
    fontSize: 24,
    height: 32,
    minWidth: 42,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  navigationButtonText: {
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  listItem: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  listItemTitle: {
    fontSize: 20,
    color: colors.green,
  },
  listItemSubtitle: {
    fontSize: 16,
    color: colors.gray,
  },
});

export { styles, colors };