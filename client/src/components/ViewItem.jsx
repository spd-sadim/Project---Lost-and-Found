import Table from "react-bootstrap/Table";
import { Icon } from "@iconify/react";

export default function ViewItem() {
  return (
    <div>
        <div className=" d-flex justify-content-between w-100 mb-3">
          <h4>View Lost Items</h4>
          <button className="btn btn-dark">+ New Item</button>
        </div>
        <Table responsive bordered hover size="lg">
          <thead>
            <tr>
              <th>Item-ID</th>
              <th>Item name</th>
              <th>Category</th>
              <th>Date lost</th>
              <th>Location lost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Samsung</td>
              <td>Mobile phone</td>
              <td>2024-02-22</td>
              <td>Barcelona, Spain</td>
              <td>
                <button className="btn btn-secondary">Reported</button>
              </td>
              <td className="d-flex gap-2">
                <Icon icon="lets-icons:view-alt" />
                <Icon icon="tabler:edit" />
                <Icon icon="fluent:delete-24-regular" />
              </td>
            </tr>
          </tbody>
        </Table>
    </div>
  );
}
