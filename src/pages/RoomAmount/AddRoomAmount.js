import React, { useState } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Footer from "../../components/VerticalLayout/Footer";
import Header from "../../components/VerticalLayout/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { CreateRoomAmount } from "../../apis/RoomAmount";

const AddRoomAmount = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [roomAmountName, setRoomAmountName] = useState("");
  const navigate = useNavigate();

  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Building size", link: "#" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await CreateRoomAmount(roomAmountName, isChecked);
    if (response) {
      toast.success("Building size Created Successfully");
      navigate("/building-size");
    } else {
      toast.error("Building Size Creation Failed");
    }
  };
  return (
    <React.Fragment>
      <Header />
      <div className="page-content">
        <Container>
          <Breadcrumbs
            title="Building size Type"
            breadcrumbItems={breadcrumbItems}
          />
          <Card>
            <CardBody>
              <h4 className="card-title">Add Building size</h4>
              <AvForm onValidSubmit={handleSubmit}>
                <div className="mb-3">
                  <AvField
                    name="itemName"
                    label="Building size Name"
                    placeholder="Type Something"
                    type="text"
                    errorMessage="Enter Name"
                    validate={{ required: { value: true } }}
                    onChange={(e) => setRoomAmountName(e.target.value)}
                  />
                </div>

                <div className="form-check form-switch mb-3" dir="ltr">
                  <h4 className="card-title">Status</h4>

                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)} // Toggle the state on change
                    id="customSwitch1"
                    defaultChecked
                  />

                  <Label
                    className="form-check-label"
                    htmlFor="customSwitch1"
                    onClick={(e) => {
                      this.setState({ toggleSwitch: !this.state.toggleSwitch });
                    }}
                  >
                    {isChecked ? "Active" : "Inactive"}
                  </Label>
                </div>

                <FormGroup className="mb-0">
                  <div>
                    <Button type="submit" color="primary" className="me-1">
                      Add
                    </Button>{" "}
                    <Button type="reset" color="secondary">
                      Cancel
                    </Button>
                  </div>
                </FormGroup>
              </AvForm>
            </CardBody>
          </Card>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AddRoomAmount;
