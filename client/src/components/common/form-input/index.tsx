import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';

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
  },
});

interface IProps extends WithStyles<typeof styles> {
  label: string;
  maxLength: number;
  value: string | number;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = (props: IProps) => {
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
        <FormHelperText>{`${props.maxLength - props.value.toString().length}/${
          props.maxLength
        }`}</FormHelperText>
      </div>
    </FormControl>
  );
};

export default withStyles(styles)(FormInput);
