import * as React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { StylesProps } from './StylesContainer';

interface IProps extends StylesProps {
  label: string;
  title: string;
  value: string;
  error: string;
  type?: string;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserFormInput = (props: IProps) => {
  return (
    <FormControl error={props.error !== null} fullWidth className={props.classes.input}>
      <InputLabel htmlFor={props.label}>{props.title}</InputLabel>
      <Input
        id={props.label}
        placeholder={props.title}
        onChange={props.handleChangeValue}
        fullWidth
        value={props.value}
        name={props.label}
        type={'type' in props ? props.type : 'text'}
      />
      <FormHelperText error={props.error !== null}>
        {props.error !== null && props.error}
      </FormHelperText>
    </FormControl>
  );
};

export default UserFormInput;
