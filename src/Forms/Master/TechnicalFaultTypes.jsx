import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import DataGrid, {
  Column,
  Editing,
  SearchPanel,
  RequiredRule,
  Popup,
  Lookup,
} from "devextreme-react/data-grid";
import Card from "../../App/components/MainCard";
import axios from "axios";
import { confirm } from "devextreme/ui/dialog";
import { connect } from "react-redux";
import notify from "devextreme/ui/notify";

export class TechnicalFaultType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jDefectTypes: [],
      DocReadOnly: false,
    };

    this.Status = [
      { ID: 1, Name: "Active" },
      { ID: 0, Name: "Inactive" },
    ];

    this.ValidationCheck = false;

    this.onRowInserted = this.onRowInserted.bind(this);
    this.onRowUpdated = this.onRowUpdated.bind(this);
    this.onRowRemoved = this.onRowRemoved.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/sub-master/list-defect-types")
      .then((res) => {
        this.setState({ jDefectTypes: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onRowInserted(e) {
    this.serverRequest = axios
      .post("/api/sub-master/add-defect-types", e.data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onRowUpdated(e) {
    this.serverRequest = axios
      .put("/api/sub-master/update-defect-types", e.data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onRowRemoved(e) {
    this.serverRequest = axios
      .delete(`/api/sub-master/remove-defect-types/${e.data.AutoID}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onIDValidation = (e) => {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/sub-master/defect-type-exist", {
          params: {
            AutoID: e.newData.AutoID ? e.newData.AutoID : 0,
            Code: e.newData.MSCode,
            Name: e.newData.MSName,
          },
        })
        .then((res) => {
          resolve(res.data[0].Exist === 1);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  onRowValidating = async (e) => {
    if (e.isValid) {
      if (this.ValidationCheck) {
        e.isValid = true;
        this.ValidationCheck = false;
        return;
      } else e.isValid = false;

      if (await this.onIDValidation(e)) {
        e.isValid = false;
        this.OnNotification("Code or Name already exists", "error");
        return;
      }

      confirm("Want to save this record?", "Confirmation").done(
        (dialogResult) => {
          if (dialogResult) {
            this.ValidationCheck = true;
            e.component.saveEditData();
          } else {
            e.component.cancelEditData();
          }
        }
      );
    }
  };

  onInitNewRow(e) {
    e.data.Status = 1;
  }

  OnNotification = (message, type) => {
    notify({
      message: message,
      type: type,
      displayTime: 3000,
      position: { at: "top right", offset: "50" },
    });
  };

  render() {
    return (
      <Aux>
        <Card title="Technical Fault/Defect Types">
          <DataGrid
            id="grid-defect-types"
            keyExpr="AutoID"
            dataSource={this.state.jDefectTypes}
            allowColumnReordering={true}
            onRowInserted={this.onRowInserted}
            onRowUpdated={this.onRowUpdated}
            onRowRemoved={this.onRowRemoved}
            onRowValidating={this.onRowValidating}
            onInitNewRow={this.onInitNewRow}
            showBorders={true}
            wordWrapEnabled={true}
            allowSearch={true}
            showColumnLines={true}
            showRowLines={false}
            rowAlternationEnabled={true}
          >
            <Editing
              mode="popup"
              useIcons={true}
              allowUpdating={!this.state.DocReadOnly}
              allowDeleting={!this.state.DocReadOnly}
              allowAdding={!this.state.DocReadOnly}
            >
              <Popup
                title="Technical Fault/Defect Types"
                showTitle={true}
              ></Popup>
            </Editing>
            <SearchPanel visible={true} placeholder="Search..." />
            <Column
              dataField="DefectCode"
              editorOptions={{
                maxLength: 50,
              }}
            >
              <RequiredRule />
            </Column>
            <Column dataField="Status">
              <Lookup
                dataSource={this.Status}
                valueExpr="ID"
                displayExpr="Name"
              />
              <RequiredRule />
            </Column>
          </DataGrid>
        </Card>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.loggedReducer);
  return {
    data: state.loggedReducer,
  };
};

export default connect(mapStateToProps)(TechnicalFaultType);
