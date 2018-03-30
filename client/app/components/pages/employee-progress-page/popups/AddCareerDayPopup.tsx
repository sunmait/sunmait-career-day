import * as React from 'react';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { Theme, withStyles, WithStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import DatePicker from 'components/common/date-picker';

const styles = (theme: Theme) => ({
  button: {
    marginTop: theme.spacing.unit,
  },
  alignColumn: {
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
});

type ComponentClassNames = 'alignColumn' | 'button';

interface IProps {
  handleClosePopup: () => void;
  handleAddCareerDay: (date: Date) => void;
  open: boolean;
}

interface IState {
  selectedDate: Date;
}

class AddCareerDayPopup extends React.Component<IProps & WithStyles<ComponentClassNames>, IState> {
  constructor(props: IProps & WithStyles<ComponentClassNames>) {
    super(props);
    this.state = {
      selectedDate: new Date(),
    };
  }

  private handleClosePopup() {
    this.props.handleClosePopup();
  }

  private handleAddCareerDay() {
    this.props.handleAddCareerDay(this.state.selectedDate);
  }

  private handleChangeDate(date: Date) {
    this.setState({selectedDate: date});
  }

  public render() {
    const {classes} = this.props;

    return (
      <Dialog open={this.props.open} onClose={() => this.handleClosePopup()}>
        <DialogTitle id="alert-dialog-title">Add career day</DialogTitle>
        <DialogContent className={classes.alignColumn}>
          <Typography type="subheading" align="center">
            <DatePicker handleChangeDate={(date: Date) => this.handleChangeDate(date)} />
          </Typography>
          <Button
            color="primary"
            name="popup-add-button"
            className={classes.button}
            onClick={() => this.handleAddCareerDay()}
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles<ComponentClassNames>(styles)(AddCareerDayPopup);
