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
import ArmeForm from "C:/Users/Robert/Desktop/An3 Sem1/IS/project/react-demo-master/src/commons/arme/arme-validators/arme-form";

import * as API_USERS from "C:/Users/Robert/Desktop/An3 Sem1/IS/project/react-demo-master/src/commons/arme/arme-api";
import ArmeTable from "C:/Users/Robert/Desktop/An3 Sem1/IS/project/react-demo-master/src/commons/arme/arme-validators/arme-table";



class ArmeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
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
        this.fetchArmes();
    }

    fetchArmes() {
        return API_USERS.getArmes((result, status, err) => {

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
        this.fetchArmes();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Arme Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Arme </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <ArmeTable tableData = {this.state.tableData}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Arme: </ModalHeader>
                    <ModalBody>
                        <ArmeForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}


export default ArmeContainer;
