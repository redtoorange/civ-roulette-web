import React, {Component} from "react";
import {connect, ConnectedProps} from "react-redux";
import {Container} from "reactstrap";
import ChallengeForm from "./ChallengeForm/ChallengeForm";
import ChallengeList from "./ChallengeList/ChallengeList";
import {IRootState} from "../../store";
import {getChallenges} from "./challenge.reducer";

const mapStateToProps = (state: IRootState) => {
    return {
        challenges: state.Challenge.challenges
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getChallenges: () => dispatch(getChallenges()),
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export interface ChallengeCreateVm {
    title: string;
    body: string;
    difficulty: string;
    points: number;
}

export interface ChallengeVm {
    id: string;
    title: string;
    body: string;
    difficulty: string;
    points: number;
    createdDate: Date;
}

class ChallengeHome extends Component<ConnectedProps<typeof connector>> {
    componentDidMount() {
        this.props.getChallenges();
    }


    render() {
        return (
            <Container className="p-5 m-5">
                <h1>Challenges</h1>

                <hr/>

                <ChallengeForm/>

                <hr/>

                <ChallengeList challenges={this.props.challenges}/>
            </Container>
        );
    }

}

export default connector(ChallengeHome);
