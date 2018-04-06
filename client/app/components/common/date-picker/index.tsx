import * as React from 'react';
import * as Picker from 'material-ui-pickers';
import EventIcon from 'material-ui-icons/Event';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

interface IProps {
  handleChangeDate: (date: Date) => void;
  displayedDate?: Date;
}

interface IState {
  selectedDate: Date;
}

class DatePicker extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedDate: this.props.displayedDate ? this.props.displayedDate : new Date(),
    };
  }

  public handleChangeDate(date: Date) {
    this.setState({ selectedDate: date });
    this.props.handleChangeDate(date);
  }

  public render() {
    const { selectedDate } = this.state;

    return (
      <Picker.DatePicker
        clearable
        leftArrowIcon={<KeyboardArrowLeft />}
        rightArrowIcon={<KeyboardArrowRight />}
        keyboardIcon={<EventIcon />}
        value={selectedDate}
        onChange={(date: Date) => this.handleChangeDate(date)}
        animateYearScrolling={false}
        minDate={new Date()}
      />
    );
  }
}

export default DatePicker;
