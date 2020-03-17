/**
 * PlaceCard is a Card component displaying a particular place base on the URL param.
 */
/* eslint-disable camelcase */
import React from 'react';
// React Fetch Hook
import useFetch from 'react-fetch-hook';
// React Router
import { useParams } from 'react-router-dom';
// Material UI
import {
  CircularProgress, Typography, Card, CardContent, List, ListItem, ListItemText, Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  addr: {
    marginBottom: '1.2rem',
  },
  listItemSubText: {
    display: 'block',
  },
});

const PlaceCard = () => {
  // Get the classes to apply the style
  const classes = useStyles();
  // Hook in the URL param
  const { placeId } = useParams();
  // Fetch the data from the backend
  const { isLoading, data } = useFetch(`http://localhost:3000/places/${placeId}`);

  // Display a spinner when loading
  if (isLoading) return <Box mt={6}><CircularProgress /></Box>;

  // If the data wasn't found, greet the user with a nice message :)
  if (!data) return <Typography>Not Found</Typography>;

  // Get the data we want to display via destructuring
  const { displayed_what, displayed_where, opening_hours } = data;

  // Reduce the opening hours in order to obtain a array with the days aggregated
  // if the hours are the same
  const openingHours = Object.entries(opening_hours.days).reduce((acc, entry) => {
    const [day, hours] = entry;

    // When the accumulator is empty, just push the first day and opening hours
    if (acc.length <= 0) {
      acc.push({ day, hours });
      return acc;
    }

    // Get the last day and opening hours in the accumulator
    const [last] = acc.slice(-1);
    const { day: lastDay, hours: lastHours } = last;

    // Based on the opening hours of the current day, aggregate it with the last day
    // if they have the same opening hours
    if (JSON.stringify(hours) === JSON.stringify(lastHours)) {
      let dayRange;
      if (lastDay.includes('-')) {
        // If the last entry in the accumulator was already a range, update the range
        const [earliestDay, ..._] = lastDay.split('-');
        dayRange = `${earliestDay}-${day}`;
      } else {
        // Else create a range
        dayRange = `${lastDay}-${day}`;
      }
      acc.splice(-1, 1, { day: dayRange, hours });
    } else {
      acc.push({ day, hours });
    }

    return acc;
  }, []);

  // Create the list items components for each day or day range
  const openingHoursItems = openingHours.map((entry) => {
    const { day, hours } = entry;

    // Create the text representing the opening hours for each day
    const hoursText = hours.map((hoursRange, index) => {
      if (hoursRange.type === 'OPEN') {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Typography className={classes.listItemSubText} key={index} component="span">
            {hoursRange.start}
            -
            {hoursRange.end}
          </Typography>
        );
      }

      return <Typography className={classes.listItemSubText} component="span">Closed</Typography>;
    });

    return (
      <ListItem key={day}>
        <ListItemText primary={day} secondary={<>{hoursText}</>} />
      </ListItem>
    );
  });

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h1">
          {displayed_what}
        </Typography>
        <Typography className={classes.addr} color="textSecondary">
          {displayed_where}
        </Typography>
        <Typography varient="h6" component="h1">
          Opening Hours
        </Typography>
        <List>
          {openingHoursItems}
        </List>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
