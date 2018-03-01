import * as React from 'react';
import TextField from 'material-ui/TextField';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';

const styles = (theme: Theme) => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
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
  inputHelperText: string;
  calculateCharacters: string;
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
        rowsMax="4"
        onChange={props.handleChangeValue}
        margin="normal"
        inputProps={{
          maxLength: props.maxLength,
        }}
      />
      <div className={props.classes.helperText}>
        <FormHelperText>{props.inputHelperText}</FormHelperText>
        <FormHelperText>{props.calculateCharacters}</FormHelperText>
      </div>
    </FormControl>
  );
};

export default withStyles<ComponentClassNames>(styles)(FormInput);
