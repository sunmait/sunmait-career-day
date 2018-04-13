import * as React from 'react';
import CareerDayForManagerPageContainer from './CareerDayForManagerPage';
import CareerDayForEmployeePageContainer from './CareerDayForEmployeePage';
import { IUser } from 'redux/modules/auth/reducer';
import { match } from 'react-router-dom';

interface IMatchParams {
  careerDayId: number;
  userId: number;
}

interface IProps {
  user: IUser;
  match: match<IMatchParams>;
}

interface IState {}

class CareerDayPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div>
        {this.props.user.Role === 'manager' ?
          <CareerDayForManagerPageContainer
            careerDayId={this.props.match.params.careerDayId}
            userId={this.props.match.params.userId}
          /> :
          <CareerDayForEmployeePageContainer />}
      </div>
    );
  }
}

export default CareerDayPage;
