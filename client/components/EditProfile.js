import React from "react";
import { connect } from "react-redux";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { updateUserDetails } from "../store/userDetails";

import {
  Button,
  TextField,
  Container,
  makeStyles,
  Grid,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  formContainer: {
    margin: "1rem auto",
  },
  form: {
    width: "100%",
  },
  button: {
    backgroundColor: "#52b788",
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
            {/* <Grid>
              <label>Headshot file:</label>
              <input
                as={TextField}
                accept="image/*"
                id="raised-img-button"
                name="headshot"
                type="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  setFieldValue("headshot", event.currentTarget.files[0]);
                }}
              />
              <label htmlFor="raised-img-button">
                <Button
                  variant="contained"
                  component="span"
                  className={classes.button}
                >
                  Choose File
                </Button>
              </label>
            </Grid> */}
            {/* <Grid>
              <label>Resume file:</label>
              <input
                as={TextField}
                id="raised-pdf-button"
                name="resume"
                type="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  setFieldValue("resume", event.currentTarget.files[0]);
                }}
              />
              <label htmlFor="raised-pdf-button">
                <Button
                  variant="contained"
                  component="span"
                  className={classes.button}
                >
                  Choose File
                </Button>
              </label>
            </Grid> */}
            {/*<Grid>
               <Grid item container spacing={2}>
                 <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    disableElevation
                    disabled={isSubmitting}
                  >
                    Update
                  </Button>
                </Grid> 
              </Grid>
            </Grid>*/}
          </Grid>
        </Form>
      </Box>
    </Container>
  );
};

const EditProfileApp = withFormik({
  mapPropsToValues({ fullName, headshot, resume }) {
    return {
      displayName: fullName || "",
      // additional pre-population possible depending on how the details in store/state end up working...
    };
  },
  validationSchema: Yup.object().shape({
    fullName: Yup.string().required(
      "Your profile should at least display a name."
    ),
  }),
  handleSubmit(values, { props, setSubmitting }) {
    const {
      displayName,
      location,
      contactTel,
      role,
    } = values;
    console.log("profile save hit!");
    setSubmitting(true);
    // if (headshot) {
    //   props.dispatch(setProfileImage(userId));
    // }
    // if (resume) {
    //   props.dispatch(setProfilePdf(userId));
    // }
    props.dispatch(
      updateUserDetails(
        displayName,
        location,
        contactTel,
        role,
      )
    );
    setSubmitting(false);
  },
  enableReinitialize: true,
})(EditProfile);

const mapStateToProps = (state) => {
  return {
    fullName: `${state.auth.first} ${state.auth.last}`,
    userId: state.auth.id,
    resume: state.fileDetail.resume,
    headshot: state.fileDetail.headshot,
  };
};

export default connect(mapStateToProps)(EditProfileApp);
