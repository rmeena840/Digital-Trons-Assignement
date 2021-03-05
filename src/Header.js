import React from "react";
import {
  Container,
  Jumbotron,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/* Header for the page */

const Header = () => {
    return (
        <>
        <Jumbotron className="text-sm-left text-md-center">
            <Container>
            <h1 className="display-4">Let's Connect! <span role="img" aria-label="Close" >📅</span></h1>
            <hr className="my-2" />
            <p className="lead">
                Tap or click on an available timeslot below to book an appointment.{" "}
            </p>
            <p>
                Time slots marked in <span className="red-text">red</span> are
                already booked.
            </p>
            </Container>
        </Jumbotron>
        </>
    )
};

export default Header;
