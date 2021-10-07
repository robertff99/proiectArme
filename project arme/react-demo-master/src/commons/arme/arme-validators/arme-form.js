import React from 'react';
//import validate from "./validators/arme-validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../arme-api";
import APIResponseErrorMessage from "../../errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';



class ArmeForm extends React.Component {

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
                    placeholder: 'Weapon name?...',
                    valid: true,
                    touched: false,

                },
                calibre: {
                    value: '',
                    placeholder: 'Calibre...',
                    valid: true,
                    touched: false,

                },
                price: {
                    value: '',
                    placeholder: 'Price...',
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

    registerArme(arme) {
        return API_USERS.postArme(arme, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted arme with id: " + result);
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
        let arme = {
            name: this.state.formControls.name.value,
            calibre: this.state.formControls.calibre.value,
            price: this.state.formControls.price.value,

        };

        console.log(arme);
        this.registerArme(arme);
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

                </FormGroup>

                <FormGroup id='calibre'>
                    <Label for='calibreField'> Calibre: </Label>
                    <Input name='calibre' id='calibreField' placeholder={this.state.formControls.calibre.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.calibre.value}
                           touched={this.state.formControls.calibre.touched? 1 : 0}
                           valid={this.state.formControls.calibre.valid}
                           required
                    />

                </FormGroup>

                <FormGroup id='price'>
                    <Label for='priceField'> Price: </Label>
                    <Input name='price' id='priceField' placeholder={this.state.formControls.price.placeholder}
                           min={0} max={100} type="number"
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.price.value}
                           touched={this.state.formControls.price.touched? 1 : 0}
                           valid={this.state.formControls.price.valid}
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

export default ArmeForm;
