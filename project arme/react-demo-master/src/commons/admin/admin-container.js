import React from 'react';

import {
    Button,
    CardHeader,
    Col,
    Row
} from 'reactstrap';


const textStyle = {
    color: 'black',
    fontSize: 30,
    fontFamily: "Cochin",
    textAlign: 'center'
};

const b1_style = {
    background: '#123456',
    color: 'white',
    margin: '0',
    position: 'absolute',
    top: '21000%',
    ms_transform: 'translateX(100%)',
    transform: 'translateX(260%)',
    width: '200px',
    height: '40px'
};

const b2_style = {
    background: '#123456',
    color: 'white',
    margin: '0',
    position: 'absolute',
    top: '25000%',
    ms_transform: 'translateX(100%)',
    transform: 'translateX(260%)',
    width: '200px',
    height: '40px'
};

const b3_style = {
    background: '#123456',
    color: 'white',
    margin: '0',
    position: 'absolute',
    top: '29000%',
    ms_transform: 'translateX(100%)',
    transform: 'translateX(260%)',
    width: '200px',
    height: '40px'
};



const imageStyle = {
    position: 'absolute',
    top: '25%',
    ms_transform: 'translateX(130%)',
    transform: 'translateX(325%)'
};
class DoctorContainer extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            errorStatus: 0,
            error: null,
            err: false,
            errorMessage: '',

            formIsValid: false,

        };


    }



    render() {
        return (
            <div>
                <CardHeader>
                    <strong> Admin </strong>
                </CardHeader>
                <div><h1  style={textStyle}>Hello Admin! What would you like to do today?</h1></div>
                <br/>
                <Row>
                    <Col sm={{size: '8', offset: 1}}>
                        <Button  style={b1_style} href="/admin/adminManage" > Admin Management</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{size: '8', offset: 1}}>
                        <Button  style={b2_style} href="/admin/armeManage" > Arme Management</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={{size: '8', offset: 1}}>
                        <Button  style={b3_style} href="/admin/personManage" > Person Management</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DoctorContainer;