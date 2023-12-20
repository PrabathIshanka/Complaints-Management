import Form, { Item } from "devextreme-react/form";
import React, { Component } from "react";
import Card from "../../App/components/MainCard";
import FileUploader from "devextreme-react/file-uploader";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Lookup,
} from "devextreme-react/data-grid";

export class SalesPerson extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Card title="Sales Person">
          <DataGrid
            id="customer"
            keyExpr="ID"
            allowColumnReordering={true}
            showBorders={true}
          >
            <Paging enabled={true} />
            <Editing
              mode="row"
              allowUpdating={true}
              allowDeleting={true}
              allowAdding={true}
            />

            <Column dataField="SalesPersonCode" />
            <Column dataField="SalesPersonName" />
          </DataGrid>
        </Card>
      </div>
    );
  }
}

export default SalesPerson;
