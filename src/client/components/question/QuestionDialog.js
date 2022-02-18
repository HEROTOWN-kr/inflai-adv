import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, Grid, IconButton, makeStyles
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Colors } from '../../lib/Сonstants';
import ReactFormText from '../../containers/ReactFormText';
import StyledText from '../../containers/StyledText';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px'
  },
  button: {
    padding: 0,
    minWidth: 0
  },
  header: {
    padding: '15px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '18px',
    textAlign: 'center',
    position: 'relative',
    borderBottom: `1px solid ${Colors.grey8}`,
  }
});

const defaultQuestionData = {
  QUE_TITLE: '',
  QUE_CONTENT: '',
};

const defaultValues = {
  answer: ''
};

const schema = Yup.object().shape({
  answer: Yup.string().required('문의 답변을 입력해주세요').max(300, '300 글자까지 입력 가능합니다'),
});

function QuestionDialog(props) {
  const {
    open, closeDialog, questionId, getQuestions
  } = props;
  const [questionData, setQuestionData] = useState(defaultQuestionData);

  const classes = useStyles();

  const {
    register, handleSubmit, errors, reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });


  function onDialogClose() {
    setQuestionData(defaultQuestionData);
    reset(defaultValues);
    getQuestions();
    closeDialog();
  }

  function getQuestion() {
    axios.get('/api/TB_QUESTION/detail', {
      params: { questionId }
    }).then((res) => {
      const { data } = res.data;
      setQuestionData(data);
      if (data.QUE_ANSWER) reset({ answer: data.QUE_ANSWER });
    }).catch((err) => {
      alert(err.response.message);
    });
  }

  function onSubmit(values) {
    axios.post('/api/TB_QUESTION/saveAnswer', {
      ...values, questionId
    }).then((res) => {
      onDialogClose();
    }).catch((err) => {
      alert(err.response.message);
    });
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
            // fullScreen={fullScreen}
      open={open}
      onClose={onDialogClose}
      maxWidth="xs"
      TransitionProps={{
        onEntered: getQuestion,
        unmountOnExit: true
      }}
      aria-labelledby="responsive-dialog-title"
    >
      <Box className={classes.header}>
                문의
        <IconButton size="medium" classes={{ root: classes.root }} onClick={onDialogClose}>
          <Clear />
        </IconButton>
      </Box>
      <Box p={2} boxSizing="border-box">
        <Box>
          <Box mb={1}><StyledText color="#3f51b5">제목</StyledText></Box>
          <Box>
            {questionData.QUE_TITLE}
          </Box>
          <hr />
          <Box my={1}><StyledText color="#3f51b5">내용</StyledText></Box>
          <Box>
            {questionData.QUE_CONTENT}
          </Box>
          <hr />
          <Box my={1}><StyledText color="#3f51b5">문의 답변</StyledText></Box>
          <ReactFormText
            register={register}
            errors={errors}
            multiline
            rows={5}
            name="answer"
            placeholder="Ex) 제품 발송은 다음주 월요일로 정해졌습니다"
          />
          <hr />
        </Box>

        <Box mt="30px">
          <Grid container justify="center">
            <Grid item>
              <Box width="110px">
                <Button
                  fullWidth
                  color="secondary"
                  variant="contained"
                  onClick={onDialogClose}
                >
                  닫기
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <Box width="110px">
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                >
                  저장
                </Button>
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Dialog>
  );
}

export default QuestionDialog;
