import * as React from 'react';
import { StylesProps } from '../objective/StylesContainer';
import FormInput from '../../../common/form-input';
import Button from '@material-ui/core/Button';
import {
  IObjective,
  IUpdateObjectiveEmployee,
} from '../../../../redux/modules/employees/reducer';

interface IProps extends StylesProps {
  objective: IObjective;
  handleSaveObjective: (
    objective: IUpdateObjectiveEmployee,
  ) => void;
  handleEditObjective: (
    e: React.MouseEvent<HTMLElement>,
  ) => void;
}

interface IState {
  Description: string;
  Progress: number;
}

type stateKeys = keyof IState;

class ProgressObjectiveForEmployee extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      Progress: 0,
      Description: "",
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

  private setNumberProgress = () => {
    const { Progress } = this.state;
    
    if (Number(Progress) + this.props.objective.Progress*100 <= 100 && Progress >= 1) {
      if (Number.isInteger(parseFloat(`${Progress}`))) {
        return Progress;
      }
    }
    return '';
  }

  private saveObjectiveClick = () => {
    const { handleSaveObjective, objective } = this.props;

    handleSaveObjective({
      progress: {
        Progress: Number(this.state.Progress) / 100,
        Description: this.state.Description,
        ObjectiveId: objective.id,
      },
      id: objective.id,
    });

  }

  public render() {
    return ([
      <FormInput
        key={3}
        label={'Progress'}
        maxLength={3}
        value={this.setNumberProgress()}
        handleChangeValue={this.handleChangeValue}
      />,
      <FormInput
        key={4}
        label={'Description'}
        maxLength={255}
        value={this.state.Description}
        handleChangeValue={this.handleChangeValue}
      />,
      <Button
        color="primary"
        disabled={
          this.state.Description.length === 0 ||
          this.state.Progress.toString().length === 0
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

export default ProgressObjectiveForEmployee;