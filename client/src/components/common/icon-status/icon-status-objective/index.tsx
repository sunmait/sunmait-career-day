import * as React from 'react';
import ControlledTooltips from '../../../common/controlled-tooltips';
import Queue from '@material-ui/icons/QueryBuilder';
import Done from '@material-ui/icons/Done';
import Error from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import TimeLine from '@material-ui/icons/Timeline';

enum ObjectiveStatuses {
  QUEUE = 2,
  IN_PROGRESS = 1,
  DONE = 3,
}

interface IProps {
  statusId: ObjectiveStatuses;
}

const IconStatus = (props: IProps) => {
  switch (props.statusId) {
    case ObjectiveStatuses.QUEUE:
      return (
        <ControlledTooltips
          title="Queue"
          isDisabled={true}
          tooltip={
            <IconButton>
              <Queue />
            </IconButton>
          }
        />
      );

    case ObjectiveStatuses.IN_PROGRESS:
      return (
        <ControlledTooltips
          title="In progress"
          isDisabled={true}
          tooltip={
            <IconButton>
              <TimeLine />
            </IconButton>
          }
        />
      );

    case ObjectiveStatuses.DONE:
      return (
        <ControlledTooltips
          title="Done"
          isDisabled={true}
          tooltip={
            <IconButton>
              <Done />
            </IconButton>
          }
        />
      );

    default:
      return (
        <ControlledTooltips
          title="Unknown objective status"
          isDisabled={true}
          tooltip={
            <IconButton>
              <Error />
            </IconButton>
          }
        />
      );
  }
};

export default IconStatus;
