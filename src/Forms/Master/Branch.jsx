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

export class Branch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jBranch: [],
            jCity:[],
            DocReadOnly: false,
        };

        this.Status = [
            { ID: 1, Name: "Active" },
            { ID: 0, Name: "Inactive" },
        ];
        this.Institute = [
            { ID: 0, Name: "Wildlife conservations" },
            { ID: 1, Name: "Forest conservations" },
        ];

        this.ValidationCheck = false;

        this.onRowInserted = this.onRowInserted.bind(this);
        this.onRowUpdated = this.onRowUpdated.bind(this);
        this.onRowRemoved = this.onRowRemoved.bind(this);
    }

    componentDidMount = (e) => {
        let auth;
        
        axios
          .all([
             axios.get("http://20.201.121.161:4478/api/Branch",{headers:{Authorization : ("Bearer "+localStorage.getItem("token"))}}),
             axios.get("http://20.201.121.161:4478/api/City",{headers:{Authorization : ("Bearer "+localStorage.getItem("token"))}}),
          ])
          .then(
          axios.spread((Branch ,City) => {
            this.setState(
              {
                jBranch: Branch.data,
                jCity : City.data,
              }
            );
          }))
          .catch((error) => console.log(error));
        
      };

    onRowInserted(e) { e.data.id=0;console.log(e.data);
       
        this.serverRequest = axios
            .post("http://20.201.121.161:4478/api/Branch",e.data,{headers:{Authorization : ("Bearer "+localStorage.getItem("token"))}})
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
       // e.data.Status = 1;
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
                <Card title="Branch">
                    <DataGrid
                        id="grid-defect-types"
                        keyExpr="id"
                        dataSource={this.state.jBranch}
                        allowColumnReordering={true}
                        onRowInserted={this.onRowInserted}
                        //onRowUpdated={this.onRowUpdated}
                       // onRowRemoved={this.onRowRemoved}
                       // onRowValidating={this.onRowValidating}
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
                            allowDeleting={false}
                            allowAdding={!this.state.DocReadOnly}
                        >
                            <Popup
                                title="Branch"
                                showTitle={true}
                            ></Popup>
                        </Editing>
                        <SearchPanel visible={true} placeholder="Search..." />
                        <Column
                            dataField="id"
                            editorOptions={{
                                maxLength: 50,
                            }}
                        >
                        </Column>
                        <Column
                            dataField="name"
                            editorOptions={{
                                maxLength: 50,
                            }}
                        >
                            <RequiredRule />
                        </Column>
                        <Column
                            dataField="address"
                            editorOptions={{
                                maxLength: 50,
                            }}
                        >
                            <RequiredRule />
                        </Column>
                        <Column
                            dataField="phoneNumber"
                            editorOptions={{
                                maxLength: 50,
                            }}
                        >
                            <RequiredRule />
                        </Column>
                        <Column
                            dataField="emailAddress"
                            editorOptions={{
                                maxLength: 50,
                            }}
                        >
                            <RequiredRule />
                        </Column>
                        <Column dataField="cityId">
                            <Lookup
                                dataSource={this.state.jCity}
                                valueExpr="id"
                                displayExpr="name"
                            />
                            <RequiredRule />
                        </Column>
                        <Column dataField="institutionId">
                            <Lookup
                                dataSource={this.Institute}
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

export default connect(mapStateToProps)(Branch);