import React from 'react';
//import validate from "C:\\Users\\Robert\\Desktop\\An3 Sem1\\IS\\project\\react-demo-master\\src\\commons\\admin\\admin-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../admin-api";
import APIResponseErrorMessage from "../../errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class AdminForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: false,

            formControls: {
                name: {
                    value: '',
                    placeholder: 'What is your name?...',
                    valid: true,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                username: {
                    value: '',
                    placeholder: 'Username...',
                    valid: true,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                age: {
                    value: '',
                    placeholder: 'Age...',
                    valid: true,
                    touched: false,
                },
                address: {
                    value: '',
                    placeholder: 'Address...',
                    valid: true,
                    touched: false,
                },
                password: {
                    value: '',
                    placeholder: 'Password...',
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
        // for (let updatedFormElementName in updatedControls) {
        //     formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        // }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerAdmin(admin) {
        return API_USERS.postAdmin(admin, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted admin with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }
    registerUtilizator(utilizator) {
        return API_USERS.postUtilizator(utilizator, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted user with id: " + result);
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
        let admin = {
            name: this.state.formControls.name.value,
            address: this.state.formControls.address.value,
            age: this.state.formControls.age.value
        };
        let utilizator ={
            username: this.state.formControls.username.value,
            password: this.state.formControls.password.value,
            role:"admin"
        };

        console.log(admin);
        this.registerAdmin(admin);
        this.registerUtilizator(utilizator);
    }

    render() {
        return (
            <div>

                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>
                <FormGroup id='username'>
                    <Label for='usernameField'> Username: </Label>
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
            <Label for='passwordField'> password: </Label>
            <Input name='password' id='passwordField' placeholder={this.state.formControls.password.placeholder}
                   onChange={this.handleChange}
                   defaultValue={this.state.formControls.password.value}
                   touched={this.state.formControls.password.touched? 1 : 0}
                   valid={this.state.formControls.password.valid}
                   required
            />
            {this.state.formControls.password.touched && !this.state.formControls.password.valid &&
            <div className={"error-message row"}> * password must have at least 3 characters </div>}
        </FormGroup>
                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='age'>
                    <Label for='ageField'> Age: </Label>
                    <Input name='age' id='ageField' placeholder={this.state.formControls.age.placeholder}
                           min={0} max={100} username="number"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.age.value}
                           touched={this.state.formControls.age.touched? 1 : 0}
                           valid={this.state.formControls.age.valid}
                           required
                    />
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button username={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
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

export default AdminForm;
