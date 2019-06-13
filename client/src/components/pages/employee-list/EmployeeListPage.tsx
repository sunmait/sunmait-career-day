import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../../common/header';
import backgroundColorHelper from '../../helper/backgroundColorHelper';
import { ConnectProps } from './EmployeeListContainer';
import { StylesProps } from './StylesContainer';
import ButtonLink from '../../common/button-link';
import { Checkbox } from '@material-ui/core';
import EmployeeList from './EmployeesList';

interface IProps extends StylesProps, ConnectProps {}

class EmployeeListPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { classes, getEmployeesList } = this.props;
    backgroundColorHelper();
    return (
      <div>
        <Grid container spacing={0} justify="center">
          <Header title="List Of Employees" />
          <Grid item xs={11} sm={8} md={5} lg={4} xl={3}>
            <Grid container justify="center">
              <ButtonLink
                to={`/employees`}
                classes={classes}
                primary="Employees"
                isDisabled={true}
              />
              <ButtonLink
                to={`/nearest-career-day`}
                classes={classes}
                primary="Nearest Career Days"
                isDisabled={false}
              />
              <div className={classes.checkbox}>
                no career day
                <Checkbox onClick={() => getEmployeesList(true)} />
              </div>
              <EmployeeList
                classes={this.props.classes}
                employees={this.props.employees}
                loadEmployeesList={this.props.loadEmployeesList}
                getEmployeesList={this.props.getEmployeesList}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default EmployeeListPage;
