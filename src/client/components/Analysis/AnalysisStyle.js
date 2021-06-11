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
});

export default analysisStyles;
