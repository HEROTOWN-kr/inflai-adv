import React, {
  useContext, useEffect, useRef, useState
} from 'react';
import axios from 'axios';
import {
  Box, Grid, Paper, FormControlLabel, Checkbox, RadioGroup, Radio, TextareaAutosize
} from '@material-ui/core';
import { useForm, Controller, get } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import StyledText from '../../../containers/StyledText';
import ReactFormDatePicker from '../../../containers/ReactFormDatePicker';
import ReactFormText from '../../../containers/ReactFormText';
import StyledSelect from '../../../containers/StyledSelect';
import { AdvertiseTypes, Colors } from '../../../lib/Сonstants';
import DaumPostCode from '../../../containers/DaumPostCode';
import ImageHolder from './ImageHolder';
import CKEditorComponent from '../../../containers/CKEditorComponent';
import StyledButton from '../../../containers/StyledButton';
import AuthContext from '../../../context/AuthContext';

const snsTypes = [
  { value: '1', text: '인스타', dbValue: 'AD_INSTA' },
  { value: '2', text: '유튜브', dbValue: 'AD_YOUTUBE' },
  { value: '3', text: '블로그', dbValue: 'AD_NAVER' },
];

const deliveryTypes = [
  { value: '0', text: '매장 방문' },
  { value: '1', text: '배송상품' },
];

function compareDates(date1, date2) {
  const day1 = date1.getDate();
  const day2 = date2.getDate();
  const month1 = date1.getMonth();
  const month2 = date2.getMonth();
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();

  if (year1 > year2) {
    return true;
  } if (year1 === year2 && month1 > month2) {
    return true;
  } if (year1 === year2 && month1 === month2 && day1 >= day2) {
    return true;
  }
  return false;
}

