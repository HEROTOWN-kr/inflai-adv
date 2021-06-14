import { colors, createMuiTheme } from '@material-ui/core';

const styleTheme = createMuiTheme({
  palette: {
    orange: {
      main: colors.orange[500]
    }
  },
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
      fontSize: 16,
      color: '#000'
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
  overrides: {
    MuiLinearProgress: {
      root: {
        height: 10,
        borderRadius: 5,
      },
      bar: {
        borderRadius: 5,
      },
      colorPrimary: {
        backgroundColor: colors.grey[200],
      },
    }
  }

});

export default styleTheme;
