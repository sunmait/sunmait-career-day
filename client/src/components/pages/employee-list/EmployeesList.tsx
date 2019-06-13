import * as React from 'react';
import { Link } from 'react-router-dom';
import { IEmployee, ICareerDay } from '../../../redux/modules/employees/reducer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import backgroundColorHelper from '../../helper/backgroundColorHelper';
import { ConnectProps } from './EmployeeListContainer';
import { StylesProps } from './StylesContainer';
import Loader from '../../common/loader';

interface IProps extends StylesProps, ConnectProps {}

class EmployeeList extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getEmployeesList(true);
  }

  private formatActiveCareerDayDate = (activeCareerDay: ICareerDay | null) => {
    if (!activeCareerDay) {
      return 'no career day';
    }
    return new Date(activeCareerDay.InterviewDate).toLocaleString('en', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });
  };

  private renderEmployeeProfile = () => {
    const { employees, classes } = this.props;
    if (!employees) {
      return null;
    }

    return employees.map((item: IEmployee) => (
      <Link
        key={item.id}
        to={{
          pathname: `/employees/${item.id}`,
          state: { employee: item },
        }}
        className={classes.disableLinkStyle}
      >
        <ListItem dense button>
          {item.PhotoUrl ? (
            <Avatar alt={item.LastName} src={item.PhotoUrl} />
          ) : (
            <Avatar>
              <PersonIcon />
            </Avatar>
          )}
          <ListItemText
            primary={`${item.FirstName} ${item.LastName}`}
            secondary={`Career day: ${this.formatActiveCareerDayDate(item.ActiveCareerDay)}`}
          />
        </ListItem>
      </Link>
    ));
  };

  public render() {
    const { classes, loadEmployeesList } = this.props;
    if (loadEmployeesList === true) {
      return <Loader />;
    }
    backgroundColorHelper();
    return (
      <div>
        <div className={classes.root}>
          <Paper elevation={1}>
            <List>{this.props.employees && this.renderEmployeeProfile()}</List>
          </Paper>
        </div>
      </div>
    );
  }
}

export default EmployeeList;
