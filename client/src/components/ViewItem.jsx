import Table from "react-bootstrap/Table";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Wrapper from "./dashboard/Wrapper";
import DeleteModal from "./modal/DeleteModal";
import { categories } from "./category";
import { Dropdown } from "react-bootstrap";
import { ExportAsExcel, ExportAsPdf } from "react-export-table";

export default function ViewItem({ type }) {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const header = [
    "item_id",
    "item_name",
    "location",
    "date",
    "additional_information",
    "category_id",
    "image_url",
    "user_id",
    "item_type",
    "item_status",
  ];
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const handleModal = (id) => {
    setDeleteId(id);
    setShow(!show);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint;
        if (user.role === "admin") {
          endpoint = `/api/${type}/`;
        } else {
          endpoint = `/api/${type}/${user.user_id}`;
        }
        const response = await axios.get(endpoint);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [type, user.user_id]);

  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/${type}/delete/${id}`);
      setItems(items.filter((item) => item.id != id));
      setShow(false);
    } catch (err) {
      console.error("Error deleting item", err);
    }
  };

  const handleDeleteItem = () => {
    if (deleteId) {
      deletePost(deleteId);
    } else {
      alert("Something went wrong");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRowClick = (id) => {
    navigate(`/${user.role}/${type}/${id}?type=${type}`);
  };

  const handleEditClick = (id) => {
    navigate(`/${user.role}/${type}/edit/${id}?type=${type}`);
  };

  const filteredItems = items
    .map((item) => {
      return {
        ...item,
        category_name: categories[item.category_id - 1], // Add category name to each item
      };
    })
    .filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  return (
    <Wrapper>
      <div className="d-flex flex-column flex-md-row justify-content-between w-100 my-3">
        <h4 className="">View {type} Items</h4>
        <div className="d-flex justify-content-between gap-2 mt-2 mt-md-0">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="d-flex">
            <Dropdown>
              <Dropdown.Toggle
                split
                variant="white"
                id="dropdown-basic"
                className="d-flex align-items-center justify-content-center"
              >
                <span className="px-2 pointer">
                  <Icon
                    icon="material-symbols:download"
                    width="25"
                    height="25"
                  />
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <ExportAsExcel
                    data={filteredItems}
                    fileName="items"
                    headers={header}
                  >
                    {(props) => <span {...props}>Export as Excel</span>}
                  </ExportAsExcel>
                </Dropdown.Item>
                <Dropdown.Item>
                  <ExportAsPdf
                    data={filteredItems}
                    fileName="itemsPdf"
                    title={"List of " + type + " posts"}
                    theme="grid"
                    styles={{ fontSize: 5 }}
                    headers={header}
                  >
                    {(props) => <span {...props}>Export as Pdf</span>}
                  </ExportAsPdf>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link to={`/${user.role}/${type}/create`}>
              <button className="btn btn-dark" as={Link} href="/">
                + New Item
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Table responsive bordered hover size="lg">
        <thead>
          <tr>
            <th>Item-ID</th>
            <th>Item image</th>
            <th>Item name</th>
            <th>Location {type}</th>
            <th>Date {type}</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleRowClick(item.id)}
                className="pointer"
              >
                <td>{item.id}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/${item.image}`}
                    style={{ width: "4em", height: "4em" }}
                    alt=""
                  />
                </td>
                <td>{item.item_name}</td>
                <td>{item.location}</td>
                <td>{item.date.split("T")[0]}</td>
                <td>{categories[item.category_id - 1]}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "claimed"
                        ? "text-bg-success"
                        : item.status === "reported"
                        ? "text-bg-secondary"
                        : "text-bg-info"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <div
                      className="text-decoration-none d-inline-flex align-items-center text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item.id);
                      }}
                    >
                      <Icon icon="tabler:edit" /> Edit
                    </div>
                    <Link
                      className="text-decoration-none d-inline-flex align-items-center text-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModal(item.id);
                      }}
                    >
                      <Icon icon="fluent:delete-24-regular" /> Delete
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">There is no data</td>
            </tr>
          )}
        </tbody>
      </Table>

      <DeleteModal
        handleModal={handleModal}
        handleDeleteItem={handleDeleteItem}
        show={show}
      />
    </Wrapper>
  );
}
