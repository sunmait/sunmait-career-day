import * as React from 'react';
import Tooltip from 'material-ui/Tooltip';

interface IProps {
  title: string;
  tooltip: JSX.Element;
  isDisabled: boolean;
}

interface IState {}

class ControlledTooltips extends React.Component<IProps, IState> {
  public render() {
    return (
      <Tooltip
        id="tooltip-controlled"
        disableTriggerHover={!this.props.isDisabled}
        title={this.props.title}
        enterDelay={200}
        leaveDelay={200}
      >
        <div>{this.props.tooltip}</div>
      </Tooltip>
    );
  }
}

export default ControlledTooltips;
