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
import UtilizatorForm from "../utilizator/utilizator-form";

import * as API_USERS from "../admin/admin-api";
import UtilizatorTable from "../utilizator/utilizator-table";
import ArmeTable from "../arme/arme-validators/arme-table";
import ArmeTable2 from "../arme/arme-validators/arme-table2";



class UtilizatorContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.buyArme=this.buyArme.bind(this);
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

    buyArme(arme){
    window.alert("You just bought: "+ arme.name);
    }
    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchArme();
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Utilizator Management </strong>
                </CardHeader>
                <Card>

                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            {this.state.isLoaded && <ArmeTable2 tableData = {this.state.tableData} buy={this.buyArme}/>}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                </Card>
            </div>
        )

    }
}


export default UtilizatorContainer;
