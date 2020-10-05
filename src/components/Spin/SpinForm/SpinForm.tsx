import React, {Component} from "react";
import {Button, Collapse, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {connect, ConnectedProps} from "react-redux";
import {SpinCreateVm} from "../SpinHome";
import {postSpin} from "../spin.reducer";
import {IRootState} from "../../../store";

const mapStateToProps = (state: IRootState) => {
    return {}
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        postSpin: (vm: SpinCreateVm) => dispatch(postSpin(vm))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

interface SpinFormProps extends ConnectedProps<typeof connector> {
}

interface SpinFormState {
    isOpen: boolean;

    formFields: {
        name: {
            value: string;
            isValid: boolean;
            processed: boolean;
        }
    }
}

const initialState = {
    formFields: {
        name: {
            value: "",
            isValid: true,
            processed: false,
        }
    },
    isOpen: false
};

class SpinForm extends Component<SpinFormProps, SpinFormState> {


    state = {...initialState}

    onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        if (name === "name") {
            this.setState(prev => ({
                ...prev,
                formFields: {
                    ...prev.formFields,
                    name: {
                        ...prev.formFields.name,
                        value: value,
                        processed: true,
                        isValid: value !== ""
                    }
                }
            }))
        }
    }

    validateForm: () => boolean = () => {
        const formData = {...this.state.formFields};

        // Name
        const nameValid = formData.name.value !== "";
        formData.name.isValid = nameValid;
        formData.name.processed = true;

        this.setState({formFields: formData});
        return nameValid;
    }

    onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (this.validateForm()) {
            const vm: SpinCreateVm = {
                name: this.state.formFields.name.value,
            }

            this.toggleForm();
            this.setState({...initialState})
            this.props.postSpin(vm);
        }
    }


    toggleForm = () => {
        this.setState(prev => ({isOpen: !prev.isOpen}));
    }

    render() {
        let button = <Button onClick={this.toggleForm} color="secondary">New Spin</Button>
        if (this.state.isOpen) {
            button = <Button onClick={this.toggleForm} color="danger">Cancel</Button>
        }

        return (
            <div style={{transition: "ease"}}>
                {button}

                <Collapse isOpen={this.state.isOpen}>
                    <Form onSubmit={this.onFormSubmit} className="mt-3">
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name"
                                   value={this.state.formFields.name.value}
                                   valid={this.state.formFields.name.isValid && this.state.formFields.name.processed}
                                   invalid={!this.state.formFields.name.isValid && this.state.formFields.name.processed}
                                   onChange={this.onFormChange}
                                   placeholder="Player Name"
                            />
                            <FormFeedback>Cannot be empty</FormFeedback>
                        </FormGroup>

                        <Button color="primary">Spin it!</Button>
                    </Form>
                </Collapse>
            </div>

        );
    }

}

export default connector(SpinForm);
