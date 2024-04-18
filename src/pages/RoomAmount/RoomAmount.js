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
  DeleteRoomAmount,
  FetchRoomAmounts,
  UpdateRoomAmount,
} from "../../apis/RoomAmount";

const RoomAmount = () => {
  const [roomAmounts, setRoomAmounts] = useState([]);
  const [updateData, setUpdateData] = useState({
    roomTypeId: "",
    itemName: "",
    isChecked: true,
  });
  const [deleteData, setDeleteData] = useState({
    roomAmountId: "",
  });
  const [modal_standard, setModal_standard] = useState(false);
  const [modal_static, setModal_static] = useState(false);

  const tog_standard = () => setModal_standard(!modal_standard);
  const tog_static = () => setModal_static(!modal_static);
  const navigate = useNavigate();
  const fetchRoomAmounts = async () => {
    const response = await FetchRoomAmounts();
    setRoomAmounts(response.roomAmounts);
  };
  useEffect(() => {
    fetchRoomAmounts();
  }, []);

  const handleUpdate = async () => {
    const { roomAmountId, itemName, isChecked } = updateData;
    const updatedRoomType = await UpdateRoomAmount(
      roomAmountId,
      itemName,
      isChecked
    );
    console.log(updatedRoomType);
    if (updatedRoomType) {
      toast.success("Building size Updated Successfully");
      navigate("/building-size");
      setModal_standard(false);
      fetchRoomAmounts();
      navigate("/building-size");
    } else {
      toast.error("building size Update Failed");
    }
  };

  const handleDelete = async () => {
    const { roomAmountId } = deleteData;

    const response = await DeleteRoomAmount(roomAmountId);

    if (response) {
      toast.success("building size Deleted Successfully");
      setModal_static(false);
      fetchRoomAmounts();
      navigate("/building-size");
    } else {
      toast.error("building size Deletion Failed");
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

  const handleEditClick = (roomAmount) => {
    setUpdateData({
      roomAmountId: roomAmount._id, // Assuming 'id' is the field for room type ID
      itemName: roomAmount.itemName,
      isChecked: roomAmount.status,
    });
    tog_standard(); // Open the modal
  };

  const handleDeleteClick = (roomAmount) => {
    setDeleteData({
      roomAmountId: roomAmount._id,
    });
    tog_static(); // Open the modal
  };
  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Building Size", link: "#" },
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
                  onClick={() => navigate("/building-size/add")}
                >
                  Add Building size
                </Button>
              </div>
              <TableContainer
                columns={columns || []}
                data={roomAmounts || []}
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
                    label="Building size Name"
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
              <p>Are you sure you want to delete this building size?</p>
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

export default RoomAmount;
