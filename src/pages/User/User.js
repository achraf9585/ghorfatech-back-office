import React, { useMemo, useEffect, useState } from "react";
import TableContainer from "../../components/Common/TableContainer";
import { useNavigate } from "react-router-dom";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Container } from "reactstrap";
import Footer from "../../components/VerticalLayout/Footer";
import Header from "../../components/VerticalLayout/index";

import { Button } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { FetchUsers } from "../../apis/User";

const User = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    const response = await FetchUsers();
    setUsers(response.users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },

      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },

      {
        Header: "Birthday",
        accessor: "birthday",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },

      {
        Header: "Type",
        accessor: "type",
      },

      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (value ? "Permit" : "Prohibit"),
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
    ],
    []
  );

  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Users", link: "#" },
  ];

  return (
    <React.Fragment>
      <Header />
      <div className="page-content">
        <Container>
          <Breadcrumbs title="DATA TABLES" breadcrumbItems={breadcrumbItems} />
          <Card style={{ marginLeft: "150px" }}>
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
                  onClick={() => navigate("/space/add")}
                >
                  Add space
                </Button>
              </div>
              <TableContainer
                columns={columns || []}
                data={users || []}
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

export default User;