function CampaignCreateNew() {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const [campaignEditor, setCampaignEditor] = useState({});
  const [images, setImages] = useState([]);
  const [dbImages, setDbImages] = useState([]);
  const [limits, setLimits] = useState({ InfCountUsed: 0, InfCountLeft: 0, PlnInfMonth: 0 });

  const deliveryRef = useRef();
  const snsRef = useRef();

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowMax = new Date(tomorrow);
  tomorrowMax.setDate(tomorrow.getDate() + 6);

  const [pickerDates, setPickerDates] = useState({ min: tomorrow, max: tomorrowMax });

  const defaultValues = {
    sns: '',
    delivery: '',
    type: 0,
    subtype: 0,
    searchStart: today,
    searchFinish: tomorrow,
    phone: '',
    email: ''
  };

  Yup.addMethod(Yup.string, 'integerString', function () {
    return this.matches(/^\d+$/, '숫자 입력만 가능합니다');
  });

  const schema = Yup.object().shape({
    campaignName: Yup.string().required('캠페인명을 입력해주세요'),
    shortDisc: Yup.string().required('짧은설명을 입력해주세요'),
    sns: Yup.string().required('모집SNS를 선택해주세요'),
    influencerCount: Yup.string()
      .required('모집인원을 입력해주세요')
      .integerString()
      .test('checkTen', '10명까지 모집이 가능합니다!', val => parseInt(val, 10) <= 10)
      .test('checkLimits', '사용가능 인플루언서를 조과하였습니다!', val => parseInt(val, 10) <= parseInt(limits.InfCountLeft, 10)),

    delivery: Yup.string().required('제공상품 배송여부를 선택해주세요'),
    postcode: Yup.string().when('type', {
      is: type => parseInt(type, 10) === 0,
      then: Yup.string().required('우편번호를 입력해주세요'),
    }),
    detailAddress: Yup.string().when('type', {
      is: type => parseInt(type, 10) === 0,
      then: Yup.string().required('상세주소를 입력해주세요'),
    }),
    phone: Yup.string().required('연락처를 입력해주세요').integerString(),
    email: Yup.string().required('이메일을 입력해주세요').email('잘못된 이메일 형식입니다'),
    searchKeyword: Yup.string().required('검색키워드를 입력해주세요'),
    discription: Yup.string()
      .required('참여 안내 사항을 입력해주세요'),
    picArray: Yup.string()
      .test('picCheck', '이미지 업러드 해주세요', val => images.length > 0 || dbImages.length > 0)
      .test('picLength', '이미지 5개만 업러드 가능합니다', val => (images.length + dbImages.length) < 6),
  });

  const {
    register, handleSubmit, handleBlur, watch, errors, setValue, control, getValues, reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  const watchObj = watch(['type', 'delivery', 'searchStart', 'shortDisc', 'influencerCount']);

  useEffect(() => {
    if (watchObj.delivery === '1') {
      setValue('type', 1);
    } else {
      setValue('type', 0);
    }
  }, [watchObj.delivery]);

  useEffect(() => {
    const minDate = new Date(watchObj.searchStart);
    minDate.setDate(minDate.getDate() + 1);
    const maxDate = new Date(minDate);
    maxDate.setDate(maxDate.getDate() + 6);
    setValue('searchFinish', minDate);
    setPickerDates({ min: minDate, max: maxDate });
  }, [watchObj.searchStart]);

  function getInfluencersCount() {
    axios.get('/api/TB_SUBSCRIPTION/getInfluencers', {
      params: {
        token,
      }
    }).then((res) => {
      const { InfCountUsed, InfCountLeft, PlnInfMonth } = res.data.data;
      setLimits({ InfCountUsed, InfCountLeft, PlnInfMonth });
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  const onSubmit = async (data) => {
    axios.post('/api/TB_AD/createBiz', { ...data, token }).then((res) => {
      if (images.length > 0) {
        const id = res.data.data.AD_ID;
        const uploaders = images.map((item) => {
          const formData = new FormData();
          formData.append('file', item.file);
          formData.append('id', id);
          formData.append('isMain', item.isMain);
          return axios.post('/api/TB_PHOTO_AD/uploadImage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          }).then(response => ('sucess')).catch(error => ('error'));
        });
        axios.all(uploaders).then(() => {
          alert('캠페인이 등록되었습니다!!');
          history.push('/Profile/CampaignInfo');
        });
      } else {
        alert('캠페인이 등록되었습니다!!');
        history.push('/Profile/CampaignInfo');
      }
    }).catch((error) => {
      alert(error.response.data);
    });
  };

  function checkSubscription() {
    axios.get('/api/TB_SUBSCRIPTION/check', {
      params: { token }
    }).then((res) => {
      if (res.status === 201) {
        alert('진행중 서브스크립션이 없습니다!');
        history.push('/Membership');
      } else if (res.status === 200) {
        getInfluencersCount();
      }
    }).catch(err => alert(err));
  }

  useEffect(() => {
    if (token) {
      checkSubscription();
    }
  }, [token]);

  return (
    <Box my={{ xs: 0, sm: 4 }} p={{ xs: 2, sm: 4 }} maxWidth={1200} css={{ margin: '0 auto' }} component={Paper}>
      <Box component={isSM ? 'h1' : 'h3'} css={{ textAlign: 'center' }}>캠페인 정보</Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box mb={1}><StyledText color="#3f51b5">모집명</StyledText></Box>
          <ReactFormText
            register={register}
            errors={errors}
            name="campaignName"
            placeholder="예시) 초경량 휴대용 선풍기, 인스타그래머 모집"
          />
        </Grid>
        <Grid item xs={12}>
          <Box mb={1}><StyledText color="#3f51b5">짧은설명</StyledText></Box>
          <ReactFormText
            register={register}
            errors={errors}
            multiline
            rows={5}
            name="shortDisc"
            placeholder="예시) 3단계 풍속조절이 되는 휴대용 선풍기에요. 설명이 정확하고 매력적일수록 더 많은 인플루언서의 신청을 받을 수 있습니다"
          />
        </Grid>
        <Grid item xs={12}>
          <Box mb={1}>
            <StyledText color="#3f51b5">
              모집SNS
              <span style={{ color: Colors.orange }}>
                {' 1개 캠페인=10명까지 모집이 가능합니다. 추가 모집은 캠페인을 추가생성 해주세요!'}
              </span>
            </StyledText>
          </Box>
          <Controller
            as={(
              <RadioGroup row aria-label="gender">
                {snsTypes.map((item, index) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio inputRef={index === 0 ? snsRef : null} />}
                    label={item.text}
                  />
                ))}
              </RadioGroup>
              )}
            onFocus={() => snsRef.current.focus()}
            name="sns"
            control={control}
          />
          {
            errors.sns ? (
              <div className="error-message">{errors.sns.message}</div>
            ) : null
          }
        </Grid>
        <Grid item xs={12}>
          <Box mb={1}>
            <StyledText color="#3f51b5">
              모집인원
              <span style={{ color: Colors.orange }}>
                {` (남은 인플루언서 수 ${limits.InfCountLeft}명/${limits.PlnInfMonth}명)`}
              </span>
            </StyledText>
          </Box>
          <ReactFormText register={register} errors={errors} name="influencerCount" />
        </Grid>
        <Grid item xs={12}>
          <Box mb={1}>
            <StyledText color="#3f51b5">
              리뷰어 모집기간 (최대 모집기간은 1주일입니다)
            </StyledText>
          </Box>
          <Grid container spacing={isSM ? 3 : 1} alignItems="center">
            <Grid item xs sm="auto">
              <Box width={isSM ? '250px' : '100%'}>
                <ReactFormDatePicker
                  name="searchStart"
                  control={control}
                  disablePast
                />
              </Box>
            </Grid>
            <Grid item xs={1} sm="auto"><Box textAlign="center">~</Box></Grid>
            <Grid item xs sm="auto">
              <Box width={isSM ? '250px' : '100%'}>
                <ReactFormDatePicker
                  name="searchFinish"
                  control={control}
                  minDate={pickerDates.min}
                  maxDate={pickerDates.max}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box mb={1}><StyledText color="#3f51b5">제공상품 배송여부</StyledText></Box>
          <Controller
            as={(
              <RadioGroup row aria-label="gender">
                {deliveryTypes.map((item, index) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio inputRef={index === 0 ? deliveryRef : null} />}
                    label={item.text}
                  />
                ))}
              </RadioGroup>
              )}
            name="delivery"
            onFocus={() => deliveryRef.current.focus()}
            control={control}
          />
          {errors.delivery ? (
            <div className="error-message">{errors.delivery.message}</div>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <Box mb={1}><StyledText color="#3f51b5">카테고리</StyledText></Box>
          <Grid container spacing={2}>
            <Grid item xs={6} sm="auto">
              <Box width={isSM ? '200px' : '100%'}>
                <Controller
                  render={controllerProps => (
                    <StyledSelect
                      native
                      {...controllerProps}
                      variant="outlined"
                      fullWidth
                    >
                      {AdvertiseTypes.mainType.map((item, index) => <option key={index} value={index}>{item}</option>)}
                    </StyledSelect>
                  )}
                  name="type"
                  control={control}
                />
              </Box>
            </Grid>
            {AdvertiseTypes.subType[watchObj.type] ? (
              <Grid item xs={6} sm="auto">
                <Box width={isSM ? '200px' : '100%'}>
                  <Controller
                    render={controllerProps => (
                      <StyledSelect
                        native
                        {...controllerProps}
                        variant="outlined"
                        fullWidth
                      >
                        {AdvertiseTypes.subType[watchObj.type].map((item, index) => <option key={index} value={index}>{item}</option>)}
                      </StyledSelect>
                    )}
                    name="subtype"
                    control={control}
                  />
                </Box>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
        {parseInt(watchObj.type, 10) === 0 ? (
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">주소</StyledText></Box>
            <DaumPostCode setValue={setValue} register={register} errors={errors} />
          </Grid>
        ) : null}
        <Grid item xs={12}>
          <Box mb={1}><StyledText color="#3f51b5">연락처</StyledText></Box>
          <ReactFormText register={register} errors={errors} name="phone" />
        </Grid>
        <Grid item xs={12}>
          <Box mb={1}><StyledText color="#3f51b5">이메일</StyledText></Box>
          <ReactFormText register={register} errors={errors} name="email" />
        </Grid>
        <Grid item xs={12}>
          <Box mb={1}><StyledText color="#3f51b5">필수키워드</StyledText></Box>
          <ReactFormText register={register} errors={errors} name="searchKeyword" />
        </Grid>
        <Grid item xs={12}>
          <Box mb={1}><StyledText color="#3f51b5">참여 안내 사항</StyledText></Box>
          <ReactFormText
            register={register}
            errors={errors}
            multiline
            rows={5}
            name="discription"
          />
        </Grid>
        <Grid item xs={12}>
          <Box mb={1}><StyledText color="#3f51b5">제공내역 (선택)</StyledText></Box>
          <ReactFormText
            register={register}
            errors={errors}
            multiline
            rows={5}
            name="provideInfo"
          />
        </Grid>
        <Grid item xs={12}>
          <Box mb={1}>
            <StyledText color="#3f51b5">이미지 업로드</StyledText>
            <input
              type="text"
              readOnly
              name="picArray"
              ref={register}
              style={{
                opacity: '0', width: '0', padding: '0', border: '0', height: '0'
              }}
            />
          </Box>
          <Box border="1px solid #0000003b" p={3}>
            <ImageHolder setValue={setValue} images={images} setImages={setImages} dbImages={dbImages} setDbImages={setDbImages} />
          </Box>
          {errors.picArray ? (
            <div className="error-message">{errors.picArray.message}</div>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <Box mb={1}><StyledText color="#3f51b5">상세정보</StyledText></Box>
          <CKEditorComponent control={control} name="detailInfo" setValue={setValue} campaignEditor={campaignEditor} setCampaignEditor={setCampaignEditor} />
        </Grid>

        <Grid item xs={12}>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={6} sm="auto">
              <Box width={isSM ? '200px' : '100%'}>
                <StyledButton onClick={() => history.push('/')}>취소</StyledButton>
              </Box>
            </Grid>
            <Grid item xs={6} sm="auto">
              <Box width={isSM ? '200px' : '100%'}>
                <StyledButton onClick={handleSubmit(onSubmit)}>저장하기</StyledButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CampaignCreateNew;
