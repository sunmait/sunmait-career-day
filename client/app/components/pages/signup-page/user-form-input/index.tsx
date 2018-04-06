import * as React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';

const styles = (theme: Theme) => ({
  input: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit / 2,
  },
});

type ComponentClassNames = 'input';

interface IProps {
  label: string;
  title: string;
  value: string;
  error: string;
  type?: string;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserFormInput = (props: IProps & WithStyles<ComponentClassNames>) => {
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

export default withStyles<ComponentClassNames>(styles)(UserFormInput);
