import * as React from 'react';
import * as moment from 'moment';
import * as Picker from 'material-ui-pickers';

interface IDatePickerProps {
}

interface IDatePickerState {
  selectedDate: {};
}

class DatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
  constructor(props: IDatePickerProps) {
    super(props);
    this.state = {
      selectedDate: moment(),
    };
  }

  public handleDateChange = (date: {}) => {
    this.setState({selectedDate: date});
  }

  public render() {
    const {selectedDate} = this.state;

    return (
      <React.Fragment>
        <div className="picker">
          <Picker.DatePicker
            keyboard
            clearable
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default DatePicker;
