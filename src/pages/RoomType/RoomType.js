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
import {
  DeleteRoomType,
  FetchRoomTypes,
  UpdateRoomType,
} from "../../apis/RoomType";
import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { AvField, AvForm } from "availity-reactstrap-validation";

const RoomType = () => {
  const [roomtypes, setRoomTypes] = useState([]);
  const [updateData, setUpdateData] = useState({
    roomTypeId: "",
    itemName: "",
    description: "",
    isChecked: true,
  });
  const [deleteData, setDeleteData] = useState({
    roomTypeId: "",
  });
  const [modal_standard, setModal_standard] = useState(false);
  const [modal_static, setModal_static] = useState(false);

  const tog_standard = () => setModal_standard(!modal_standard);
  const tog_static = () => setModal_static(!modal_static);
  const navigate = useNavigate();
  const fetchRoomTypes = async () => {
    const response = await FetchRoomTypes();
    setRoomTypes(response.roomTypes);
  };
  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const handleUpdate = async () => {
    const { roomTypeId, itemName, description, isChecked } = updateData;
    const updatedRoomType = await UpdateRoomType(
      roomTypeId,
      itemName,
      description,
      isChecked
    );
    console.log(updatedRoomType);
    if (updatedRoomType) {
      toast.success("Room Type Updated Successfully");
      navigate("/room-type");
      setModal_standard(false);
      fetchRoomTypes();
      navigate("/room-type");
    } else {
      toast.error("Room Type Update Failed");
    }
  };

  const handleDelete = async () => {
    const { roomTypeId } = deleteData;

    const response = await DeleteRoomType(roomTypeId);

    if (response) {
      toast.success("Room Type Deleted Successfully");
      setModal_static(false);
      fetchRoomTypes();
      navigate("/room-type");
    } else {
      toast.error("Room Type Deletion Failed");
    }
  };

  useEffect(() => {
    console.log("hi");
    console.log(updateData);
  }, [updateData]);

  const columns = useMemo(
    () => [
      {
        Header: "Item Name",
        accessor: "itemName",
      },
      {
        Header: "Description ",
        accessor: "description",
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

  const handleEditClick = (roomType) => {
    setUpdateData({
      roomTypeId: roomType._id, // Assuming 'id' is the field for room type ID
      itemName: roomType.itemName,
      description: roomType.description,
      isChecked: roomType.status,
    });
    tog_standard(); // Open the modal
  };

  const handleDeleteClick = (roomType) => {
    setDeleteData({
      roomTypeId: roomType._id,
    });
    tog_static(); // Open the modal
  };
  const breadcrumbItems = [
    { title: "Tables", link: "/" },
    { title: "Data Tables", link: "#" },
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
                  onClick={() => navigate("/room-type/add")}
                >
                  Add room type
                </Button>
              </div>
              <TableContainer
                columns={columns || []}
                data={roomtypes || []}
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
                    label="Room Type Name"
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
                <div className="mb-3">
                  <AvField
                    name="description"
                    label="Room Type Description"
                    placeholder="Type Something"
                    type="text"
                    errorMessage="Enter Name"
                    value={updateData.description}
                    validate={{ required: { value: true } }}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        description: e.target.value,
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
              <p>Are you sure you want to delete this room type?</p>
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

export default RoomType;
