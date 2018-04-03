import * as React from 'react';
import Paper from 'material-ui/Paper';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TimeLine from 'material-ui-icons/Timeline';
import WorkIcon from 'material-ui-icons/Work';
import BookIcon from 'material-ui-icons/Book';
import { toStandardFormat } from '../../../helper/dateTimeHelper';
import { ICareerDayOfEmployee } from 'redux/modules/employees/reducer';

interface IProps {
  selectedCareerDay: ICareerDayOfEmployee;
}

const DatetimeList = (props: IProps) => {

  return (
    <Paper elevation={1}>
    <List>
      <ListItem>
        <Avatar>
          <WorkIcon />
        </Avatar>
        <ListItemText
          primary="Created at"
          secondary={toStandardFormat(props.selectedCareerDay.CreatedAt)}
        />
      </ListItem>
      <ListItem>
        <Avatar>
          <TimeLine />
        </Avatar>
        <ListItemText
          primary="Updated at"
          secondary={toStandardFormat(props.selectedCareerDay.UpdatedAt)}
        />
      </ListItem>
      <ListItem>
        <Avatar>
          <BookIcon />
        </Avatar>
        <ListItemText
          primary="Interview Date"
          secondary={toStandardFormat(props.selectedCareerDay.InterviewDate)}
        />
        </ListItem>
      </List>
    </Paper>
  );
};

export default DatetimeList;
