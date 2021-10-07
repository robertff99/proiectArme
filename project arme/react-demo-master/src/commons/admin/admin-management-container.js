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
import AdminForm from "C:/Users/Robert/Desktop/An3 Sem1/IS/project/react-demo-master/src/commons/admin/admin-validators/admin-form";
import * as API_USERS from "../admin/admin-api"
import AdminTable from "C:/Users/Robert/Desktop/An3 Sem1/IS/project/react-demo-master/src/commons/admin/admin-validators/admin-table";


class AdminManagementContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.deleteAdmin=this.deleteAdmin.bind(this);
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
        this.fetchAdmins();
    }

    fetchAdmins() {
        return API_USERS.getAdmins((result, status, err) => {

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
        this.fetchAdmins();
    }
    deleteAdmin(admin){
        return API_USERS.deleteAdmin(admin.id,(result, status, err) => {

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
        this.fetchAdmins();}
    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Admin Management </strong>
                </CardHeader>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="primary" onClick={this.toggleForm}>Add Admin </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <AdminTable tableData = {this.state.tableData} delete={this.deleteAdmin}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>
                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Admin: </ModalHeader>
                    <ModalBody>
                        <AdminForm reloadHandler={this.reload}/>
                    </ModalBody>
                </Modal>

            </div>
        )

    }
}


export default AdminManagementContainer;
