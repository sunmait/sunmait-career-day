import * as React from 'react';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import DatePicker from 'components/common/date-picker';

interface IProps {
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
    return (
      <Dialog open={this.props.open} onClose={() => this.handleClosePopup()}>
        <DialogTitle id="alert-dialog-title">Add career day</DialogTitle>
        <DialogContent style={{display: 'flex'}}>
          <Typography type="subheading" align="center">
            <DatePicker handleChangeDate={(date: Date) => this.handleChangeDate(date)} />
          </Typography>
          <Button color="primary" onClick={() => this.handleAddCareerDay()}>
            Add
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default AddCareerDayPopup;
