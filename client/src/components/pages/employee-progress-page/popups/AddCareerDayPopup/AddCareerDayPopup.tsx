import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DatePicker from '../../../../common/date-picker';
import { StylesProps } from './StylesContainer';

interface IProps extends StylesProps {
  handleClosePopup: () => void;
  handleAddCareerDay: (date: Date) => void;
  open: boolean;
}

interface IState {
  selectedDate: Date;
}

class AddCareerDayPopup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedDate: new Date(),
    };
  }

  private handleClosePopup = () => {
    this.props.handleClosePopup();
  }

  private handleAddCareerDay = () => {
    this.props.handleAddCareerDay(this.state.selectedDate);
  }

  private handleChangeDate = (date: Date) => {
    this.setState({ selectedDate: date });
  }

  public render() {
    const { classes } = this.props;

    return (
      <Dialog open={this.props.open} onClose={this.handleClosePopup}>
        <DialogTitle id="alert-dialog-title">Add career day</DialogTitle>
        <DialogContent className={classes.alignColumn}>
          <Typography variant="subtitle1" align="center">
            <DatePicker handleChangeDate={this.handleChangeDate} />
          </Typography>
          <Button
            color="primary"
            name="popup-add-button"
            className={classes.button}
            onClick={this.handleAddCareerDay}
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default AddCareerDayPopup;
