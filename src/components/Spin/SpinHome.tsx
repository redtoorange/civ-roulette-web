import React, {Component} from "react";
import SpinList from "./SpinList/SpinList";
import {Container} from "reactstrap";
import {ChallengeVm} from "../Challenge/ChallengeHome";
import {connect, ConnectedProps} from "react-redux";
import SpinForm from "./SpinForm/SpinForm";
import {IRootState} from "../../store";
import {getSpins} from "./spin.reducer";

const mapStateToProps = (state: IRootState) => {
    return {
        spins: state.Spin.spins
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getSpins: () => dispatch(getSpins())
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export interface SpinCreateVm {
    name: string;
}

export interface SpinVm {
    id: string;
    name: string;
    challenges?: ChallengeVm[];
    createdDate: Date;
}

class SpinHome extends Component<ConnectedProps<typeof connector>> {
    componentDidMount() {
        this.props.getSpins();
    }

    render() {
        return (
            <div>
                <Container className="p-5 m-5">
                    <h1>Spins</h1>

                    <hr/>

                    <SpinForm/>

                    <hr/>

                    <SpinList spins={this.props.spins}/>

                </Container>
            </div>
        );
    }

}

export default connector(SpinHome);
