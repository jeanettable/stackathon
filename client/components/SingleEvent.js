import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSingleEvent } from '../store/singleEvent';
import { deleteEvent } from '../store/events';
// import { createListEntry } from '../store/lists';
import { Link as RouterLink } from 'react-router-dom';

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
    height: 400,
    width: 400,
    margin: '0 auto',
  },
  cardContainer: {
    marginTop: '1rem',
    padding: 10,
  },
  // editButton: {
  //   backgroundColor: '#52b788',
  // },
  maxHeight: {
    height: '100%',
  },
  itemSpacing: {
    marginBottom: 10,
  },
}));

const SingleEvent = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getSingleEvent(props.match.params.id);
  }, []);

  const { singleEvent, userId, isProduction, deleteEvent } = props;
  console.log('singleEvent>>>', singleEvent);
  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <Card className={classes.cardContainer}>
            <Grid container>
              <Grid item xs={12} sm={6} container direction="column">
                <Typography component="h3" variant="h3" align="center">
                  {singleEvent.title}
                </Typography>
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
                      <Typography component="h5" variant="h5">
                        <strong>Contract Type:</strong> {singleEvent.callType}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        <strong>Audition Location:</strong> {singleEvent.eventLocation}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        <strong>Date: </strong> {singleEvent.eventDate}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        <strong>Time: </strong> {singleEvent.eventTime}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        <strong>Description:</strong> {singleEvent.description}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography component="h6" variant="h6">
                        <strong>Job Duration: </strong> {singleEvent.jobDuration}
                      </Typography>
                      </Grid>
                    {/* <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disableElevation
                        onClick={() => {
                          props.addUserToList(userId) 
                        }}
                      >
                        Add to List
                      </Button>
                    </Grid> */}
                    {isProduction && (
                      <Grid item container spacing={2}>
                        <Grid item>
                          <Button
                            to={`/production/events/${singleEvent.id}`}
                            component={RouterLink}
                            color="primary"
                            variant="contained"
                          >
                            Edit Event Details
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            onClick={() => deleteEvent(singleEvent.id)}
                            color="secondary"
                            variant="contained"
                          >
                            Delete Event
                          </Button>
                        </Grid>
                      </Grid>
                    )}
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
    singleEvent: state.singleEvent,
    userId: state.auth.id,
    isProduction: state.auth.isProduction,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getSingleEvent: (id) => dispatch(fetchSingleEvent(id)),
    // addUserToList: (userId, eventId, history) => dispatch(createListEntry(userId, eventId, history)),
    deleteEvent: (id) => dispatch(deleteEvent(id, history)),
  };
};

export default connect(mapState, mapDispatch)(SingleEvent);
