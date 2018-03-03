import * as React from 'react';
import Tooltip from 'material-ui/Tooltip';

interface IProps {
  title: string;
  tooltip: JSX.Element;
  isDisabled: boolean;
}

const ControlledTooltips = (props: IProps) => {
  return (
    <Tooltip
      id="tooltip-controlled"
      disableTriggerHover={!props.isDisabled}
      title={props.title}
      enterDelay={200}
      leaveDelay={200}
    >
      <div>{props.tooltip}</div>
    </Tooltip>
  );
};

export default ControlledTooltips;
