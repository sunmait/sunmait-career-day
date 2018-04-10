import * as React from 'react';
import ControlledTooltips from 'components/common/controlled-tooltips';
import Queue from 'material-ui-icons/QueryBuilder';
import Done from 'material-ui-icons/Done';
import IconButton from 'material-ui/IconButton';
import TimeLine from 'material-ui-icons/Timeline';

enum ObjectiveStatuses {
  QUEUE = 2,
  IN_PROGRESS = 1,
  DONE = 3,
}

interface IProps {
  statusId: number;
}

const IconStatus = (props: IProps) => {
  if (props.statusId === ObjectiveStatuses.QUEUE) {
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
  } else if (props.statusId === ObjectiveStatuses.IN_PROGRESS) {
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
  } else if (props.statusId === ObjectiveStatuses.DONE) {
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
  }
};

export default IconStatus;
