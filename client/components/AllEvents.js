import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchEvents } from "../store/events";
import { Link as RouterLink } from "react-router-dom";
// import Pagination from './Pagination';

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
  header: {
    display: "flex",
    justifyContent: "space-between",
    margin: "2rem 0",
  },
  filterSection: {
    maxWidth: "80%",
    margin: "0 auto",
  },
  cardRoot: {
    display: "flex",
    padding: 10,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: "1 0 auto",
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    height: 200,
    width: 200,
  },
}));

const AllEvents = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getEvents();
  }, []);

  const { events } = props;
  const [epa, setEPA] = useState(true); //to build in a callType filter
  const [ecc, setECC] = useState(true);
  const [epda, setEPDA] = useState(true);
  const [open, setOpen] = useState(true);

  //filtering function
  const filterEvents = (events, eventType) => {
    return events.filter((event) => event.callType !== eventType);
  };

const updateEPA = (evt) => {
  setEPA(evt.target.checked);
};

const updateECC = (evt) => {
  setECC(evt.target.checked);
};

const updateEPDA = (evt) => {
  setEPDA(evt.target.checked);
};

const updateOpen = (evt) => {
  setOpen(evt.target.checked);
};

let filteredEvents = [...events]; //all of the events
if (epa === false) filteredEvents = filteredArr(filteredEvents, "EPA");
if (ecc === false) filteredEvents = filteredArr(filteredEvents, "ECC");
if (epda === false) filteredEvents = filteredArr(filteredEvents, "EPDA");
if (open === false) filteredEvents = filteredArr(filteredEvents, "open call");

return (
    <Container>
        <Box className={classes.header}>
            <Typography variant="h3">Posted Calls</Typography>
        </Box>
        <Grid container spacing={2} className={classes.filterSection} justify="center" >
            <Grid item xs={8} sm={2}>
                <FormControlLabel control={
                    <Checkbox checked={epa} onChange={updateEPA} name="epa" color="primary" />
                }
                label="EPA"
                labelPlacement="top"
                />
            </Grid>
            <Grid item xs={8} sm={2}>
                <FormControlLabel control={
                    <Checkbox checked={ecc} onChange={updateECC} name="ecc" color="primary" />
                }
                label="ECC"
                labelPlacement="top"
                />
            </Grid>
            <Grid item xs={8} sm={2}>
                <FormControlLabel control={
                    <Checkbox checked={epda} onChange={updateEPDA} name="epda" color="primary" />
                }
                label="EPDA"
                labelPlacement="top"
                />
            </Grid>
            <Grid item xs={8} sm={2}>
                <FormControlLabel control={
                    <Checkbox checked={open} onChange={updateOpen} name="open" color="primary" />
                }
                label="Open Call"
                labelPlacement="top"
                />
            </Grid>
            <Box mt={3}>
        <Grid container spacing={2}>
          {filteredEvents.map((event) => (
            <Grid item key={event.id} xs={12} md={6} lg={4}>
              <Card className={classes.cardRoot}>
                <Box className={classes.details}>
                  <CardContent className={classes.content}>
                    <Link to={`/events/${event.id}`} component={RouterLink}>
                      <Typography variant="h5">{event.title}</Typography>
                    </Link>
                    <Typography>
                      <em>Posted on:</em> {event.createdAt.slice(0, 10)}
                    </Typography>
                    <Typography>
                      <strong>Call Type:</strong> {event.callType}
                    </Typography>
                    <Typography>
                      <strong>Job Location:</strong> {event.jobLocation}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
        </Grid>
    </Container>
    )

}

const mapState = (state) => {
    return {
      events: state.events,
      userId: state.auth.id,
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
      getEvents: () => dispatch(fetchEvents()),
    //addEvent thunk...could go in a production member only type dashboard??
    };
  };
  
  export default connect(mapState, mapDispatch)(AllEvents);
