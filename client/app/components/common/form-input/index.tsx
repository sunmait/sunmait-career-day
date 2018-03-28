import * as React from 'react';
import TextField from 'material-ui/TextField';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';

const styles = (theme: Theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
    cursor: 'text',
  },
  helperText: {
    margin: '0 5px 0 10px',
    display: 'flex',
    justifyContent: 'space-between',
  } as React.CSSProperties,
});

type ComponentClassNames = 'textField' | 'helperText';

interface IProps {
  label: string;
  maxLength: number;
  value: string | number;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = (props: IProps & WithStyles<ComponentClassNames>) => {
  return (
    <FormControl>
      <TextField
        id="multiline-flexible"
        className={props.classes.textField}
        label={props.label}
        multiline
        value={props.value}
        rowsMax="4"
        onChange={props.handleChangeValue}
        margin="normal"
        name={props.label}
        inputProps={{
          maxLength: props.maxLength,
        }}
      />
      <div className={props.classes.helperText}>
        <FormHelperText>{`Max ${props.maxLength} characters`}</FormHelperText>
        <FormHelperText>{`${props.maxLength - props.value.toString().length}/${props.maxLength}`}</FormHelperText>
      </div>
    </FormControl>
  );
};

export default withStyles<ComponentClassNames>(styles)(FormInput);
