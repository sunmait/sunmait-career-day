import React, { useState, useCallback } from 'react';
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

  const [progress, setProgress] = useState("");
  const [description, setDescription] = useState("");



  const memoizedSetProgress = useCallback(
    e => {
      const setNumberProgress = (progress: string) => {
        if (Number(progress) + props.objective.Progress * 100 <= 100 &&
          Number(progress) >= 1) {
          if (Number.isInteger(parseFloat(`${progress}`))) {
            return progress;
          }
        }
        return '';
      }
      setProgress(setNumberProgress(e.target.value))
    },
    [],
  );

  const memoizedOnClick = useCallback(
    e => {
      saveObjectiveClick();
      props.handleEditObjective(e);
    },
    [progress, description],
  );

  const saveObjectiveClick = () => {
    const { handleSaveObjective, objective } = props;

    handleSaveObjective({
      progress: {
        Progress: Number(progress) / 100,
        Description: description,
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
        value={progress}
        handleChangeValue={memoizedSetProgress}
      />
      <FormInput
        key={4}
        label={'Description'}
        maxLength={255}
        value={description}
        handleChangeValue={e => setDescription(e.target.value)}
      />
      <Button
        color="primary"
        disabled={
          description.length === 0 ||
          progress.length === 0
        }
        onClick={memoizedOnClick}
      >
        Save
      </Button>
    </div>
  )
}

export default ProgressObjectiveForEmployee;