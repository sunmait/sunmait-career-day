import * as React from 'react';
import Dialog, {DialogContent, DialogTitle} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import DatePicker from 'components/common/date-picker';

interface IProps {
  handleClosePopup: () => void;
  open: boolean;
}

interface IState {}

class CareerDayPopup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  public handleClosePopup = () => {
    this.props.handleClosePopup();
  }

  public render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClosePopup}>
        <DialogTitle id="alert-dialog-title">Add career day</DialogTitle>
        <DialogContent style={{display: 'flex'}}>
          <Typography type="subheading" align="center">
            {' '}
            <DatePicker />
          </Typography>
          <Button color="primary" onClick={this.handleClosePopup}>
            Add
          </Button>
        </DialogContent>
      </Dialog>
    );
  }
}

export default CareerDayPopup;
