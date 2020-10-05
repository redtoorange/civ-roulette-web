import React, {Component} from "react";
import {Collapse, ListGroupItem, ListGroupItemHeading} from "reactstrap";
import {SpinVm} from "../../SpinHome";
import {connect, ConnectedProps} from "react-redux";
import {IRootState} from "../../../../store";

const mapStateToProps = (state: IRootState) => {
    return {
        selected: state.Spin.selected
    }
}

const connector = connect(mapStateToProps);

interface SpinListItemProps extends ConnectedProps<typeof connector> {
    spin: SpinVm;
}

interface SpinListItemState {
    isOpen: boolean;
}

class SpinListItem extends Component<SpinListItemProps, SpinListItemState> {
    state = {
        isOpen: false
    }

    componentDidMount() {
        if (this.props.selected === this.props.spin.id) {
            this.setState({isOpen: true});
        }
    }

    toggle = () => {
        this.setState(prev => ({isOpen: !prev.isOpen}));
    }

    render() {
        return (
            <ListGroupItem key={this.props.spin.id} style={{transition: "ease"}} onClick={this.toggle}>
                <ListGroupItemHeading>
                    {this.props.spin.name}
                </ListGroupItemHeading>
                <Collapse isOpen={this.state.isOpen}>
                    <div>
                        {/*<p>{this.props.challenge.body}</p>*/}
                        {/*<p>Difficulty: {this.props.challenge.difficulty}</p>*/}
                        <p className="text-muted">Created: {this.props.spin.createdDate.toLocaleString()}</p>
                    </div>
                </Collapse>
            </ListGroupItem>
        );
    }

}

export default connector(SpinListItem);
