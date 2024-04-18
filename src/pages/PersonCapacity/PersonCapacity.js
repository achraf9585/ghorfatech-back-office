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
import { FetchPersonCapacity } from "../../apis/PersonCapacity";

const PersonCapacity = () => {
  const [personCapacities, setPersonCapacities] = useState([]);
  /*
  const [updateData, setUpdateData] = useState({
    roomTypeId: "",
    itemName: "",
    description: "",
    isChecked: true,
  });
*/
  /*
  const [deleteData, setDeleteData] = useState({
    roomTypeId: "",
  });
  const [modal_standard, setModal_standard] = useState(false);
  const [modal_static, setModal_static] = useState(false);
*/
  //const tog_standard = () => setModal_standard(!modal_standard);
  //const tog_static = () => setModal_static(!modal_static);
  const navigate = useNavigate();
  const fetchPersonCapacities = async () => {
    const response = await FetchPersonCapacity();
    setPersonCapacities(response.personCapacity);
  };
  useEffect(() => {
    fetchPersonCapacities();
  }, []);
  /*
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
      fetchPersonCapacities();
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
      fetchPersonCapacities();
      navigate("/person-capacity");
    } else {
      toast.error("Room Type Deletion Failed");
    }
  };
*/

  const columns = useMemo(
    () => [
      {
        Header: "Item Name",
        accessor: "itemName",
      },
      {
        Header: "other Item Name ",
        accessor: "otherItemName",
      },
      {
        Header: "start Value",
        accessor: "startValue",
      },
      {
        Header: "end Value ",
        accessor: "endValue",
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
              // onClick={() => handleEditClick(row.original)}
            >
              <i className="mdi mdi-pencil"></i>
            </Button>
            <Button
              color="danger"
              className="btn-icon"
              // onClick={() => handleDeleteClick(row.original)}
            >
              <i className="mdi mdi-delete"></i>
            </Button>
          </div>
        ),
      },
    ],
    []
  );

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
                data={personCapacities || []}
                isPagination={false}
                // isGlobalFilter={false}
                iscustomPageSize={false}
                isBordered={false}
                customPageSize={10}
              />
            </CardBody>
          </Card>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default PersonCapacity;
