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
  fullWidth: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  textRight: {
    textAlign: 'right',
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
  buttonTextWhite: {
    color: colors.white,
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
    marginTop: 16,
    marginLeft: 4,
    height: 26,
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
  listItemImage: {
    marginTop: 3,
    marginRight: 5,
    width: 40,
    height: 40,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: colors.yellow,
  },
  backgroundBlack: {
    backgroundColor: colors.black,
  },
  simulateNavigationBar: {
    position: 'absolute',
    flexDirection: 'row',
    minHeight: 32,
    marginTop: 20,
  },
  simulateNavigationBarButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  cameraButtons: {
    flex: 1,
  },
  cameraButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    height: 60,
  }
});

export { styles, colors };