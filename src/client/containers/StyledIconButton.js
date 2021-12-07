import {
  withStyles, IconButton
} from '@material-ui/core';

const StyledIconButton = withStyles({
  root: {
    padding: '10px'
  },
})(IconButton);

export default StyledIconButton;
