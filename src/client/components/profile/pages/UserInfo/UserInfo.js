import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Divider, Grid, Hidden, FormControlLabel, Typography, Checkbox, makeStyles
} from '@material-ui/core';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import StyledText from '../../../../containers/StyledText';
import StyledTextField from '../../../../containers/StyledTextField';
import DaumPostCode from '../../../../containers/DaumPostCode';
import StyledImage from '../../../../containers/StyledImage';
import defaultAccountImage from '../../../../img/default_account_image.png';
import AuthContext from '../../../../context/AuthContext';
import StyledButton from '../../../../containers/StyledButton';
import { Colors } from '../../../../lib/Сonstants';
import WhiteBlock from '../../../../containers/WhiteBlock';
import PageTitle from '../../PageTitle';
import SocialLogin from './SocialLogin/SocialLogin';
import PasswordChange from './PasswordChange/PasswordChange';
import LabelComponent from './LabelComponent';
import ReactFormText from '../../../../containers/ReactFormText';

function ImageActionButton(props) {
  const {
    children, color, background, onClick
  } = props;

  const styles = {
    cursor: 'pointer',
    background: background || 'red',
    color: color || '#ffffff',
    borderRadius: '12px',
    fontSize: '14px',
    padding: '3px 16px'
  };

  return (
    <div style={styles} onClick={onClick}>
      {children}
    </div>
  );
}

Yup.addMethod(Yup.string, 'integerString', function () {
  return this.matches(/^\d+$/, '숫자 입력만 가능합니다');
});

const schema = Yup.object().shape({
  nickName: Yup.string().required('이름을 입력해주세요'),
  phone: Yup.string().required('연락처를 입력해주세요').integerString(),
  postcode: Yup.string().required('우편번호를 입력해주세요'),
  roadAddress: Yup.string().required('도로명주소를 입력해주세요'),
  detailAddress: Yup.string().required('상세주소를 입력해주세요'),
});

const defaultValues = {
  nickName: '',
  phone: '',
  registerNumber: '',
  companyName: '',
  postcode: '',
  roadAddress: '',
  detailAddress: '',
  extraAddress: '',
  message: false,
};

const useStyles = makeStyles({
  label: {
    fontSize: '13px'
  }
});

