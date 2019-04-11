import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import TimeLine from '@material-ui/icons/Timeline';
import WorkIcon from '@material-ui/icons/Work';
import BookIcon from '@material-ui/icons/Book';
import { toStandardFormat } from '../../../helper/dateTimeHelper';
import { ICareerDayOfEmployee } from '../../../../redux/modules/employees/reducer';
import Person from '@material-ui/icons/Person';	

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
        <ListItem>
          <Avatar>
            <Person />
          </Avatar>
          <ListItemText
            primary="Manager Info"
            secondary={`${props.selectedCareerDay.ManagerFirstName}	
            ${props.selectedCareerDay.ManagerLastName} `}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default DatetimeList;
