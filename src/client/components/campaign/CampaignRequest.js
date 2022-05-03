import React, { useContext } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Grid, TextField, Divider, FormControlLabel, Checkbox, TextareaAutosize, Button, Box, FormControl, MenuItem, FormHelperText
} from '@material-ui/core';
import {
  Form,
  Formik,
  useField,
  FieldArray
} from 'formik';
import { Controller } from 'react-hook-form';
import { Category } from '@material-ui/icons';
import AuthContext from '../../context/AuthContext';
import StyledText from '../../containers/StyledText';
import StyledSelect from '../../containers/StyledSelect';
import { AdvertiseTypes } from '../../lib/Сonstants';
import StyledSvg from '../../containers/StyledSvg';

const category = {
  aim: [
    {
      value: '1',
      text: '블로그 체험단'
    },
    {
      value: '2',
      text: '인스타그램 체험단'
    },
    {
      value: '3',
      text: '유튜브 체험단'
    },
    {
      value: '4',
      text: '카페 바이럴'
    },
    {
      value: '5',
      text: '혼합형'
    },
  ],
  consult: [
    {
      value: '1',
      text: '제품사진촬영'
    },
    {
      value: '2',
      text: '홍보영상제작'
    },
    {
      value: '3',
      text: '상세페이지제작'
    },
    {
      value: '4',
      text: '메뉴판/배너/포스터'
    },
    {
      value: '5',
      text: '홈페이지제작'
    }
  ],
  visit: [
    {
      value: '1',
      text: '인스타그램 광고'
    },
    {
      value: '2',
      text: 'dm메세지'
    },
    {
      value: '3',
      text: '지인추천'
    },
    {
      value: '4',
      text: '검색'
    },
  ],
};

