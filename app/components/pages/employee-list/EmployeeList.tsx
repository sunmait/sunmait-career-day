import * as React from 'react';
import {IUser} from 'redux/modules/auth/authReducer';
import {employees, IEmployee} from './employees';
import {Theme, withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import Archive from 'material-ui-icons/Archive';
import TimeLine from 'material-ui-icons/Timeline';
import Avatar from 'material-ui/Avatar';

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    padding: 12,
  },
});

interface IEmployeeListProps {
  user: IUser;
  classes: any;
}

interface IEmployeeListState {
}

class EmployeeList extends React.Component<IEmployeeListProps, IEmployeeListState> {
  public render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <List>
          {employees.map((item: IEmployee) => (
            <ListItem key={item.id} dense button className={classes.listItem}>
              <Avatar alt={item.fullName} src={item.avatar} />
              <ListItemText primary={item.fullName} />
              <ListItemSecondaryAction>
                {item.isActive ? <TimeLine className={classes.icon} /> : < Archive className={classes.icon} />}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(EmployeeList);
