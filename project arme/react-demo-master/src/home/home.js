import React from 'react';

import BackgroundImg from '../commons/images/armeBG.jpg';

import {Button, Container, Jumbotron} from 'reactstrap';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };

class Home extends React.Component {


    render() {

        return (

            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-3" style={textStyle}>The "Killer's" Shop</h1>
                        <p className="lead" style={textStyle}> <b>Acest site este destinat vanzarii de arme de foc</b> </p>
                        <hr className="my-2"/>
                        <p  style={textStyle}> <b>Interzis persoanelor sub 18 ani </b> </p>
                        <p className="lead">
                            <Button color="primary" onClick={() => window.location.href="/login"}>Log in</Button>
                        </p>

                    </Container>
                </Jumbotron>

            </div>
        )
    };
}

export default Home
