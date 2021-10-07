import React from 'react';

import {
    Button,
    CardHeader,
    Col, FormGroup, Input, Label,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';
import validate from "../person/components/validators/person-validators";
import * as API_USERS from "./api/login-api";

import Img from '../commons/images/login.png';

const vertical_center = {
    background: '#123456',
    color: 'blue',
    margin: '0',
    position: 'absolute',
    top: '20%',
    ms_transform: 'translateX(130%)',
    transform: 'translateX(130%)',
    width: '400px',
    height: '430px'
};

const textStyle = {
    position: 'absolute',
    transform: 'translateX(130%)',
    top: '0%',
};

class LoginContainer extends React.Component {

    constructor(props) {

        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.errorForm = this.errorForm.bind(this);

        this.state = {

            errorStatus: 0,
            error: null,
            err: false,
            errorMessage: '',

            formIsValid: false,

            formControls: {
                username: {
                    value: '',
                    placeholder: 'Username...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                password: {
                    value: '',
                    placeholder: 'Password...',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isRequired: true
                    }
                },
            }
        };


    }

    errorForm() {
        this.setState({err: !this.state.err, errorMessage: 'Invalid login! Please try again.'});
    }



    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
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

    login(user) {
        return API_USERS.getUser(user, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully logged in person with id: " + result.role);
                window.location.href=result.role;
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error,
                }));
                this.errorForm();
            }
        });
    }

    handleSubmit() {
        let user = {
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
        };

        console.log(user);
        this.login(user);
    }


    render() {
        return (
            <div style={vertical_center}>
                <CardHeader>
                    <strong style={textStyle}> LOGIN PAGE </strong>
                </CardHeader>

                <div >

                    <img src={Img} width="400" height="180" />


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
                    <Input type = 'password' name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.password.value}
                           touched={this.state.formControls.password.touched? 1 : 0}
                           valid={this.state.formControls.password.valid}
                           required
                    />
                    {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>
                </div>
                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                    </Col>
                </Row>

            </div>
        )


    }
}

export default LoginContainer;
