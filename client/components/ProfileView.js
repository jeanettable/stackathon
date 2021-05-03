import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserDetails } from '../store/userDetails';
import { Link as RouterLink } from 'react-router-dom';
// import { isLoggedIn } from '../../server/middleware';

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  makeStyles,
  Container,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  image: {
    height: 300,
    width: 300,
    margin: '0 auto',
  },
  cardContainer: {
    marginTop: '1rem',
    padding: 10,
  },
  editButton: {
    backgroundColor: '#52b788',
  },
  maxHeight: {
    height: '100%',
  },
  itemSpacing: {
    marginBottom: 10,
  },
}));

const ProfileView = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.fetchUserDetails(props.match.params.userId);
  }, []);

  const { userDetails, userId } = props;
  console.log('PV userDetails>>>', userDetails);

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <Card className={classes.cardContainer}>
            <Grid container>
              <Grid item xs={12} sm={6} container direction="column">
                <Typography component="h3" variant="h3" align="center">
                  {userDetails.displayName}
                </Typography>
                <Box mt={2}>
                  {/* <CardMedia component="img" className={classes.image} src={`/image-upload/${userDetails.headshot}`} /> */}
                  <CardMedia component="img" className={classes.image} src ="https://stackathon-bucket-1.s3-us-west-1.amazonaws.com/aa135953d7288669811cadc837220c81" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardContent className={classes.maxHeight}>
                  <Grid
                    container
                    direction="column"
                    justify="space-around"
                    className={classes.maxHeight}
                    spacing={2}
                    wrap="nowrap"
                  >
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        <strong>Location: </strong> {userDetails.location}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        <strong>T. :</strong> {userDetails.contactTel}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="h5" variant="h5">
                        <strong>Role(s): </strong> {userDetails.role}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        <strong>Link: </strong> 
                        <RouterLink to={userDetails.link} >footage/reel</RouterLink>
                      </Typography>
                    </Grid>
                      <Grid item container spacing={2}>
                        <Grid item>
                          <Button
                          className={classes.editButton}
                            to={`/users/${userId}/edit`}
                            component={RouterLink}
                            color="primary"
                            variant="contained"
                          >
                            Edit Profile
                          </Button>
                        </Grid>
                      </Grid>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapState = (state) => {
  return {
    userDetails: state.userDetails,
    userId: state.auth.id,
    isProduction: state.auth.isProduction,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchUserDetails: (userId) => dispatch(getUserDetails(userId)),
  };
};

export default connect(mapState, mapDispatch)(ProfileView);
