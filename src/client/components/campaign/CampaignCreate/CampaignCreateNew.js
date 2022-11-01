import React, {
  Fragment,
  useContext, useEffect, useRef, useState
} from 'react';
import axios from 'axios';
import {
  Box, Grid, Paper, FormControlLabel, RadioGroup, Radio,
  InputAdornment, makeStyles, Typography, IconButton
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ArrowRightAlt, Clear } from '@material-ui/icons';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import StyledText from '../../../containers/StyledText';
import ReactFormDatePicker from '../../../containers/ReactFormDatePicker';
import ReactFormText from '../../../containers/ReactFormText';
import StyledSelect from '../../../containers/StyledSelect';
import {
  AdvertiseTypes, Colors, snsTypes, campaignTypes, productSellTypes, editPriceTypes, videoLengthTypes, deliveryTypes, reportTypes
} from '../../../lib/Сonstants';
import DaumPostCode from '../../../containers/DaumPostCode';
import ImageHolder from './ImageHolder';
import CKEditorComponent from '../../../containers/CKEditorComponent';
import StyledButton from '../../../containers/StyledButton';
import AuthContext from '../../../context/AuthContext';
import StyledTextField from '../../../containers/StyledTextField';

const useStyles = makeStyles({
  endAdornment: {
    padding: '0'
  },
  linkText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  input: {
    padding: '15px 14px',
    textAlign: 'right',
    paddingRight: '2px'
  },
  textAlignRight: {
    textAlign: 'right',
    paddingRight: '2px'
  },
  positionEnd: {
    margin: '0'
  },
  clearRoot: {
    height: 'auto',
    marginLeft: '8px',
    opacity: '30%',
    cursor: 'pointer',
    '&:hover': {
      opacity: '1'
    }
  }
});

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
  const [images, setImages] = useState([]);
  const [dbImages, setDbImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [limits, setLimits] = useState({ InfCountUsed: 0, InfCountLeft: 0, PlnInfMonth: 0 });
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useContext(AuthContext);

  const deliveryRef = useRef();
  const snsRef = useRef();

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  // setDates

  const today = moment();
  const tomorrow = moment().add(7, 'days');
  const tomorrowMax = moment().add(13, 'days');

  const [pickerDates, setPickerDates] = useState({ min: tomorrow, max: tomorrowMax });

  const defaultValues = {
    sns: '',
    delivery: '',
    detailInfo: '',
    type: 0,
    subtype: 0,
    searchStart: today,
    searchFinish: tomorrow,
    selectStart: today,
    selectFinish: tomorrow,

    productSellStart: today,
    productSellFinish: tomorrow,
    productSellType: '',
    productSellPrice: '',
    productSellDiscount: '',
    productSellInfo: '',

    phone: '',
    email: '',
    provideInfo: '',
    provideMoney: '',
    editPrice: '',
    videoLength: '',
    editPriceEtc: '',
    videoLengthEtc: '',
    reportTypes,
    reportSns: '',
    campaignType: '1'
  };

  Yup.addMethod(Yup.string, 'integerString', function () {
    return this.matches(/^\d+$/, '숫자 입력만 가능합니다');
  });

  Yup.addMethod(Yup.string, 'onlyDigitsNotRequired', function () {
    return this.matches(/^\d+$/, '숫자 입력만 가능합니다');
  });

  Yup.addMethod(Yup.string, 'checkSpaces', function () {
    return this.test({
      name: 'checkSpaces',
      message: '띄어쓰기 입력 불가능합니다',
      test: value => value && value.indexOf(' ') === -1
    });
  });

  const schema = Yup.object().shape({
    campaignName: Yup.string().required('캠페인명을 입력해주세요'),
    shortDisc: Yup.string().required('짧은설명을 입력해주세요'),
    sns: Yup.string().required('모집SNS를 선택해주세요'),
    editPriceEtc: Yup.string().when('editPrice', {
      is: editPrice => editPrice === '4',
      then: Yup.string().required('편집비용을 입력해주세요').integerString(),
    }),
    videoLengthEtc: Yup.string().when('videoLength', {
      is: editPrice => editPrice === '5',
      then: Yup.string().required('원하시는 유튜브영상 길이를 입력해주세요').integerString(),
    }),
    influencerCount: Yup.string()
      .required('모집인원을 입력해주세요')
      .integerString()
      // .test('checkTen', '50명까지 모집이 가능합니다!', val => parseInt(val, 10) <= 50)
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
    phone: Yup.string().required('연락처를 입력해주세요').checkSpaces().integerString(),
    email: Yup.string().required('이메일을 입력해주세요').email('잘못된 이메일 형식입니다'),
    searchKeyword: Yup.string().required('검색키워드를 입력해주세요'),
    discription: Yup.string().required('포스팅가이드를 입력해주세요'),
    provideInfo: Yup.string().required('제공내역을 입력해주세요'),
    provideMoney: Yup.string().notRequired().test('provideMoney', '숫자 입력만 가능합니다', (value) => {
      if (value) {
        const moneySchema = Yup.string().integerString();
        return moneySchema.isValidSync(value);
      }
      return true;
    }),
    picArray: Yup.string()
      .test('picCheck', '이미지 업러드 해주세요', val => images.length > 0 || dbImages.length > 0)
      .test('picLength', '이미지 5개만 업러드 가능합니다', val => (images.length + dbImages.length) < 6),
    detailInfo: Yup.string()
      .test('detailInfoCheck', '내용은 최대 3,000자까지 입력 가능합니다.', val => val.length < 3000),
    reportSns: Yup.string().when('sns', {
      is: sns => sns === '4',
      then: Yup.string().required('기자단 모집 SNS를 선택해주세요')
    }),

    productSellType: Yup.string().when('campaignType', {
      is: campaignType => campaignType === '2',
      then: Yup.string().required('판매 방식을 선택해주세요')
    }),
    productSellPrice: Yup.string().when('campaignType', {
      is: campaignType => campaignType === '2',
      then: Yup.string().required('제품 가격을 입력해주세요')
    }),
    productSellDiscount: Yup.string().when('campaignType', {
      is: campaignType => campaignType === '2',
      then: Yup.string().required('판매 수익을 입력해주세요')
    }),
    productSellInfo: Yup.string().when('campaignType', {
      is: campaignType => campaignType === '2',
      then: Yup.string().required('판매 정보를 입력해주세요')
    }),
  });

  const {
    register, handleSubmit, handleBlur, watch, errors, setValue, control, getValues, reset, setError
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  const watchObj = watch([
    'type', 'delivery', 'searchStart', 'searchFinish',
    'shortDisc', 'influencerCount', 'sns', 'editPrice', 'videoLength',
    'reportTypes', 'campaignType'
  ]);

  useEffect(() => {
    if (watchObj.delivery === '1') {
      setValue('type', 1);
    } else {
      setValue('type', 0);
    }
  }, [watchObj.delivery]);

  useEffect(() => {
    const selectStart = moment(watchObj.searchFinish).add(1, 'days');
    const selectFinish = moment(selectStart).add(7, 'days');
    setValue('selectStart', selectStart);
    setValue('selectFinish', selectFinish);
  }, [watchObj.searchFinish]);

  function onSearchStartChange(date) {
    const minDate = new Date(date);
    minDate.setDate(minDate.getDate() + 1);
    const maxDate = new Date(minDate);
    maxDate.setDate(maxDate.getDate() + 13);
    const searchFinish = new Date(date);
    searchFinish.setDate(searchFinish.getDate() + 7);

    setValue('searchFinish', searchFinish);
    setPickerDates({ min: minDate, max: maxDate });
  }

  function getInfluencersCount() {
    axios.get('/api/TB_SUBSCRIPTION/getInfluencers', {
      params: { token }
    }).then((res) => {
      const { InfCountUsed, InfCountLeft, PlnInfMonth } = res.data.data;
      setLimits({ InfCountUsed, InfCountLeft, PlnInfMonth });
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  function addLink() {
    const newLink = getValues('linkItem');
    if (!newLink) return;

    if (links.length === 3) {
      setError('linkItem', {
        type: 'manual',
        message: '참초할 링크 최대 3개 까지 업로드 됩니다'
      });
      return;
    }

    if (newLink.indexOf('http://') === -1 && newLink.indexOf('https://') === -1) {
      setError('linkItem', {
        type: 'manual',
        message: '올바른 URL이 아닙니다. URL을 확인해주세요.'
      });
      return;
    }

    if (links.indexOf(newLink) > -1) {
      setError('linkItem', {
        type: 'manual',
        message: '동일한 URL입니다'
      });
      return;
    }

    setLinks([...links, newLink]);
    setValue('linkItem', '');
  }

  function deleteLink(linkName) {
    const newArray = links.filter(item => item !== linkName);
    setLinks(newArray);
  }

  const onSubmit = (data) => {
    setLoading(true);
    const props = { ...data, token };
    if (links.length > 0) props.links = JSON.stringify(links);

    if (data.sns === '4') {
      props.sns = data.reportSns;
      props.report = '1';
    }

    axios.post('/api/TB_AD/createBiz', props).then((res) => {
      if (images.length === 0) {
        setLoading(false);
        enqueueSnackbar('캠페인이 등록되었습니다!!', { variant: 'success' });
        history.push('/Profile/CampaignInfo');
        return;
      }
      const id = res.data.data.AD_ID;

      const promiseArray = images.map(item => new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', item.file);
        formData.append('id', id);
        formData.append('isMain', item.isMain);
        axios.post('/api/TB_PHOTO_AD/uploadImageAWS', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => resolve('sucess')).catch(error => resolve('error'));
      }));

      Promise.all(promiseArray).then((response) => {
        setLoading(false);
        enqueueSnackbar('캠페인이 등록되었습니다!!', { variant: 'success' });
        history.push('/Profile/CampaignInfo');
      }).catch(err => console.log(err.message));
    }).catch((error) => {
      setLoading(false);
      alert(error.response.data);
    });
  };

  function checkSubscription() {
    axios.get('/api/TB_SUBSCRIPTION/check', {
      params: { token }
    }).then((res) => {
      if (res.status === 201 || res.status === 202) {
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
    <Fragment>
      <Box mt={8} color="#000" fontSize="45px" fontWeight={700} textAlign="center">
        캠페인 정보
      </Box>
      {/* <Box component={isSM ? 'h1' : 'h3'} css={{ textAlign: 'center' }}>캠페인 정보</Box> */}
      <Box
        my={{ xs: 0, sm: 4 }}
        mx="auto"
        py={{ xs: 2, sm: 6 }}
        px={{ xs: 2, sm: 4 }}
        maxWidth={1024}
        bgcolor="#fff"
        border="1px solid #ddd"
        borderRadius="20px"
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">캠페인명 (제공물품(서비스) + 시가 등 한 줄로 적어주세요)</StyledText></Box>
            <ReactFormText
              register={register}
              errors={errors}
              name="campaignName"
              placeholder="Ex) 5만원 반려동물 구강케어 1박스 (30매)"
            />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">제공하는 제품(서비스) 짧은설명</StyledText></Box>
            <ReactFormText
              register={register}
              errors={errors}
              multiline
              rows={5}
              name="shortDisc"
              placeholder="서비스나 제공물품에 대해서 자세히 적어주세요"
            />
          </Grid>

          <Grid item xs={12}>
            <Box mb={1}>
              <StyledText color="#3f51b5">
                  캠페인 종류
              </StyledText>
            </Box>
            <Grid container>
              <Grid item>
                <Controller
                  as={(
                    <RadioGroup row aria-label="gender">
                      {campaignTypes.map((item, index) => (
                        <FormControlLabel
                          key={item.value}
                          value={item.value}
                          control={(
                            <Radio
                              inputRef={index === 0 ? snsRef : null}
                            />
                                    )}
                          label={item.text}
                        />
                      ))}
                    </RadioGroup>
                      )}
                  onFocus={() => snsRef.current.focus()}
                  name="campaignType"
                  control={control}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box mb={1}>
              <StyledText color="#3f51b5">
                  모집SNS
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

            { errors.sns ? (
              <div className="error-message">{errors.sns.message}</div>
            ) : null }

            { watchObj.sns === '2' ? (
              <Box color={Colors.orange}>
                    유튜버 경우 제공되는 제품(서비스)외에 편집비용이 최소 20만원부터 가능합니다.
                <br />
                    제공되는 물품(서비스)가 인기가 적거나 편집이 어려운 경우 비용을 올리시는게 빠르게 모집하기 편합니다
                <br />
                    수정은 1회 무료로 가능하기에 최대한 정확하게 적어주세요
                <br />
                    영상 업로드 후 비용을 제작자에게 직접 전달하는 방식입니다
                <br />
                    인플라이는 인공지능분석을 통해 보다 좋은 유튜버를 추천해 드리며 유튜브 영상제작과정에는 참여하지 않습니다
              </Box>
            ) : null }

            { watchObj.sns === '4' ? (
              <Grid item xs={12}>
                <Box mb={2} fontSize={14} color={Colors.orange}>
                      기자단은 물건등을 제공하거나 방문하지 않고 사장님이 주신 사진 및 자료(스토리보드) 만으로 만드는 인스타그램이나 블로그에 업로드 하는 것 입니다
                  <br />
                      인스타그램기자단 최소비용 : 5000원 부터
                  <br />
                      블로그기자단 최소비용 : 2만원 부터
                  <br />
                      각 비용은 인플루언서가 해당내용을 주신 자료대로 잘 포스팅하고 난 다음에 리뷰통해서 확인한 뒤에 직접 광고주님이 입금해주시면 됩니다
                  <br />
                      자료를 추가하여 수정요청은 안됩니다 (추가 비용을 요구함) 따라서 처음에 자료를 잘 작성해 주세요
                  <br />
                      자료대로 안 올라갔을 경우 수정은 1회 가능하며 직접 요청하시면 됩니다
                </Box>

                <Box mb={1}>
                  <StyledText color="#3f51b5">
                        기자단 모집 SNS
                  </StyledText>
                </Box>

                <Grid container>
                  <Grid item>
                    <Controller
                      as={(
                        <RadioGroup row aria-label="gender">
                          {reportTypes.map((item, index) => (
                            <FormControlLabel
                              key={item.value}
                              value={item.value}
                              control={(
                                <Radio
                                  inputRef={index === 0 ? snsRef : null}
                                />
                                          )}
                              label={item.label}
                            />
                          ))}
                        </RadioGroup>
                            )}
                      onFocus={() => snsRef.current.focus()}
                      name="reportSns"
                      control={control}
                    />
                  </Grid>
                </Grid>

                { errors.reportSns ? (
                  <div className="error-message">{errors.reportSns.message}</div>
                ) : null }
              </Grid>
            ) : null }

          </Grid>

          { watchObj.sns === '2' ? (
            <Fragment>
              <Grid item xs={12}>
                <Box mb={1}>
                  <StyledText color="#3f51b5">
                        편집비용
                  </StyledText>
                </Box>
                <Grid container>
                  <Grid item>
                    <Controller
                      as={(
                        <RadioGroup row aria-label="gender">
                          {editPriceTypes.map((item, index) => (
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
                      name="editPrice"
                      control={control}
                    />
                  </Grid>
                  <Grid item>
                    <StyledTextField
                      fullWidth
                      disabled={watchObj.editPrice !== '4'}
                      name="editPriceEtc"
                      inputRef={register}
                      error={!!errors.editPriceEtc}
                      FormHelperTextProps={{
                        classes: { contained: classes.FormHelperContained }
                      }}
                      helperText={errors.editPriceEtc ? (
                        <span className="error-message">{errors.editPriceEtc?.message}</span>
                      ) : null}
                      css={{ transition: 'all 1s ease-out' }}
                      InputProps={{
                        endAdornment: <InputAdornment disablePointerEvents position="end" classes={{ positionEnd: classes.positionEnd }}>만원</InputAdornment>,
                        classes: { input: classes.textAlignRight }
                      }}
                    />
                  </Grid>
                </Grid>
                { errors.editPrice ? (
                  <div className="error-message">{errors.editPrice.message}</div>
                ) : null }
              </Grid>
              <Grid item xs={12}>
                <Box mb={1}>
                  <StyledText color="#3f51b5">
                        원하시는 유튜브영상 길이
                  </StyledText>
                </Box>
                <Grid container>
                  <Grid item>
                    <Controller
                      as={(
                        <RadioGroup row aria-label="gender">
                          {videoLengthTypes.map((item, index) => (
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
                      name="videoLength"
                      control={control}
                    />
                  </Grid>
                  <Grid item>
                    <StyledTextField
                      fullWidth
                      disabled={watchObj.videoLength !== '5'}
                      name="videoLengthEtc"
                      inputRef={register}
                      error={!!errors.videoLengthEtc}
                      FormHelperTextProps={{
                        classes: { contained: classes.FormHelperContained }
                      }}
                      helperText={errors.videoLengthEtc ? (
                        <span className="error-message">{errors.videoLengthEtc?.message}</span>
                      ) : null}
                      css={{ transition: 'all 1s ease-out' }}
                      InputProps={{
                        endAdornment: <InputAdornment disablePointerEvents position="end" classes={{ positionEnd: classes.positionEnd }}>분</InputAdornment>,
                        classes: { input: classes.textAlignRight }
                      }}
                    />
                  </Grid>
                </Grid>
                { errors.videoLength ? (
                  <div className="error-message">{errors.videoLength.message}</div>
                ) : null }
              </Grid>
            </Fragment>
          ) : null }

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
                  리뷰어 모집기간 (최대 모집기간은 2주일입니다)
              </StyledText>
            </Box>
            <Grid container spacing={isSM ? 3 : 1} alignItems="center">
              <Grid item xs sm="auto">
                <Box width={isSM ? '250px' : '100%'}>
                  <ReactFormDatePicker
                    name="searchStart"
                    control={control}
                    onAccept={onSearchStartChange}
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
            <Box mb={1}>
              <StyledText color="#3f51b5">
                  인플루언서 업로드기간
              </StyledText>
            </Box>
            <Grid container spacing={isSM ? 3 : 1} alignItems="center">
              <Grid item xs sm="auto">
                <Box width={isSM ? '250px' : '100%'}>
                  <ReactFormDatePicker
                    name="selectStart"
                    disabled
                    control={control}
                  />
                </Box>
              </Grid>
              <Grid item xs={1} sm="auto"><Box textAlign="center">~</Box></Grid>
              <Grid item xs sm="auto">
                <Box width={isSM ? '250px' : '100%'}>
                  <ReactFormDatePicker
                    name="selectFinish"
                    disabled
                    control={control}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          { watchObj.campaignType === '2' ? (
            <Fragment>
              <Grid item xs={12}>
                <Box mb={1}>
                  <StyledText color="#3f51b5">
                        공동 구매기간
                  </StyledText>
                </Box>
                <Grid container spacing={isSM ? 3 : 1} alignItems="center">
                  <Grid item xs sm="auto">
                    <Box width={isSM ? '250px' : '100%'}>
                      <ReactFormDatePicker
                        name="productSellStart"
                        control={control}
                        onAccept={onSearchStartChange}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={1} sm="auto"><Box textAlign="center">~</Box></Grid>
                  <Grid item xs sm="auto">
                    <Box width={isSM ? '250px' : '100%'}>
                      <ReactFormDatePicker
                        name="productSellFinish"
                        control={control}
                        minDate={pickerDates.min}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Box mb={1}>
                  <StyledText color="#3f51b5">
                        판매 방식
                  </StyledText>
                </Box>
                <Grid container>
                  <Grid item>
                    <Controller
                      as={(
                        <RadioGroup row aria-label="gender">
                          {productSellTypes.map((item, index) => (
                            <FormControlLabel
                              key={item.value}
                              value={item.value}
                              control={(
                                <Radio
                                  inputRef={index === 0 ? snsRef : null}
                                />
                                          )}
                              label={item.text}
                            />
                          ))}
                        </RadioGroup>
                            )}
                      onFocus={() => snsRef.current.focus()}
                      name="productSellType"
                      control={control}
                    />
                  </Grid>
                </Grid>
                { errors.productSellType ? (
                  <div className="error-message">{errors.productSellType.message}</div>
                ) : null }
              </Grid>

              <Grid item xs={12}>
                <Box mb={1}><StyledText color="#3f51b5">제품 가격</StyledText></Box>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} md="auto">
                    <Box width={{ xs: '100%', md: '200px' }}>
                      <ReactFormText
                        register={register}
                        errors={errors}
                        name="productSellPrice"
                        placeholder=""
                        InputProps={{
                          endAdornment: <InputAdornment disablePointerEvents position="end" classes={{ positionEnd: classes.positionEnd }}>원</InputAdornment>,
                          classes: { input: classes.input }
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Box mb={1}><StyledText color="#3f51b5">판매 수익</StyledText></Box>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} md="auto">
                    <Box width={{ xs: '100%', md: '200px' }}>
                      <ReactFormText
                        register={register}
                        errors={errors}
                        name="productSellDiscount"
                        placeholder=""
                        InputProps={{
                          endAdornment: <InputAdornment disablePointerEvents position="end" classes={{ positionEnd: classes.positionEnd }}>원</InputAdornment>,
                          classes: { input: classes.input }
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Box mb={1}><StyledText color="#3f51b5">판매 정보</StyledText></Box>
                <ReactFormText
                  register={register}
                  errors={errors}
                  multiline
                  rows={5}
                  name="productSellInfo"
                  placeholder="공동 구매 판매 정보를 자세히 적어주세요"
                />
              </Grid>
            </Fragment>
          ) : null}

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

          {links.length > 0 ? (
            <Grid item xs={12}>
              <Grid container spacing={1}>
                { links.map(item => (
                  <Grid item key={item}>
                    <Box
                      p="2px 5px 2px 10px"
                      bgcolor="#0000000d"
                      borderRadius="5px"
                      maxWidth={300}
                    >
                      <Grid style={{ display: 'flex' }}>
                        <Typography classes={{ root: classes.linkText }}>{item}</Typography>
                        <Clear
                          fontSize="small"
                          classes={{ root: classes.clearRoot }}
                          onClick={() => deleteLink(item)}
                        />
                      </Grid>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">참조할 링크 (링크는 최대 3개까지 입력가능합니다. 주소 쓰시고 꼭 화살표 버튼 눌러주세요)</StyledText></Box>
            <Box maxWidth={400}>
              <ReactFormText
                register={register}
                errors={errors}
                name="linkItem"
                placeholder="예시) https://www.inflai.com"
                InputProps={{
                  classes: { adornedEnd: classes.endAdornment },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={addLink}>
                        <ArrowRightAlt fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    ev.preventDefault();
                    addLink();
                  }
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">포스팅가이드</StyledText></Box>
            <ReactFormText
              register={register}
              errors={errors}
              multiline
              rows={5}
              name="discription"
              placeholder={'예) 사진 5장 이상 + 동영상 20초 1개 이상\n'
                  + '반려동물이 구강케어 필름 먹는 사진과 영상 각 1장씩\n'
                  + '나머지는 제품사진 등 올려주세요\n'}
            />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">제공내역 (필수)</StyledText></Box>
            <ReactFormText
              register={register}
              errors={errors}
              multiline
              rows={5}
              name="provideInfo"
              placeholder="예시) 시가 12만원 상당 스틱형벌꿀 1박스"
            />
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}><StyledText color="#3f51b5">추가 제공금액 (선택)</StyledText></Box>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} md="auto">
                <Box width={{ xs: '100%', md: '200px' }}>
                  <ReactFormText
                    register={register}
                    errors={errors}
                    name="provideMoney"
                    placeholder=""
                    InputProps={{
                      endAdornment: <InputAdornment disablePointerEvents position="end" classes={{ positionEnd: classes.positionEnd }}>원</InputAdornment>,
                      classes: { input: classes.input }
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md>
                <Box fontSize="14px">
                    제공하는 물품(서비스)의 시가가 낮은 경우 인플루언서 모집이 원활하지 않을 수 있습니다.
                    이럴 때 추가적인 금액을 제공해 주시면 더 좋은 인플루언서가 신청할 가능성이 커집니다.
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box mb={1}>
              <StyledText color="#3f51b5">이미지 업로드 (5장 까지 업로드 가능합니다, 최소 한 장 이상필수)</StyledText>
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
            <CKEditorComponent control={control} name="detailInfo" errors={errors} />

            <Box
              mt="10px"
              fontSize="14px"
              color="#4c4747"
              bgcolor="#fdf7e2"
              border="1px solid #e6cf79"
              padding="10px 15px"
              borderRadius="8px"
            >
                입력 하시느라 고생하셨습니다. 모집기간 중에도 인플루언서 선정이 가능합니다.
                신청하신 인플루언서들 계정의 인공지능 분석 자료를 실시간 보실 수 있습니다.
                광고주님의 제품에 맞는 인플루언서들을 선정하시면 곧바로 인플루언서들에게 선정소식과 함께 광고주님의 전화번호가 전송이 됩니다.
                궁금하신 내용등은 직접 상담하시면 됩니다.
                인플루언서들이 리뷰를 올리면 선정된 인플루언서 탭에서 링크를 확인하실 수 있습니다.
                링크 내용이 마음에 드시면 별점 5개를 주어서 인플루언서를 평가해 주세요.
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mb={8}>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={6} sm="auto">
            <Box width={isSM ? '200px' : '100%'}>
              <StyledButton background={Colors.pink3} hoverBackground={Colors.pink} onClick={() => history.push('/')}>취소</StyledButton>
            </Box>
          </Grid>
          <Grid item xs={6} sm="auto">
            <Box width={isSM ? '200px' : '100%'}>
              <StyledButton onClick={handleSubmit(onSubmit)}>저장하기</StyledButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>

  );
}

export default CampaignCreateNew;
