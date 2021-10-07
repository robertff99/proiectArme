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
import ArmeTable from "../arme/arme-validators/arme-table";
import ArmeForm from "../arme/arme-validators/arme-form";

class ArmeManagementContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.deleteArme=this.deleteArme.bind(this);
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
        this.fetchArme();
    }

    fetchArme() {
        return API_USERS.getArme((result, status, err) => {

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
        this.fetchArme();
    }
    deleteArme(arme){
        return API_USERS.deleteArme(arme.id,(result, status, err) => {

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
        this.fetchArme();}
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
                            {this.state.isLoaded && <ArmeTable tableData = {this.state.tableData} delete={this.deleteArme}/>}
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


export default ArmeManagementContainer;
