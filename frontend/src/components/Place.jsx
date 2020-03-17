import React from 'react';
import useFetch from 'react-fetch-hook';
import { useParams } from 'react-router-dom';
import {
  CircularProgress, Typography, Card, CardContent, List, ListItem, ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  addr: {
    marginBottom: '1.2rem',
  },
});

const Place = () => {
  const classes = useStyles();
  const { placeId } = useParams();
  const { isLoading, data } = useFetch(`http://localhost:3000/places/${placeId}`);

  if (isLoading) return <CircularProgress />;

  if (!data) return <Typography>Not Found</Typography>;

  const { displayed_what, displayed_where, opening_hours } = data;

  const openingHours = Object.entries(opening_hours.days).reduce((acc, entry) => {
    const [day, hours] = entry;

    if (acc.length <= 0) {
      acc.push({ day, hours });
      return acc;
    }

    const [last] = acc.slice(-1);
    const { day: lastDay, hours: lastHours } = last;

    if (JSON.stringify(hours) === JSON.stringify(lastHours)) {
      let dayRange;
      if (lastDay.includes('-')) {
        const [earliestDay, ..._] = lastDay.split('-');
        dayRange = `${earliestDay}-${day}`;
      } else {
        dayRange = `${lastDay}-${day}`;
      }
      acc.splice(-1, 1, { day: dayRange, hours });
    } else {
      acc.push({ day, hours });
    }

    return acc;
  }, []);

  const openingHoursItems = openingHours.map((entry) => {
    const { day, hours } = entry;

    const hoursText = hours.map((hoursRange) => {
      if (hoursRange.type === 'OPEN') {
        return (
          <Typography component="p">
            {hoursRange.start}
            -
            {hoursRange.end}
          </Typography>
        );
      }

      return <Typography component="p">Closed</Typography>;
    });

    return (
      <ListItem>
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

export default Place;
