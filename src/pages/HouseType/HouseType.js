import React, { useMemo, useEffect, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";
import { useNavigate } from "react-router-dom";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  Card,
  CardBody,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Footer from "../../components/VerticalLayout/Footer";
import Header from "../../components/VerticalLayout/index";

import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { AvField, AvForm } from "availity-reactstrap-validation";
import {
  DeleteHouseType,
  FetchHouseTypes,
  UpdateHouseType,
} from "../../apis/HouseType";

const HouseType = () => {
  const [houseTypes, setHouseTypes] = useState([]);
  const [updateData, setUpdateData] = useState({
    houseTypeId: "",
    itemName: "",

    isChecked: true,
  });
  const [deleteData, setDeleteData] = useState({
    houseTypeId: "",
  });
  const [modal_standard, setModal_standard] = useState(false);
  const [modal_static, setModal_static] = useState(false);

  const tog_standard = () => setModal_standard(!modal_standard);
  const tog_static = () => setModal_static(!modal_static);
  const navigate = useNavigate();

  const fetchHouseTypes = async () => {
    const response = await FetchHouseTypes(); // Assuming FetchHouseTypes is the correct function from your API
    setHouseTypes(response.houseTypes);
  };
  useEffect(() => {
    fetchHouseTypes();
  }, []);

  const handleUpdate = async () => {
    const { houseTypeId, itemName, isChecked } = updateData;
    const updatedHouseType = await UpdateHouseType(
      houseTypeId,
      itemName,
      isChecked
    );
    if (updatedHouseType) {
      toast.success("House Type Updated Successfully");
      navigate("/house-type");
      setModal_standard(false);
      fetchHouseTypes();
      navigate("/house-type");
    } else {
      toast.error("House Type Update Failed");
    }
  };

  const handleDelete = async () => {
    const { houseTypeId } = deleteData;

    const response = await DeleteHouseType(houseTypeId);

    if (response) {
      toast.success("House Type Deleted Successfully");
      setModal_static(false);
      fetchHouseTypes();
      navigate("/house-type");
    } else {
      toast.error("House Type Deletion Failed");
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Item Name",
        accessor: "itemName",
      },

      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (value ? "Active" : "Inactive"),
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },

      {
        Header: "Action",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Button
              color="primary"
              className="btn-icon"
              onClick={() => handleEditClick(row.original)}
            >
              <i className="mdi mdi-pencil"></i>
            </Button>
            <Button
              color="danger"
              className="btn-icon"
              onClick={() => handleDeleteClick(row.original)}
            >
              <i className="mdi mdi-delete"></i>
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const handleEditClick = (houseType) => {
    setUpdateData({
      houseTypeId: houseType._id,
      itemName: houseType.itemName,
      isChecked: houseType.status,
    });
    tog_standard(); // Open the modal
  };

  const handleDeleteClick = (houseType) => {
    setDeleteData({
      houseTypeId: houseType._id,
    });
    tog_static(); // Open the modal
  };
  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "House Type", link: "#" },
  ];

  return (
    <React.Fragment>
      <Header />
      <div className="page-content">
        <Container>
          <Breadcrumbs title="DATA TABLES" breadcrumbItems={breadcrumbItems} />
          <Card>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  color="success"
                  className="waves-effect waves-light me-1"
                  onClick={() => navigate("/house-type/add")}
                >
                  Add House type
                </Button>
              </div>
              <TableContainer
                columns={columns || []}
                data={houseTypes || []}
                isPagination={false}
                // isGlobalFilter={false}
                iscustomPageSize={false}
                isBordered={false}
                customPageSize={10}
              />
            </CardBody>
          </Card>

          {/* START: Modal EDIT  */}
          <Modal isOpen={modal_standard} toggle={tog_standard}>
            <ModalHeader toggle={() => setModal_standard(false)}>
              Modal Heading
            </ModalHeader>
            <ModalBody>
              <AvForm onValidSubmit={handleUpdate}>
                <div className="mb-3">
                  <AvField
                    name="itemName"
                    label="House Type Name"
                    placeholder="Type Something"
                    type="text"
                    errorMessage="Enter Name"
                    value={updateData.itemName}
                    validate={{ required: { value: true } }}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        itemName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-check form-switch mb-3" dir="ltr">
                  <h4 className="card-title">Status</h4>

                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={updateData.isChecked}
                    onChange={() =>
                      setUpdateData({
                        ...updateData,
                        isChecked: !updateData.isChecked,
                      })
                    }
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
                    {updateData.isChecked ? "Active" : "Inactive"}
                  </Label>
                </div>
              </AvForm>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                onClick={tog_standard}
                color="light"
                className="waves-effect"
              >
                Close
              </Button>
              <Button
                type="button"
                onClick={handleUpdate}
                color="primary"
                className="waves-effect waves-light"
              >
                Save Changes
              </Button>
            </ModalFooter>
          </Modal>
          {/* END: Modal EDIT  */}

          {/* START: Modal DELETE */}

          <Modal isOpen={modal_static} toggle={tog_static} backdrop="static">
            <ModalHeader toggle={() => setModal_static(false)}>
              Static Backdrop
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete this House type?</p>
              <ModalFooter>
                <Button type="button" color="light" onClick={tog_static}>
                  Close
                </Button>
                <Button type="button" color="primary" onClick={handleDelete}>
                  Save
                </Button>
              </ModalFooter>
            </ModalBody>
          </Modal>
          {/* END: Modal DELETE */}
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default HouseType;
