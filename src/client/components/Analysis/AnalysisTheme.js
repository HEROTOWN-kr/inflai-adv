import { createMuiTheme } from '@material-ui/core';

const styleTheme = createMuiTheme({
  typography: {
    fontFamily: 'Noto Sans KR, sans-serif',
    h1: 'h2',
    h2: 'h2',
    h3: 'h2',
    h4: 'h2',
    h5: 'h2',
    h6: 'h2',
    subtitle1: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    subtitle2: {
      fontSize: 16
    },
    body1: {
      fontSize: 14,
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
