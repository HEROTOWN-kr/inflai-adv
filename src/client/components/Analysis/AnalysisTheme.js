import { createMuiTheme } from '@material-ui/core';

const styleTheme = createMuiTheme({
  typography: {
    fontFamily: 'Noto Sans KR, sans-serif',
    h6: {
      fontWeight: '600'
    },
    subtitle1: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    subtitle2: {
      fontSize: 16
    },
    body1: {
      fontSize: 14,
      color: '#000',
    },
    body2: {
      fontSize: 12,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});

export default styleTheme;
