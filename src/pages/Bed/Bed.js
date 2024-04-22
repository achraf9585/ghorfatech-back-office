import React, { useEffect, useState } from "react";
import { Card, CardBody, FormGroup, Button, Container } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Footer from "../../components/VerticalLayout/Footer";
import Header from "../../components/VerticalLayout/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FetchBeds, UpdateBed } from "../../apis/Bed";

const Bed = () => {
  const [updateData, setUpdateData] = useState({
    itemName: "",
    otherItemName: "",
    startValue: "",
    endValue: "",
  });
  const navigate = useNavigate();

  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Bed", link: "#" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchBeds();
        console.log("data", data.bed);
        if (data) {
          setUpdateData({
            itemName: data.bed.itemName,
            otherItemName: data.bed.otherItemName,
            startValue: data.bed.startValue,
            endValue: data.bed.endValue,
          });
        }
      } catch (error) {
        toast.error("Failed to fetch data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { itemName, otherItemName, startValue, endValue } = updateData;

    const response = await UpdateBed(
      itemName,
      otherItemName,
      startValue,
      endValue
    );
    if (response) {
      toast.success("Bed Created Successfully");
      navigate("/bed");
    } else {
      toast.error("Bed Creation Failed");
    }
  };
  return (
    <React.Fragment>
      <Header />
      <div className="page-content">
        <Container>
          <Breadcrumbs title="Add Bed" breadcrumbItems={breadcrumbItems} />
          <Card>
            <CardBody>
              <h4 className="card-title">Add Bed</h4>
              <AvForm onValidSubmit={handleSubmit}>
                <div className="mb-3">
                  <AvField
                    name="itemName"
                    label="Bed Name"
                    placeholder="Type Something"
                    type="text"
                    errorMessage="Enter Name"
                    validate={{ required: { value: true } }}
                    value={updateData.itemName}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        itemName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <AvField
                    name="otherItemName"
                    label="Other item Name"
                    placeholder="Type Something"
                    type="text"
                    errorMessage="Enter Name"
                    validate={{ required: { value: true } }}
                    value={updateData.otherItemName}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        otherItemName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <AvField
                    name="startValue"
                    label="Start value"
                    placeholder="Type Something"
                    type="number"
                    errorMessage="Enter Start Value"
                    validate={{ required: { value: true } }}
                    value={updateData.startValue}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        startValue: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <AvField
                    name="endValue"
                    label="End Value"
                    placeholder="Type Something"
                    type="number"
                    errorMessage="Enter End Value "
                    validate={{ required: { value: true } }}
                    value={updateData.endValue}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        endValue: e.target.value,
                      })
                    }
                  />
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

export default Bed;
