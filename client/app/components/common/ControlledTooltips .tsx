import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

interface IControlledTooltipsProps {
  title: string;
  tooltip: object;
}

interface IControlledTooltipsState {
  open: boolean;
}

class ControlledTooltips extends React.Component<IControlledTooltipsProps, IControlledTooltipsState> {
  constructor(props: IControlledTooltipsProps) {
    super(props);
    this.state = {
      open: false,
    };
  }

  public handleTooltipClose = () => {
    this.setState({open: false});
  }

  public handleTooltipOpen = () => {
    this.setState({open: true});
  }

  public render() {
    return (
      <Tooltip
        id="tooltip-controlled"
        title={this.props.title}
        onClose={this.handleTooltipClose}
        enterDelay={200}
        leaveDelay={200}
        onOpen={this.handleTooltipOpen}
        open={this.state.open}
        placement="bottom"
      >
        <IconButton aria-label="Delete">
          {this.props.tooltip}
        </IconButton>
      </Tooltip>
    );
  }
}

export default ControlledTooltips;
