import React from 'react';
import Button from "react-bootstrap/Button";
import * as API_USERS from "C:\\Users\\Robert\\Desktop\\An3 Sem1\\IS\\project\\react-demo-master\\src\\commons\\utilizator\\utilizator-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class UtilizatorForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                username: {
                    value: '',
                    placeholder: 'What is your username?...',
                    valid: true,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                password: {
                    value: '',
                    placeholder: 'Password...',
                    valid: true,
                    touched: false,
                    validationRules: {
                        passwordValidator: true
                    }
                },
                role: {
                    value: '',
                    placeholder: 'role...',
                    valid: true,
                    touched: false,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        //updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerUtilizator(utilizator) {
        return API_USERS.postUtilizator(utilizator, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted utilizator with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let utilizator = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
            role: this.state.formControls.role.value
        };

        console.log(utilizator);
        this.registerUtilizator(utilizator);
    }

    render() {
        return (
            <div>

                <FormGroup id='username'>
                    <Label for='usernameField'> Name: </Label>
                    <Input name='username' id='usernameField' placeholder={this.state.formControls.username.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.username.value}
                           touched={this.state.formControls.username.touched? 1 : 0}
                           valid={this.state.formControls.username.valid}
                           required
                    />
                    {this.state.formControls.username.touched && !this.state.formControls.username.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='password'>
                    <Label for='passwordField'> Password: </Label>
                    <Input name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                    <div className={"error-message"}> * Password must have a valid format</div>}
                </FormGroup>

                <FormGroup id='role'>
                    <Label for='roleField'> Role: </Label>
                    <Input name='role' id='roleField' placeholder={this.state.formControls.role.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.role.value}
                           touched={this.state.formControls.role.touched? 1 : 0}
                           valid={this.state.formControls.role.valid}
                           required
                    />
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default UtilizatorForm;