function UserInfo(props) {
  const { setMessage, isMD } = props;
  const [imageUrl, setImageUrl] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const { token, userDataUpdate } = useContext(AuthContext);
  const classes = useStyles();

  const {
    register, handleSubmit, reset, errors, setValue, control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  function getUserInfo() {
    axios.get('/api/TB_ADVERTISER/UserInfo', { params: { token } }).then((res) => {
      const { data } = res.data;
      const {
        ADV_EMAIL, ADV_TEL, ADV_REG_NUM, ADV_NAME,
        ADV_COM_NAME, ADV_CLASS, ADV_POST_CODE, ADV_ROAD_ADDR,
        ADV_DETAIL_ADDR, ADV_EXTR_ADDR, ADV_PHOTO, ADV_PHOTO_URL,
        ADV_MESSAGE, ADV_BLOG_TYPE
      } = data;
      reset({
        nickName: ADV_NAME,
        phone: ADV_TEL,
        registerNumber: ADV_REG_NUM,
        companyName: ADV_COM_NAME,
        postcode: ADV_POST_CODE,
        roadAddress: ADV_ROAD_ADDR,
        detailAddress: ADV_DETAIL_ADDR,
        extraAddress: ADV_EXTR_ADDR,
        message: ADV_MESSAGE === 1,
      });
      setUserInfo({
        ADV_PHOTO_URL, ADV_EMAIL
      });
      userDataUpdate(ADV_NAME, ADV_PHOTO_URL);
    });
  }

  useEffect(() => {
    register({ name: 'photo' }, {});
  }, [register]);

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  const updateProfile = async (data) => {
    try {
      const apiObj = { ...data, message: data.message ? 1 : 0, token };

      await axios.post('/api/TB_ADVERTISER/update', apiObj);

      if (data.photo) {
        const { photo } = data;
        const formData = new FormData();
        formData.append('file', photo);
        formData.append('token', token);
        return axios.post('/api/TB_ADVERTISER/uploadAWS', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(async (response) => {
          getUserInfo();
          setMessage({ type: 'success', open: true, text: '저장되었습니다' });
        }).catch((err) => {
          console.log(err.response);
          alert('photo upload error');
        });
      }
      getUserInfo();
      setMessage({ type: 'success', open: true, text: '저장되었습니다' });
    } catch (err) {
      alert(err.message);
    }
  };

  function addPicture(event) {
    setValue('photo', event.target.files[0]);

    const picture = event.target.files[0];
    const picUrl = URL.createObjectURL(picture);
    setImageUrl(picUrl);
  }

  async function deletePicture() {
    await axios.post('/api/TB_ADVERTISER/deleteAWS', { token }).catch(err => alert('pic delete error'));
    setImageUrl(null);
    setValue('photo', null);
    getUserInfo();
  }

  return (
    <WhiteBlock borderRadius={isMD ? '7px' : '0'}>
      <Hidden smDown>
        <PageTitle>
          <StyledText fontSize="24px">
            회원정보수정
          </StyledText>
        </PageTitle>
      </Hidden>
      <Box py={{ xs: 2, md: 4 }} px={{ xs: 2, md: 6 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <LabelComponent labelName="이메일" />
              </Grid>
              <Grid item xs={12} md>
                <Box width={isMD ? '250px' : '100%'}>
                  {userInfo.ADV_EMAIL || ''}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <LabelComponent labelName="이름" />
              </Grid>
              <Grid item xs={12} md>
                <Box width={isMD ? '250px' : '100%'}>
                  <ReactFormText
                    register={register}
                    errors={errors}
                    name="nickName"
                    placeholder="이름"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <LabelComponent labelName="전화번호" />
              </Grid>
              <Grid item xs={12} md="auto">
                <Box width={isMD ? '250px' : '100%'}>
                  <ReactFormText
                    register={register}
                    errors={errors}
                    name="phone"
                    placeholder="전화번호"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md>
                <StyledText fontSize="13px" color={Colors.grey2}>
                  * 전화번호부정확하면 멤버십신청 안됩니다
                </StyledText>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <LabelComponent labelName="사업자번호" />
              </Grid>
              <Grid item xs={12} md>
                <Box width={isMD ? '250px' : '100%'}>
                  <ReactFormText
                    register={register}
                    errors={errors}
                    name="registerNumber"
                    placeholder="사업자번호"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <LabelComponent labelName="회사명" />
              </Grid>
              <Grid item xs={12} md>
                <Box width={isMD ? '250px' : '100%'}>
                  <ReactFormText
                    register={register}
                    errors={errors}
                    name="companyName"
                    placeholder="회사명"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <LabelComponent labelName="주소" />
              </Grid>
              <Grid item xs={12} md>
                <Box maxWidth={isMD ? '500px' : 'none'}>
                  <DaumPostCode setValue={setValue} register={register} errors={errors} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box py={2}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <LabelComponent labelName="사진" />
                </Grid>
                <Grid item xs={12} md>
                  <Grid container alignItems="center" spacing={2} justify={isMD ? 'flex-start' : 'center'}>
                    <Grid item>
                      <StyledImage
                        width="110px"
                        height="110px"
                        borderRadius="100%"
                        src={imageUrl || userInfo.ADV_PHOTO_URL || defaultAccountImage}
                      />
                    </Grid>
                    <Grid item>
                      <label htmlFor="picAdd">
                        <ImageActionButton background="#00a1ff">
                          이미지 등록
                          <input
                            id="picAdd"
                            name="photo"
                            type="file"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={(event => addPicture(event))}
                          />
                        </ImageActionButton>
                      </label>
                      {userInfo.ADV_PHOTO_URL ? (
                        <Box pt={1}>
                          <ImageActionButton onClick={() => deletePicture(token)}>
                              이미지 삭제
                          </ImageActionButton>
                        </Box>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <LabelComponent labelName="카카오수신동의" />
              </Grid>
              <Grid item xs={12} md>
                <Controller
                  name="message"
                  control={control}
                  render={checkBoxProps => (
                    <FormControlLabel
                      control={(
                        <Checkbox
                          onChange={e => checkBoxProps.onChange(e.target.checked)}
                          checked={checkBoxProps.value}
                        />
                            )}
                      label={(
                        <Typography classes={{ body1: classes.label }}>
                                  카카오톡 통한 캠페인 모집 및 추천, 이벤트 정보 등의 수신에 동의합니다.
                        </Typography>
                            )}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box py={{ xs: 2, md: 4 }}>
              <Grid container justify="center">
                <Grid item>
                  <Box width="280px">
                    <StyledButton
                      onClick={handleSubmit(updateProfile)}
                      background={Colors.skyBlue}
                      hoverBackground="#1c4dbb"
                    >
                      저장
                    </StyledButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <SocialLogin />
        <Divider />
        <PasswordChange />
      </Box>

    </WhiteBlock>

  );
}

export default UserInfo;
