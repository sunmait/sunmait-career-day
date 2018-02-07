import * as React from 'react';
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import DatePicker from 'components/date-picker/DatePicker';

interface IEmployeeProfileProps {
  handleClosePopup: () => void;
  open: boolean;
}

class AddNewDaysPage extends React.Component <IEmployeeProfileProps> {
  constructor(props: IEmployeeProfileProps) {
    super(props);
  }

  public handleClose = () => {
    this.props.handleClosePopup();
  }

  public render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
      >
        <DialogTitle id="alert-dialog-title">Add career day</DialogTitle>
        <DialogContent style={{display: 'flex'}}>
          <Typography type="subheading" align="center"> <DatePicker /></Typography>
          <Button
            onClick={this.handleClose} color="primary" autoFocus>
            Add
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default AddNewDaysPage;
