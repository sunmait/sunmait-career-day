import * as React from 'react';
import CareerDayForManagerPageContainer from '../CareerDayForManagerPage';
import CareerDayForEmployeePageContainer from '../CareerDayForEmployeePage';
import { match } from 'react-router-dom';
import { ConnectProps } from './ConnectContainer';

interface IMatchParams {
  careerDayId: string;
  userId: string;
}

interface IProps extends ConnectProps {
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
        {this.props.user.Role === 'manager' ? (
          <CareerDayForManagerPageContainer
            careerDayId={Number(this.props.match.params.careerDayId)}
            userId={Number(this.props.match.params.userId)}
          />
        ) : (
          <CareerDayForEmployeePageContainer />
        )}
      </div>
    );
  }
}

export default CareerDayPage;
