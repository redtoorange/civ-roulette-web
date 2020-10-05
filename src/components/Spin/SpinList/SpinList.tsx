import React, {Component} from "react";
import SpinListItem from "./SpinListItem/SpinListItem";
import {ListGroup} from "reactstrap";
import {SpinVm} from "../SpinHome";

interface SpinListProps {
    spins: SpinVm[];
}

class SpinList extends Component<SpinListProps> {
    render() {
        let view = (
            <div>
                <h3>
                    Create some Challenges
                </h3>
            </div>
        );

        if (this.props.spins && this.props.spins.length > 0) {
            view = (
                <div>
                    <h3>Spin List</h3>

                    <ListGroup>
                        {this.props.spins.map(spin =>
                            <SpinListItem key={spin.id} spin={spin}/>
                        )}
                    </ListGroup>
                </div>
            );
        }

        return view;
    }
}

export default SpinList;
