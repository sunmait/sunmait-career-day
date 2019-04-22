import React, { useState, useCallback } from 'react';
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

const ProgressObjectiveForManager = (props: IProps) => {

  const [title, setTitle] = useState(props.objective.Title);
  const [description, setDescription] = useState(props.objective.Description);

  const saveObjectiveClick = () => {
    const { handleSaveObjective, objective } = props;

    handleSaveObjective({
      title: title,
      description: description,
      id: objective.id,
    });
  }

  const memoizedOnClick = useCallback(
    e => {
      saveObjectiveClick();
      props.handleEditObjective(e);
    },
    [title, description],
  );

  return (
    <div className={props.classes.alignFrom}>
      <FormInput
        key={1}
        label={'Title'}
        maxLength={50}
        value={title}
        handleChangeValue={e => setTitle(e.target.value)}
      />
      <FormInput
        key={2}
        label={'Description'}
        maxLength={255}
        value={description}
        handleChangeValue={e => setDescription(e.target.value)}
      />
      <Button
        color="primary"
        disabled={
          description.length === 0 ||
          title.length === 0
        }
        onClick={memoizedOnClick}
      >
        Save
      </Button>
    </div>
  )
}

export default ProgressObjectiveForManager;