import * as React from 'react';
import ControlledTooltips from 'components/common/controlled-tooltips';
import Queue from 'material-ui-icons/QueryBuilder';
import Done from 'material-ui-icons/Done';
import IconButton from 'material-ui/IconButton';
import TimeLine from 'material-ui-icons/Timeline';

interface IProps {
  statusId: number;
}

const IconStatus = (props: IProps) => {
  if (props.statusId === 1) {
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
  } else if (props.statusId === 2) {
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
  } else {
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