function MyTextField(props) {
  const { label, name } = props;
  const [field, meta, helpers] = useField(name);

  return (
    <React.Fragment>
      <div className="label-holder">
        <label htmlFor={label}>{label}</label>
      </div>
      <TextField
        error={meta.touched && meta.error}
        name={field.name}
        id={label}
        placeholder=""
        value={meta.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        fullWidth
        variant="outlined"
        helperText={meta.touched && meta.error ? (
          <span className="error-message">{meta.error}</span>
        ) : null}
      />
    </React.Fragment>
  );
}

function MySelect(props) {
  const [field, meta, helpers] = useField(props);
  const { label, name } = props;

  return (
    <React.Fragment>
      <div className="label-holder">
        <label htmlFor={label}>{label}</label>
      </div>
      <FormControl fullWidth variant="outlined" className="select-field">

        <StyledSelect
          value={meta.value}
          onChange={(event => helpers.setValue(event.target.value))}
        >
          {category[name].map(item => (
            <MenuItem key={item.text} value={item.value}>{item.text}</MenuItem>
          ))}
        </StyledSelect>
        {meta.touched && meta.error ? (
          <span className="error-message">{meta.error}</span>
        ) : null}
        {/* <FormHelperText>
          {meta.touched && meta.error ? (
            <div className="error-message">{meta.error}</div>
          ) : null}
        </FormHelperText> */}
      </FormControl>
    </React.Fragment>
  );
}

function CampaignRequest(props) {
  const { history } = props;
  // const { token } = useContext(AuthContext);

  const mySchema = Yup.object().shape({
    companyName: Yup.string()
      .required('업체명을 입력해주세요'),
    name: Yup.string()
      .required('담당자명 입력해주세요'),
    email: Yup.string()
      .required('이메일을 입력해주세요'),
    phone: Yup.string()
      .required('연락처를 입력해주세요'),
    /* productName: Yup.string()
      .required('브랜드명(제품명)을 입력해주세요'), */
    industry: Yup.string()
      .required('업종을 입력해주세요'),
    visit: Yup.string()
      .required('방문경로를 선택하세요'),
    campaignAim: Yup.array()
      .of(Yup.string().required('캠페인 목적을 선택하세요'))
      .min(1, '캠페인 목적을 선택하세요'),
    anotherAim: Yup.string()
      .when(['campaignAim'], {
        is: campaignAim => campaignAim.includes('기타 (직접입력)'),
        then: Yup.string().required('캠페인 목적을 입력하세요.'),
      }),
    capital: Yup.string()
      .required('집행 가능 예산을 입력해주세요.'),
  });


  function saveProduct(values) {
    const apiObj = { ...values };

    axios.post('/api/TB_REQ_AD/', apiObj).then((res) => {
      if (res.data.code === 200) {
        history.push('/');
      } else if (res.data.code === 401) {
        console.log(res);
      } else {
        console.log(res);
      }
    }).catch(error => (error));
  }

  return (
    <div className="agency">
      <Formik
        initialValues={{
          companyName: '',
          name: '',
          email: '',
          phone: '',
          productName: '',
          campaignAim: [],
          anotherAim: '',
          capital: '',
          consult: [],
          description: '',
          industry: '',
          visit: ''
        }}
        enableReinitialize
        validationSchema={mySchema}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
          submitForm
        }) => (
          <Grid container spacing={6} justify="center">
            <Grid item xs={12}>
              <div className="main-title">인플라이 전문가의 대행 서비스</div>
              <div className="sub-title">인플라이 전문가들이 가장 완벽한 인플루언서 마케팅을 도와드립니다.</div>
            </Grid>
            <Grid item xs={12}>
              <Box bgcolor="#fff" px={{ xs: 3, md: 6 }} py={{ md: 8 }} className="form">
                <Form>
                  <Grid container spacing={5}>
                    <Grid item md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <MyTextField name="companyName" label="업체명" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <MyTextField name="name" label="담당자명" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <MyTextField name="email" label="이메일" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <MyTextField name="phone" label="연락처" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    {/* <Grid item xs={12}>
                      <MyTextField name="productName" label="브랜드명(제품명)" />
                    </Grid> */}
                    <Grid item md={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <MyTextField name="industry" label="업종" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <MySelect name="visit" type="select" label="방문경로" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <div className="label-holder">
                        <label htmlFor="campaignAim">
                          캠페인 목적 (다중선택 가능)
                        </label>
                      </div>
                      <FieldArray
                        name="campaignAim"
                        render={arrayHelpers => (
                          <Grid container>
                            {category.aim.map(item => (
                              <Grid item xs={12} key={item.value}>
                                <FormControlLabel
                                  control={(
                                    <Checkbox
                                      checked={values.campaignAim.includes(item.value)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          arrayHelpers.push(item.value);
                                        } else {
                                          const idx = values.campaignAim.indexOf(item.value);
                                          arrayHelpers.remove(idx);
                                        }
                                      }}
                                      color="primary"
                                    />
)}
                                  label={item.text}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        )}
                      />
                    </Grid>
                    {errors.campaignAim && touched.campaignAim ? (
                      <div className="error-message">{errors.campaignAim}</div>
                    ) : null}
                    {/* {values.campaignAim.includes('5') ? (
                      <Grid item md={12}>
                        <MyTextField name="anotherAim" label="직접입력" />
                      </Grid>
                    ) : null} */}
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <div className="label-holder">
                        <label htmlFor="consult">추가로 원하는 상담분야 (선택)</label>
                      </div>
                      <FieldArray
                        name="consult"
                        render={arrayHelpers => (
                          <Grid container>
                            {category.consult.map(item => (
                              <Grid item xs={12} key={item.value}>
                                <FormControlLabel
                                  control={(
                                    <Checkbox
                                      checked={values.consult.includes(item.value)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          arrayHelpers.push(item.value);
                                        } else {
                                          const idx = values.consult.indexOf(item.value);
                                          arrayHelpers.remove(idx);
                                        }
                                      }}
                                      color="primary"
                                    />
                                          )}
                                  label={item.text}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12} sm={6} md={4}>
                          <div className="label-holder">
                            <label htmlFor="capital">집행 가능 예산</label>
                          </div>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={9}>
                              <TextField
                                fullWidth
                                error={errors.capital && touched.capital}
                                name="capital"
                                id="capital"
                                placeholder=""
                                value={values.capital}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="capital-field"
                                variant="outlined"
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <span className="currency">만원</span>
                            </Grid>
                            <Grid item xs={12}>
                              {errors.capital && touched.capital ? (
                                <div className="error-message">{errors.capital}</div>
                              ) : null}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <div className="label-holder">
                        <label htmlFor="description">기타사항 (선택)</label>
                      </div>
                      <TextareaAutosize
                        name="description"
                        id="description"
                        rowsMax={4}
                        value={values.about}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="4줄 이하로 간단하게 입력하세요"
                      />
                    </Grid>
                  </Grid>
                </Form>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className="submit-button"
                onClick={submitForm}
              >
                    대행 서비스 요청
              </Button>
            </Grid>
          </Grid>
        )}
      </Formik>
    </div>
  );
}

export default CampaignRequest;
