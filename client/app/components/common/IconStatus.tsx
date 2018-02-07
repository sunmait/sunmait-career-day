import * as React from 'react';
import ControlledTooltips from 'components/common/ControlledTooltips ';
import Archive from 'material-ui-icons/Archive';
import IconButton from 'material-ui/IconButton';
import TimeLine from 'material-ui-icons/Timeline';

const IconStatus = (isArchived: boolean) => {
  return (
    isArchived ?
      <ControlledTooltips
        title="Archived"
        isDisabled={true}
        tooltip={
          <IconButton>
            <Archive />
          </IconButton>
        }
      /> :
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

export default IconStatus;
