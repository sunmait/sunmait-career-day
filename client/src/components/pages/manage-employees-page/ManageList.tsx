import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';

import Header from '../../common/header';
import { ConnectProps } from './ManageListContainer';
import { StylesProps } from './StylesContainer';
import { IEmployee } from '../../../redux/modules/employees/reducer';
import backgroundColorHelper from '../../helper/backgroundColorHelper';

interface IProps extends StylesProps, ConnectProps {}

const ManageEmployeesList = (props: IProps) => {
  useEffect(() => {
    props.getFreeEmployeesList();
  }, []);

  const renderEmployeeProfile = () => {
    const { freeEmployees, updateFreeEmployeesList } = props;
    if (!freeEmployees) {
      return null;
    }

    return freeEmployees.map((item: IEmployee) => (
      <ListItem dense key={item.id}>
        {item.PhotoUrl ? (
          <Avatar alt={item.LastName} src={item.PhotoUrl} />
        ) : (
          <Avatar>
            <PersonIcon />
          </Avatar>
        )}
        <ListItemText primary={`${item.FirstName} ${item.LastName}`} />
        {item.assigned ? (
          <Button
            onClick={() => {
              updateFreeEmployeesList(item.id);
            }}
          >
            {' '}
            unAssign
          </Button>
        ) : (
          <Button
            onClick={() => {
              updateFreeEmployeesList(item.id);
            }}
          >
            {' '}
            Assign
          </Button>
        )}
      </ListItem>
    ));
  };

  const { classes, freeEmployees } = props;

  backgroundColorHelper();

  return (
    <div>
      <Grid container spacing={0} justify="center">
        <Header title="Assign/Unassign Employees" />
        <Grid item xs={11} sm={8} md={5} lg={4} xl={3}>
          <Grid container justify="center">
            <div className={classes.root}>
              <Paper elevation={1}>
                <List>{freeEmployees && renderEmployeeProfile()}</List>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export const ManageList = ManageEmployeesList;
