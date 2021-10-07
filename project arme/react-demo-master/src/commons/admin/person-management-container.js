import React from 'react';
import APIResponseErrorMessage from "C:/Users/Robert/Desktop/An3 Sem1/IS/project/react-demo-master/src/commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row
} from 'reactstrap';

import * as API_USERS from "../admin/admin-api"
import PersonTable from "../../person/components/person-table";
import PersonForm from "../../person/components/person-form";




class PersonManagementContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.deletePerson=this.deletePerson.bind(this);
        this.reloadDelete=this.reloadDelete.bind(this);
        this.reload = this.reload.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchPerson();
    }

    fetchPerson() {
        return API_USERS.getPerson((result, status, err) => {
          console.log(result);
            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }


    toggleForm() {
        this.setState({selected: !this.state.selected});
    }



    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchPerson();
    }
    deletePerson(person){
        return API_USERS.deletePerson(person.id,(result, status, err) => {

            if (result !== null && status === 200) {
                this.reloadDelete();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }
    reloadDelete(){
        this.setState({
            isLoaded: false
        });
        this.fetchPerson();}
    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Person Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Person </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <PersonTable tableData = {this.state.tableData} delete={this.deletePerson}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>
                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Person: </ModalHeader>
                    <ModalBody>
                        <PersonForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}


export default PersonManagementContainer;
