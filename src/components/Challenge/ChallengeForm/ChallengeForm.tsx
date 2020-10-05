import React, {Component} from "react";
import {Button, Col, Collapse, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import {ChallengeCreateVm} from "../ChallengeHome";
import {connect, ConnectedProps} from "react-redux";
import {createChallenge} from "../challenge.reducer";
import {IRootState} from "../../../store";

const mapStateToProps = (state: IRootState) => {
    return {}
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        createChallenge: (vm: ChallengeCreateVm) => dispatch(createChallenge(vm))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

interface ChallengeFormState {
    isOpen: boolean;

    formFields: {
        title: {
            value: string;
            isValid: boolean;
            processed: boolean;
        },
        description: {
            value: string;
            isValid: boolean;
            processed: boolean;
        },
        difficulty: {
            value: string;
        },
        points: {
            value: number;
        }
    }
}

const initialState = {
    formFields: {
        title: {
            value: "",
            isValid: true,
            processed: false,
        },
        description: {
            value: "",
            isValid: true,
            processed: false,
        },
        difficulty: {
            value: "MEDIUM"
        },
        points: {
            value: 5
        }
    },
    isOpen: false
};

class ChallengeForm extends Component<ConnectedProps<typeof connector>, ChallengeFormState> {


    state = {...initialState}

    onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        if (name === "title") {
            this.setState(prev => ({
                ...prev,
                formFields: {
                    ...prev.formFields,
                    title: {
                        ...prev.formFields.title,
                        value,
                        processed: true,
                        isValid: value !== ""
                    }
                }
            }))
        } else if (name === "description") {
            this.setState(prev => ({
                ...prev,
                formFields: {
                    ...prev.formFields,
                    description: {
                        ...prev.formFields.description,
                        value,
                        processed: true,
                        isValid: value !== ""
                    }
                }
            }))
        } else if (name === "difficulty") {
            this.setState(prev => ({
                ...prev,
                formFields: {
                    ...prev.formFields,
                    difficulty: {
                        value
                    }
                }
            }))
        } else if (name === "points") {
            this.setState(prev => ({
                ...prev,
                formFields: {
                    ...prev.formFields,
                    points: {
                        value: Number(value)
                    }
                }
            }))
        }
    }

    validateForm: () => boolean = () => {
        const formData = {...this.state.formFields};

        // Title
        const titleValid = formData.title.value !== "";
        formData.title.isValid = titleValid;
        formData.title.processed = true;

        // Description
        const descriptionValid = formData.description.value !== ""
        formData.description.isValid = descriptionValid;
        formData.description.processed = true;

        this.setState({formFields: formData});
        return titleValid && descriptionValid;
    }

    onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (this.validateForm()) {
            const vm: ChallengeCreateVm = {
                title: this.state.formFields.title.value,
                body: this.state.formFields.description.value,
                difficulty: this.state.formFields.difficulty.value,
                points: this.state.formFields.points.value,
            }

            this.toggleForm();
            this.setState({...initialState})
            this.props.createChallenge(vm);
        }
    }


    toggleForm = () => {
        this.setState(prev => ({isOpen: !prev.isOpen}));
    }

    render() {
        let button = <Button onClick={this.toggleForm} color="secondary">New Challenge</Button>
        if (this.state.isOpen) {
            button = <Button onClick={this.toggleForm} color="danger">Cancel</Button>
        }

        return (
            <div style={{transition: "ease"}}>
                {button}

                <Collapse isOpen={this.state.isOpen}>
                    <Form onSubmit={this.onFormSubmit} className="mt-3">
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title"
                                   value={this.state.formFields.title.value}
                                   valid={this.state.formFields.title.isValid && this.state.formFields.title.processed}
                                   invalid={!this.state.formFields.title.isValid && this.state.formFields.title.processed}
                                   onChange={this.onFormChange}
                                   placeholder="Cool Name"
                            />
                            <FormFeedback>Cannot be empty</FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="description" id="description"
                                   value={this.state.formFields.description.value}
                                   valid={this.state.formFields.description.isValid && this.state.formFields.description.processed}
                                   invalid={!this.state.formFields.description.isValid && this.state.formFields.description.processed}
                                   onChange={this.onFormChange}
                                   placeholder="Some meaningful description"
                            />
                            <FormFeedback>Cannot be empty</FormFeedback>
                        </FormGroup>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="difficulty">Difficulty</Label>
                                    <Input type="select" name="difficulty" id="difficulty"
                                           onChange={this.onFormChange}
                                           value={this.state.formFields.difficulty.value}>
                                        <option value="TRIVIAL">Trivial</option>
                                        <option value="EASY">Easy</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HARD">Hard</option>
                                        <option value="IMPOSSIBLE">Impossible</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="points">Points</Label>
                                    <Input type="number" name="points" id="points" onChange={this.onFormChange}
                                           value={this.state.formFields.points.value}/>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Button color="primary">Create</Button>
                    </Form>
                </Collapse>
            </div>

        );
    }

}

export default connector(ChallengeForm);
