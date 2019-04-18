import React, { useState } from 'react';
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

  const [Title, setTitle] = useState(props.objective.Title);
  const [Description, setDescription] = useState(props.objective.Description);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const propName = e.target.name;
    if (propName === "Description") {
      setDescription(e.target.value);
    } else if (propName === "Title") {
      setTitle(e.target.value);
    }

  }

  const saveObjectiveClick = () => {
    const { handleSaveObjective, objective } = props;

    handleSaveObjective({
      title: Title,
      description: Description,
      id: objective.id,
    });
  }

  return (
    <div className={props.classes.alignFrom}>
      <FormInput
        key={1}
        label={'Title'}
        maxLength={50}
        value={Title}
        handleChangeValue={handleChangeValue}
      />
      <FormInput
        key={2}
        label={'Description'}
        maxLength={255}
        value={Description}
        handleChangeValue={handleChangeValue}
      />
      <Button
        color="primary"
        disabled={
          Description.length === 0 ||
          Title.length === 0
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

export default ProgressObjectiveForManager;