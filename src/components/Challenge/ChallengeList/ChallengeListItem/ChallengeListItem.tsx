import React, {Component} from "react";
import {Collapse, ListGroupItem, ListGroupItemHeading} from "reactstrap";
import {ChallengeVm} from "../../ChallengeHome";
import {connect, ConnectedProps} from "react-redux";
import {IRootState} from "../../../../store";

const mapStateToProps = (state: IRootState) => {
    return {
        selected: state.Challenge.selected
    }
}

const connector = connect(mapStateToProps);


interface ChallengeListItemProps extends ConnectedProps<typeof connector> {
    challenge: ChallengeVm;
}

interface ChallengeListItemState {
    isOpen: boolean;
}


class ChallengeListItem extends Component<ChallengeListItemProps, ChallengeListItemState> {
    state = {
        isOpen: false
    }

    componentDidMount() {
        if (this.props.selected === this.props.challenge.id) {
            this.setState({isOpen: true});
        }
    }

    toggle = () => {
        this.setState(prev => ({isOpen: !prev.isOpen}));
    }

    render() {
        return (
            <ListGroupItem key={this.props.challenge.id} style={{transition: "ease"}} onClick={this.toggle}>
                <ListGroupItemHeading>
                    {this.props.challenge.title}
                </ListGroupItemHeading>
                <Collapse isOpen={this.state.isOpen}>
                    <div>
                        <p>{this.props.challenge.body}</p>
                        <p>Difficulty: {this.props.challenge.difficulty}</p>
                        <p className="text-muted">Created: {this.props.challenge.createdDate.toLocaleString()}</p>
                    </div>

                </Collapse>
            </ListGroupItem>
        );
    }
}

export default connector(ChallengeListItem);
