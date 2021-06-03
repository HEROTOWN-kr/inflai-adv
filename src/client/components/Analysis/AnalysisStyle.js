import { makeStyles } from '@material-ui/core/styles';

const analysisStyles = makeStyles({
  colorViolet: {
    color: '#6E0FFF'
  },
  colorGrey: {
    color: '#00000080'
  },
  hoverRed: {
    '&:hover': {
      cursor: 'pointer',
      color: 'red'
    }
  }
});

export default analysisStyles;
