import React, { useContext, useState } from 'react';
import {
  Box, Dialog, Grid, IconButton, makeStyles
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../lib/Сonstants';
import ReactFormText from '../../containers/ReactFormText';
import StyledButton from '../../containers/StyledButton';
import AuthContext from '../../context/AuthContext';

const useStyles = makeStyles({
  root: {
    fontSize: '13px',
    cursor: 'pointer',
    '&:hover': {
      color: Colors.pink
    }
  },
  dialogRoot: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    maxWidth: '300px',
    width: '100%',
    borderRadius: '2px'
  },
  button: {
    padding: 0,
    minWidth: 0
  },
});

const defaultValues = { code: '' };

const schema = Yup.object().shape({
  code: Yup.string().required('쿠폰 코드를 입력해주세요')
});

function CouponDialog(props) {
  const { open, closeDialog } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const { token } = useContext(AuthContext);
  const history = useHistory();

  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  function onDilogClose() {
    setErrorMessage(null);
    closeDialog();
  }

  function subscribe(values) {
    setErrorMessage(null);
    axios.post('/api/TB_COUPON/useCoupon ', {
      token, code: values.code
    }).then((res) => {
      if (res.status === 201) {
        setErrorMessage(res.data.message);
        return;
      }
      setErrorMessage(null);
      history.push('/Profile/MembershipInfo');
      closeDialog();
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  const handleUserKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(subscribe)();
    }
  };

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={onDilogClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box p="15px" fontSize="16px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
                쿠폰
        <IconButton size="medium" classes={{ root: classes.dialogRoot }} onClick={onDilogClose}>
          <Clear />
        </IconButton>
      </Box>
      <Box px={2} py={2} boxSizing="border-box">
        <Box mb={1}>
          <ReactFormText
            register={register}
            errors={errors}
            name="code"
            placeholder="쿠폰 코드를 입력해주세요"
            onKeyPress={handleUserKeyPress}
          />
        </Box>
        {errorMessage ? (
          <Box my={1} textAlign="center">
            <div className="error-message">{errorMessage}</div>
          </Box>
        ) : null}
        <Box mt={1}>
          <StyledButton height={40} onClick={handleSubmit(subscribe)}>
                    완료
          </StyledButton>
        </Box>
      </Box>
    </Dialog>
  );
}

export default CouponDialog;
