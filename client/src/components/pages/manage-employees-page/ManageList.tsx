import React from "react"
import Header from '../../common/header';
import { ConnectProps } from './ManageListContainer';
import { StylesProps } from './StylesContainer';
import Grid from '@material-ui/core/Grid';
import {
  IEmployee,
} from '../../../redux/modules/employees/reducer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import backgroundColorHelper from '../../helper/backgroundColorHelper';
import Button from "@material-ui/core/Button";

interface IProps extends StylesProps, ConnectProps { }

class ManageEmployeesList extends React.Component<IProps>{
  constructor(props: IProps) {
    super(props);
  }


  public componentDidMount() {
    this.props.getFreeEmployeesList();
  }

  private unAssignUsers = (user:IEmployee) => {
    this.props.updateFreeEmployeesList(user.id);
  }

  private AssignUsers = (user:IEmployee) => {
    this.props.updateFreeEmployeesList(user.id);
  }

  private renderEmployeeProfile = () => {
    const { freeEmployees } = this.props;
    if (!freeEmployees) {
      return null;
    }

    return freeEmployees.map((item: IEmployee) => (
      <ListItem dense >
        {item.PhotoUrl ? (
          <Avatar alt={item.LastName} src={item.PhotoUrl} />
        ) : (
            <Avatar>
              <PersonIcon />
            </Avatar>
          )}
        <ListItemText
          primary={`${item.FirstName} ${item.LastName}`}
        />
        {item.assigned ? (
          <Button
            onClick={() =>{
              this.unAssignUsers(item);
            }
            }> unAssign</Button>
        ) : (
            <Button
              onClick={() =>{
                this.AssignUsers(item);
              }
              }> Assign</Button>
          )}
      </ListItem>
    ));
  }

  public render() {
    const { classes } = this.props;

    backgroundColorHelper();

    return (
      <div>
        <Grid container spacing={0} justify="center">
          <Header title="Assign/Unassign Employees" />
          <Grid item xs={11} sm={8} md={5} lg={4} xl={3}>
            <Grid container justify="center">
              <div className={classes.root}>
                <Paper elevation={1}>
                  <List>
                    {this.props.freeEmployees && this.renderEmployeeProfile()}
                  </List>
                </Paper>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default ManageEmployeesList;

