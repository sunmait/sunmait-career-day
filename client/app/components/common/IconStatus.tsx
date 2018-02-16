import * as React from 'react';
import ControlledTooltips from 'components/common/ControlledTooltips ';
import Archive from 'material-ui-icons/Archive';
import IconButton from 'material-ui/IconButton';
import TimeLine from 'material-ui-icons/Timeline';

interface IIconStatus {
  isArchived: boolean;
}

const IconStatus = (props: IIconStatus) => {
  return (
    props.isArchived ?
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
};

export default IconStatus;
