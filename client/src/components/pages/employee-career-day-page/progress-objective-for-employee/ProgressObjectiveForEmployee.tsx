import React, { useState } from 'react';
import { StylesProps } from './StylesContainer';
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

const ProgressObjectiveForEmployee = (props: IProps) => {

  const [Progress, setProgress] = useState("");
  const [Description, setDescription] = useState("");

  const setNumberProgress = (Progress: string) => {
    console.log(Number(Progress));
    if (Number(Progress) + props.objective.Progress * 100 <= 100 && Number(Progress) >= 1) {
      if (Number.isInteger(parseFloat(`${Progress}`))) {
        return Progress;
      }
    }
    return '';
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const propName = e.target.name;
    if (propName === "Description") {
      setDescription(e.target.value);
    } else if (propName === "Progress") {
      setProgress(setNumberProgress(e.target.value));
    }
  }

  const saveObjectiveClick = () => {
    const { handleSaveObjective, objective } = props;

    handleSaveObjective({
      progress: {
        Progress: Number(Progress) / 100,
        Description: Description,
        ObjectiveId: objective.id,
      },
      id: objective.id,
    });
  }

  return (
    <div className={props.classes.alignFrom}>
      <FormInput
        key={3}
        label={'Progress'}
        maxLength={3}
        value={Progress}
        handleChangeValue={handleChangeValue}
      />
      <FormInput
        key={4}
        label={'Description'}
        maxLength={255}
        value={Description}
        handleChangeValue={handleChangeValue}
      />
      <Button
        color="primary"
        disabled={
          Description.length === 0 ||
          Progress.length === 0
        }
        onClick={
          (e) => {
            saveObjectiveClick();
            props.handleEditObjective(e);
          }
        }
      >
        Save
      </Button>
    </div>
  )
}

export default ProgressObjectiveForEmployee;