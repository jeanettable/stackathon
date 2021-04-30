import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Container, makeStyles, Grid, Box } from '@material-ui/core';

import {
    Grid,
    Typography,
    Button,
    Box,
    makeStyles,
    Container,
    FormControlLabel,
    Checkbox,
    Card,
    CardMedia,
    CardContent,
    Link,
  } from "@material-ui/core";

  const useStyles = makeStyles(() => ({
    formContainer: {
      margin: '1rem auto',
    },
    form: {
      width: '100%',
    },
  }));

  const EditProfile = ({values, errors, isSubmitting}) => {
      const classes = useStyles();

      return(
          <Container maxWidth="lg" className={classes.formContainer}>
              <Box mt={1}>
                  <Form name={values.displayName} className={classes.form} >
                    <Grid container spacing={1} direction="column" alignItems="center" >
                        <Grid item xs={12} sm={6}>
                            <Field
                            as={TextField}
                            id="display-name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.displayName}
                            helperText={errors.displayName}
                            name="displayName"
                            placeholder="full name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field 
                            as={TextField}
                            id="location"
                            label="Location"
                            variant="outlined"
                            fullWidth
                            error={!!errors.location}
                            name="location"
                            placeholder="current location"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field 
                            as={TextField}
                            id="contactTel"
                            label="Telephone"
                            variant="outlined"
                            fullWidth
                            error={!!errors.contactTel}
                            name="contactTel"
                            placeholder="telephone"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field 
                            as={TextField}
                            id="role"
                            label="Role"
                            variant="outlined"
                            fullWidth
                            error={!!errors.role}
                            name="role"
                            placeholder="Dancer/Actor/Vocalist"
                            />
                        </Grid>
                        {/* //resume & headshot inserts here */}
                    </Grid>
                  </Form>
              </Box>
          </Container>
      )
  }

  const EditProfileApp = withFormik({
      mapPropsToValues() {
          return {
              displayName: fullName || '',
          }
      },
      validationSchema: Yup.object().shape({
          displayName: Yup.string().required('Your profile should display a name.'),
      }),
      handleSubmit(values, {props, setSubmitting }) {
          console.log('profile save hit!');
          setSubmitting(true);
          props.dispatch(updateUserDetails(...values));
          setSubmitting(false);
      },
      enableReinitialize: true,
  })(EditProfile);

  const mapStateToProps = (state) => {
      return {
        fullName: `${state.auth.first} ${state.auth.last}`,
        userId: state.auth.id,
      }
  };

export default connect(mapStateToProps)(EditProfileApp);
