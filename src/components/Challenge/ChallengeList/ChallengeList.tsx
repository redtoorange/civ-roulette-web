import React, {Component} from "react";
import {ChallengeVm} from "../ChallengeHome";
import {ListGroup} from "reactstrap";
import ChallengeListItem from "./ChallengeListItem/ChallengeListItem";

interface ChallengeListProps {
    challenges: ChallengeVm[];
}

class ChallengeList extends Component<ChallengeListProps> {
    render() {
        let view = (
            <div>
                <h3>
                    Create some Challenges
                </h3>
            </div>
        );

        if (this.props.challenges && this.props.challenges.length > 0) {
            view = (
                <div>
                    <h3 className="mb-3">Challenge List</h3>

                    <ListGroup>
                        {this.props.challenges.map(challenge =>
                            <ChallengeListItem key={challenge.id} challenge={challenge}/>
                        )}
                    </ListGroup>
                </div>
            );
        }

        return view;
    }

}

export default ChallengeList;
