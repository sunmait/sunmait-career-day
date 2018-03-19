import * as React from 'react';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import { withStyles, WithStyles } from 'material-ui/styles';
import DatePicker from 'components/common/date-picker';
import Typography from 'material-ui/Typography';

const styles = {
  alignColumn: {
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
};

type ComponentClassNames = 'alignColumn';

interface IProps {
  handleClosePopup: () => void;
  open: boolean;
  handleUpdateDatetime: (interviewDate: { date: Date }) => void;
  interviewDate: Date;
}

interface IState {
  interviewDate: Date;
}

class DatetimePopup extends React.Component<IProps & WithStyles<ComponentClassNames>, IState> {
  constructor(props: IProps & WithStyles<ComponentClassNames>) {
    super(props);
    this.state = {
      interviewDate: this.props.interviewDate,
    };
  }

  private updateDateClick() {
    const interviewDate = {
      date: this.state.interviewDate,
    };

    this.props.handleUpdateDatetime(interviewDate);
    this.handleClosePopup();
  }

  private handleClosePopup() {
    this.props.handleClosePopup();
  }

  private handleChangeDate(date: Date) {
    this.setState({interviewDate: date});
  }

  public render() {
    const {classes} = this.props;

    return (
      <Dialog open={this.props.open} onClose={() => this.handleClosePopup()}>
        <DialogTitle id="alert-dialog-title">Change interview date</DialogTitle>
        <DialogContent className={classes.alignColumn}>
          <Typography type="subheading" align="center">
            <DatePicker
              handleChangeDate={(date: Date) => this.handleChangeDate(date)}
              displayedDate={this.props.interviewDate}
            />
          </Typography>

          <Button
            color="primary"
            onClick={() => this.updateDateClick()}
          >
            Update
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles<ComponentClassNames>(styles)(DatetimePopup);
