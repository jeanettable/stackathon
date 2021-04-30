import React from 'react';
import { connect } from 'react-redux';
import { authenticateSignup } from '../store';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, MenuItem, Container, makeStyles, Grid, Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  formContainer: {
    margin: '1rem auto',
  },
  form: {
    width: '100%',
  },
}));

/** Reformatted with Formik: */
const SignUpForm = ({ values, errors, touched, handleChange, isSubmitting }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.formContainer}>
      <Box mt={3}>
        <Form name={values.displayName}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                error={touched.email && !!errors.email}
                helperText={errors.email}
                name="email"
                placeholder="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                error={touched.password && !!errors.password}
                helperText={errors.password}
                name="password"
                placeholder="password"
                type="password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                id="last"
                label="Last Name"
                variant="outlined"
                fullWidth
                error={touched.last && !!errors.last}
                helperText={errors.last}
                name="last"
                placeholder="last name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                id="first"
                label="First Name"
                variant="outlined"
                fullWidth
                error={touched.first && !!errors.first}
                helperText={errors.first}
                name="first"
                placeholder="first name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                select
                as={TextField}
                id="isProduction"
                label="User Type"
                variant="outlined"
                fullWidth
                error={touched.isProduction && !!errors.isProduction}
                helperText={errors.isProduction}
                name="isProduction"
                placeholder="production/job-seeker"
                value="false"
                >
                    <MenuItem value={true} >Production Team</MenuItem>
                    <MenuItem value={false} >Job-Seeker</MenuItem>
                </Field>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                fullWidth
                color="primary"
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Container>
  );
};

const SignUpFormApp = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
      last: '',
      first: '',
      isProduction: '',
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid.').required('Email is required.'),
    password: Yup.string()
      .min(7, 'Password minimum is 7 characters in length.')
      .required('Password is required.'),
    last: Yup.string().required('Last name is required for sign-up.'),
    first: Yup.string().required('First name is required for sign-up.'),
    isProduction: Yup.bool().required('Must select user type to sign up.')
  }),
  handleSubmit(values, { props, setSubmitting }) {
    console.log('signup submit hit!');
    setSubmitting(true);
    // props.dispatch(authenticateSignup(values.email, values.password, values.last, values.first, values.isProduction));
    props.dispatch(authenticateSignup( ...values ));
    setSubmitting(false);
  },
})(SignUpForm);

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

export default connect(mapSignup)(SignUpFormApp);