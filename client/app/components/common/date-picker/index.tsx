import * as React from 'react';
import * as moment from 'moment';
import * as Picker from 'material-ui-pickers';
import EventIcon from 'material-ui-icons/Event';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

interface IProps {}

interface IState {
  selectedDate: moment.Moment;
}

class DatePicker extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedDate: moment(),
    };
  }

  public handleDateChange = (date: moment.Moment) => {
    this.setState({selectedDate: date});
  }

  public render() {
    const {selectedDate} = this.state;

    return (
      <Picker.DatePicker
        clearable
        leftArrowIcon={<KeyboardArrowLeft />}
        rightArrowIcon={<KeyboardArrowRight />}
        keyboardIcon={<EventIcon />}
        value={selectedDate}
        onChange={this.handleDateChange}
        animateYearScrolling={false}
      />
    );
  }
}

export default DatePicker;
