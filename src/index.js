import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Card,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Row
} from "reactstrap";
import initialTimeSlots from "./initialTimeSlots.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Header from './Header';

function App() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "inputChange":
          return { ...state, [action.fieldName]: action.fieldValue };
        case "bookTimeSlot":
          return {
            ...state,
            timeslots: state.timeslots.map(timeslot => {
              if (timeslot.id !== state.timeslotID) {
                return timeslot;
              }
              return {
                ...timeslot,
                booked: true,
                contactName: state.contactName,
                contactPhone: state.contactPhone
              };
            })
          };
        case "closeBookingModal":
          return {
            ...state,
            bookingModalStatus: "closed",
            timeslotID: null,
            contactName: "",
            contactPhone: ""
          };
        case "openBookingModal":
          const { contactName, contactPhone } = state.timeslots.find(
            ({ id }) => id === action.timeslotID
          ) || { contactName: "y", contactPhone: "u" };
          return {
            ...state,
            bookingModalStatus: "opened",
            timeslotID: action.timeslotID,
            contactName,
            contactPhone
          };
        case "closeReviewingModal":
          return {
            ...state,
            reviewingModalStatus: "closed",
            timeslotID: null,
            contactName: "",
            contactPhone: ""
          };
        default:
          return state;
      }
    },
    {
      timeslots: initialTimeSlots,
      bookingModalStatus: "closed",
      reviewingModalStatus: "closed",
      contactName: "",
      contactPhone: "",
      timeslotID: null
    }
  );
  const {
    timeslots,
    bookingModalStatus,
    contactName,
    contactPhone
  } = state;

  function onCloseBookingModal(e) {
    dispatch({ type: "closeBookingModal" });
  }

  function onOpenBookingModal(e) {
    const timeslotID = parseInt(e.target.getAttribute("data-timeslot-id"), 10);
    dispatch({ type: "openBookingModal", timeslotID });
  }

  function onFormFieldChange(e) {
    dispatch({
      type: "inputChange",
      fieldName: e.target.name,
      fieldValue: e.target.value
    });
  }

  function onBookTimeSlot(e) {
    e.preventDefault();
    if (contactName === "" || contactPhone === "") {
      return;
    }
    dispatch({ type: "bookTimeSlot" });
    dispatch({ type: "closeBookingModal" });
  }

  return (
    <>
    <Header />
      <Container className="App">
        <Row>
          {timeslots.map(({ id, startTime, endTime, booked }) => {
            if (!booked) {
              return (
                <Col sm={{ size: 8, offset: 2 }} key={id}>
                  <Card body key={id}>
                    <CardTitle tag="h5">{`${startTime} - ${endTime}`}</CardTitle>
                    <Button
                      color="primary"
                      onClick={onOpenBookingModal}
                      data-timeslot-id={id}
                    >
                      Book This Time Slot
                    </Button>
                  </Card>
                </Col>
              );
            }
            return (
              <Col sm={{ size: 8, offset: 2 }} key={id}>
                <Card body key={id} color="danger" outline>
                  <CardTitle tag="h5">{`${startTime} - ${endTime}`}</CardTitle>
                  <Button
                    color="danger"
                    onClick={onOpenBookingModal}
                    data-timeslot-id={id}
                  >
                    Update This Time Slot
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>

        <Modal
          isOpen={bookingModalStatus === "opened"}
          toggle={onCloseBookingModal}
          className="bookingModal"
        >
          <ModalHeader toggle={onCloseBookingModal}>
            Slot Booking Information
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={onBookTimeSlot}>
              <FormGroup>
                <Label for="contactName">Your Name</Label>
                <Input
                  type="text"
                  name="contactName"
                  id="contactName"
                  placeholder="First and Last Name"
                  onChange={onFormFieldChange}
                  value={contactName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="contactPhone">Your Phone Number</Label>
                <Input
                  type="tel"
                  name="contactPhone"
                  id="contactPhone"
                  placeholder="1-(555)-555-5555"
                  onChange={onFormFieldChange}
                  value={contactPhone}
                />
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                className="mx-1"
                onClick={onBookTimeSlot}
              >
                Save
              </Button>
              <Button
                color="secondary"
                className="mx-1"
                onClick={onCloseBookingModal}
              >
                Cancel
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
