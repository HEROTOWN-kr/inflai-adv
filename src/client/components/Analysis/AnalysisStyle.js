import { makeStyles } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

const analysisStyles = makeStyles({
  colorViolet: {
    color: '#6E0FFF'
  },
  colorGrey: {
    color: '#00000080'
  },
  bold: {
    fontWeight: '500',
  },
  bold600: {
    fontWeight: '600',
  },
  hoverRed: {
    '&:hover': {
      cursor: 'pointer',
      color: 'red'
    }
  },
  orange: {
    backgroundColor: colors.orange[500]
  },
  lemon: {
    backgroundColor: 'rgb(180, 240, 70)'
  },
  purple: {
    backgroundColor: '#6E0FFF'
  },
  lightGreen: {
    backgroundColor: '#18DBA8'
  },
  yellow: {
    backgroundColor: '#FFE600'
  },
  grey: {
    backgroundColor: '#00000017'
  }
});

export default analysisStyles;
