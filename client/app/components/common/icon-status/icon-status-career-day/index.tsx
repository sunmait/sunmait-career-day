import * as React from 'react';
import ControlledTooltips from 'components/common/controlled-tooltips';
import Archive from 'material-ui-icons/Archive';
import IconButton from 'material-ui/IconButton';
import TimeLine from 'material-ui-icons/Timeline';

interface IProps {
  isArchived: boolean;
}

const IconStatus = (props: IProps) => {
  if (props.isArchived) {
    return (
      <ControlledTooltips
        title="Archived"
        isDisabled={true}
        tooltip={
          <IconButton>
            <Archive />
          </IconButton>
        }
      />
    );
  } else {
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
  }
};

export default IconStatus;
