import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

interface IControlledTooltipsProps {
  classes: any;
  title: string;
  tooltip: string;
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

  public render() {
    return (
      <Tooltip
        id="tooltip-controlled"
        title={this.props.title}
        onClose={this.handleTooltipClose}
        enterDelay={300}
        leaveDelay={300}
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

  private handleTooltipClose = () => {
    this.setState({open: false});
  }

  private handleTooltipOpen = () => {
    this.setState({open: true});
  }
}

export default ControlledTooltips;
