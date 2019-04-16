import * as React from 'react';
import { StylesProps } from '../objective/StylesContainer';
import FormInput from '../../../common/form-input';
import Button from '@material-ui/core/Button';
import {
  IObjective,
  IUpdateObjectiveManager,
} from '../../../../redux/modules/employees/reducer';

interface IProps extends StylesProps {
  objective: IObjective;
  handleSaveObjective: (
    objective: IUpdateObjectiveManager,
  ) => void;
  handleEditObjective: (
    e: React.MouseEvent<HTMLElement>,
  ) => void;
}

interface IState {
  Description: string;
  Title: string;
}

type stateKeys = keyof IState;

class ProgressObjectiveForManager extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      Title: this.props.objective.Title,
      Description: this.props.objective.Description,
    };
  }

  private handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const propName = e.target.name as stateKeys;
    const newState = { [propName as any]: e.target.value } as Pick<
      IState,
      stateKeys
    >;
    this.setState(newState);
  }

  private saveObjectiveClick = () => {
    const { handleSaveObjective, objective } = this.props;

    handleSaveObjective({
      title: this.state.Title,
      description: this.state.Description,
      id: objective.id,
    });

  }

  public render() {
    return ([
      <FormInput
        key={1}
        label={'Title'}
        maxLength={50}
        value={this.state.Title}
        handleChangeValue={this.handleChangeValue}
      />,
      <FormInput
        key={2}
        label={'Description'}
        maxLength={255}
        value={this.state.Description}
        handleChangeValue={this.handleChangeValue}
      />,
      <Button
        color="primary"
        disabled={
          this.state.Description.length === 0 ||
          this.state.Title.length === 0
        }
        onClick={
          (e) => {
            this.saveObjectiveClick();
            this.props.handleEditObjective(e);
          }
        }
      >
        Save
      </Button>
    ])
  }
}

export default ProgressObjectiveForManager;