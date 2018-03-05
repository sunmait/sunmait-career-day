import * as React from 'react';
import * as moment from 'moment';
import Paper from 'material-ui/Paper';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TimeLine from 'material-ui-icons/Timeline';
import WorkIcon from 'material-ui-icons/Work';
import BookIcon from 'material-ui-icons/Book';
import { ICareerDayOfEmployee } from 'redux/modules/employees/reducer';

interface IProps {
  selectedCareerDay: ICareerDayOfEmployee;
}

const DatetimeList = (props: IProps) => {
  const format = 'DD.MM.YYYY hh:mm A';

  return (
    <Paper elevation={1}>
    <List>
      <ListItem>
        <Avatar>
          <WorkIcon />
        </Avatar>
        <ListItemText
          primary="Created at"
          secondary={moment(props.selectedCareerDay.CreatedAt).format(format)}
        />
      </ListItem>
      <ListItem>
        <Avatar>
          <TimeLine />
        </Avatar>
        <ListItemText
          primary="Updated at"
          secondary={moment(props.selectedCareerDay.UpdatedAt).format(format)}
        />
      </ListItem>
      <ListItem>
        <Avatar>
          <BookIcon />
        </Avatar>
        <ListItemText
          primary="Interview Date"
          secondary={moment(props.selectedCareerDay.InterviewDate).format(format)}
        />
        </ListItem>
      </List>
    </Paper>
  );
};

export default DatetimeList;
