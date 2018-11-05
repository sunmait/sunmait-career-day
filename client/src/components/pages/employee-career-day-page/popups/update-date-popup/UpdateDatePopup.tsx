import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DatePicker from '../../../../common/date-picker';
import Typography from '@material-ui/core/Typography';
import { StylesProps } from './StylesContainer';
import { IUpdateInterviewDate } from '../../../../../redux/modules/employees/reducer';
import DialogActions from '@material-ui/core/DialogActions';

interface IProps extends StylesProps {
  handleClosePopup: () => void;
  open: boolean;
  handleUpdateDatetime: (
    interviewDate: Pick<IUpdateInterviewDate, 'date'>,
  ) => void;
  interviewDate: Date;
}

interface IState {
  interviewDate: Date;
}

class DatetimePopup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      interviewDate: this.props.interviewDate,
    };
  }

  private updateDateClick = () => {
    const interviewDate = {
      date: this.state.interviewDate,
    };

    this.props.handleUpdateDatetime(interviewDate);
    this.handleClosePopup();
  }

  private handleClosePopup = () => {
    this.props.handleClosePopup();
  }

  private handleChangeDate = (date: Date) => {
    this.setState({ interviewDate: date });
  }

  public render() {
    const { classes } = this.props;

    return (
      <Dialog open={this.props.open} onClose={this.handleClosePopup}>
        <DialogTitle id="alert-dialog-title">Change interview date</DialogTitle>
        <DialogContent className={classes.alignColumn}>
          <Typography variant="subtitle1" align="center">
            <DatePicker
              handleChangeDate={this.handleChangeDate}
              displayedDate={this.props.interviewDate}
            />
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            className={classes.button}
            onClick={this.updateDateClick}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DatetimePopup;
