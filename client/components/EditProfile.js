import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { updateUserDetails } from "../store/userDetails";
import { setProfileImage, setProfilePdf } from '../store/fileDetail';

import {
  Button,
  TextField,
  Container,
  makeStyles,
  Grid,
  Box,
} from "@material-ui/core";

import {
  Grid,
  Button,
  Box,
  makeStyles,
  Container,

} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  formContainer: {
    margin: "1rem auto",
  },
  form: {
    width: "100%",
  },
}));

const EditProfile = ({ values, errors, isSubmitting, setFieldValue }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.formContainer}>
      <Box mt={1}>
        <Form name={values.displayName} className={classes.form}>
          <Grid container spacing={1} direction="column" alignItems="center">
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
                // error={!!errors.location}
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
                // error={!!errors.contactTel}
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
                // error={!!errors.role}
                name="role"
                placeholder="Dancer/Actor/Vocalist"
              />
            </Grid>
            {/* //resume & headshot inserts here */}
            <Grid>
              <input
                as={TextField}
                id="file"
                name="headshot"
                type="file"
                onChange={(event) => {
                  setFieldValue("headshot", event.currentTarget.files[0]);
                }}
              />
            </Grid>
            <Grid>
            <input
              as={TextField}
              id="file"
              name="resume"
              type="file"
              onChange={(event) => {
                setFieldValue("resume", event.currentTarget.files[0]);
              }}
            />
            </Grid>
            <Grid>
            {isOwner && (
                      <Grid item container spacing={2}>
                        <Grid item>
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                            disableElevation
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            >Update</Button>
                        </Grid>
                      </Grid>
                    )}
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Container>
  );
};

const EditProfileApp = withFormik({
  mapPropsToValues() {
    return {
      displayName: fullName || "",
    };
  },
  validationSchema: Yup.object().shape({
    displayName: Yup.string().required("Your profile should at least display a name."),
  }),
  handleSubmit(values, { props, setSubmitting }) {
    const { displayName, location, contactTel, role, headshot, resume } = values;
    console.log("profile save hit!");
    setSubmitting(true);
    if(headshot)    {
        props.dispatch(setProfileImage(userId));
    }
    if(resume) {
        props.dispatch(setProfilePdf(userId));
    }
    props.dispatch(updateUserDetails(displayName, location, contactTel, role, headshot, resume));
    setSubmitting(false);
  },
  enableReinitialize: true,
})(EditProfile);

const mapStateToProps = (state) => {
  return {
    fullName: `${state.auth.first} ${state.auth.last}`,
    userId: state.auth.id,
  };
};

export default connect(mapStateToProps)(EditProfileApp);
