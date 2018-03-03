import * as React from 'react';
import { ICareerDayOfEmployee } from 'redux/modules/employees/reducer';
import * as moment from 'moment';
import IconStatus from 'components/common/icon-status/icon-status-career-day';
import Typography from 'material-ui/Typography';
import Delete from 'material-ui-icons/Delete';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import { Link, match } from 'react-router-dom';

interface IStylesProps {
  root: string;
  navigation: string;
  options: string;
  disableLinkStyle: string;
  button: string;
}

interface IMatchParams {
  userId: number;
}

interface IProps {
  classes: IStylesProps;
  careerDays: ICareerDayOfEmployee[];
  match: match<IMatchParams>;
  handleClickOnDeleteButton: (event: React.MouseEvent<SVGSVGElement>, deleteCareerDayId: number) => void;
}

interface IState {
  isOpenDeletePopup: boolean;
  isOpenAddPopup: boolean;
  deleteCareerDayId: number;
}

class HistoryOfProgress extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  private handleClick(event: React.MouseEvent< SVGSVGElement>, deleteCareerDayId: number) {
    this.props.handleClickOnDeleteButton(event, deleteCareerDayId);
  }

  private getCurrentDate(item: ICareerDayOfEmployee) {
    const format = 'DD.MM.YYYY hh:mm A';

    if (item.Archived) {
      return `${moment(item.CreatedAt).format(format)} - ${moment(item.UpdatedAt).format(format)}`;
    }
    return `${moment(item.CreatedAt).format(format)} - ${moment(item.InterviewDate).format(format)}`;
  }

  private renderHistoryOfProgress(classes: IStylesProps) {
    if (this.props.careerDays.length === 0) {
      return (
        <Typography align="center">
          This employee doesn't have career days.
        </Typography>
      );
    } else {
      return this.props.careerDays.map(item => (
        <Link
          key={item.id}
          to={{
            pathname: `/employees/${
              this.props.match
              }/career-day/${item.id}`,
          }}
          className={classes.disableLinkStyle}
        >
          <ListItem key={item.id} dense button>
            <IconStatus isArchived={item.Archived} />
            <ListItemText primary={this.getCurrentDate(item)} />
            <ListItemSecondaryAction>
              <Delete className={classes.options} onClick={e => this.handleClick(e, item.id)} />
            </ListItemSecondaryAction>
          </ListItem>
        </Link>
      ));
    }
  }

  public render() {
    return (
      <React.Fragment>
      {this.props.careerDays &&
        this.renderHistoryOfProgress(this.props.classes)}
      </React.Fragment>
    );
  }
}

export default HistoryOfProgress;
