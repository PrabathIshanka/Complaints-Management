import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import Form, {
  Item,
  GroupItem,
  RequiredRule,
  EmailRule,
  Label,
  PatternRule,
  EmptyItem,
} from "devextreme-react/form";
import { Button, Navbar, Nav } from "react-bootstrap";
import List from "./ComplainOEnquiryList";
import { TreeList, Editing, Column, Lookup } from "devextreme-react/tree-list";
import { Switch, Route } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import notify from "devextreme/ui/notify";
import { SelectBox, TagBox } from "devextreme-react";
import { LoadPanel } from "devextreme-react/load-panel";
import { connect } from "react-redux";
import FileUploader from "devextreme-react/file-uploader";
import RangeSelector, {
  Margin,
  Background,
  Image,
  Indent,
  SliderMarker,
  Scale,
  TickInterval,
  MinorTickInterval,
} from "devextreme-react/range-selector";

export class ComplainOEnquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      File: null,
      FileName: null,
      base64Image: null,
      base64ImageInvestigate: null,

      ComplainID: 0,
      jComplain: { status: 0 },
      jCrimeType: [],
      jBranch: [],
      jAuthorization: [],

      jComplainList: [],
      SelectID: 0,

      ListViewing: false,
      DataLoading: false,
      PasswordChange: false,
      DocReadOnly: false,

      ItemEnable: true,
    };

    this.Status = [
      { ID: 0, Name: "Reviewing" },
      { ID: 1, Name: "Assign To Officer" },
      { ID: 2, Name: "Investigating" },
      { ID: 3, Name: "Complete" },
      { ID: 4, Name: "Closed" },
    ];
    this.Institute = [
      { ID: 0, Name: "Wildlife conservations" },
      { ID: 1, Name: "Forest conservations" },
    ];

    this.onLoadPanelHiding = this.onLoadPanelHiding.bind(this);
    this.FormRef = React.createRef();
  }

  get FormLayout() {
    return this.FormRef.current.instance;
  }

  componentDidMount = (e) => {
    let auth;

    axios
      .all([
        axios.get("http://20.201.121.161:4478/api/Branch", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }),
        axios.get("http://20.201.121.161:4478/api/CrimeType", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }),
      ])
      .then(
        axios.spread((Branch, CrimeType) => {
          this.setState(
            {
              jBranch: Branch.data,
              jCrimeType: CrimeType.data,
            },
            () => console.log("jRoles", this.state.jRoles)
          );
        })
      )
      .catch((error) => console.log(error));
  };

  onLoadPanelHiding = (message, type) => {
    this.setState({
      LoadPanelVisible: false,
    });

    this.OnNotification(message, type);
  };

  OnNotification = (message, type) => {
    notify({
      message: message,
      type: type,
      displayTime: 3000,
      position: { at: "top right", offset: "50" },
    });
  };

  OnClickEvent = () => {};

  OnSaveValidation = async () => {
    if (!this.FormLayout.validate().isValid) {
      this.OnNotification("Fields marked with * are required", "error");
      return false;
    }
    return true;
  };

  SaveData = async (e) => {
    if (await this.OnSaveValidation()) {
      Swal.fire({
        type: "info",
        showCancelButton: true,
        text: "Do you want to complain ?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((res) => {
        if (res.value) {
          this.setState({ LoadPanelVisible: true });
          console.log({
            userId: localStorage.getItem("user"),
            crimeTypeId: this.state.jComplain.crimeTypeId,
            inquiryEntry: this.state.jComplain.inquiryEntry,
          });
          this.serverRequest = axios
            .post(
              "http://20.201.121.161:4478/api/Inquiry",
              {
                userId: localStorage.getItem("user"),
                crimeTypeId: this.state.jComplain.crimeTypeId,
                inquiryEntry: this.state.jComplain.inquiryEntry,
                branchId: this.state.jComplain.branchId,
                userAttachment: this.state.base64Image,
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              this.onLoadPanelHiding(response.data.id, "success");
              this.OnClearForm();
            })
            .catch((error) => {
              this.onLoadPanelHiding("Something went wrong", "error");
              console.log(error);
            });
        } else if (res.dismiss == "cancel") {
          //console.log("cancel");
        } else if (res.dismiss == "esc") {
          //console.log("cancle");
        }
      });
    }
  };

  OnClearForm = () => {
    console.log(this.state.jComplain.image);

    this.setState({
      File: null,
      FileName: null,
      base64Image: null,
      base64ImageInvestigate: null,

      ComplainID: 0,
      jComplain: { status: 0 },
      jAuthorization: [],

      jComplainList: [],

      ListViewing: false,
      DataLoading: false,
      PasswordChange: false,
      DocReadOnly: false,
      ItemEnable: true,
    });
  };

  OnListClickEvent = (SelectID) => {
    this.setState({ ListViewing: !this.state.ListViewing }, () => {
      if (this.state.ListViewing) {
        //Open
        this.serverRequest = axios
          .get(
            "http://20.201.121.161:4478/api/Inquiry/GetAllByUser/" +
              localStorage.getItem("user"),
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            this.setState({ jComplainList: res.data });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (!this.state.ListViewing && SelectID != 0) {
        console.log("TEST SELECTED ID", SelectID);
        //Close
        this.setState({ ComplainID: SelectID, ItemEnable: false }, () =>
          this.OnLoadData()
        );
      }
    });
  };

  onValueChanged = (e) => {
    console.log(e);
    this.setState({ File: e.value[0] });

    if (this.state.File) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ base64Image: reader.result });
        const base64Image = reader.result;
        console.log(base64Image);
      };

      reader.readAsDataURL(this.state.File);
    }
  };

  OnLoadData() {
    console.log(this.state.ComplainID, this.state.ComplainID != 0);
    axios
      .all([
        axios.get(
          "http://20.201.121.161:4478/api/Inquiry/" + this.state.ComplainID,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        ),
      ])
      .then(
        axios.spread((Complain) => {
          console.log(Complain.data);
          this.setState({ DataLoading: true }, () =>
            this.setState(
              {
                jComplain: Complain.data,
                base64Image: Complain.data.userAttachment,
                base64ImageInvestigate: Complain.data.investigatingAttachment,
                ItemEnable: false,
              },
              () => console.log("HIIIIIIII", this.state.ComplainID)
            )
          );
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <Aux>
        <Card title="Complain">
          <Form ref={this.FormRef} formData={this.state.jComplain}>
            <GroupItem caption="Complain Information" colCount={2}>
              <Item
                dataField="ticketId"
                editorOptions={{
                  maxLength: 4000,
                }}
                disabled={true}
              >
                <Label text="Ticket"></Label>
              </Item>
              <Item
                disabled={this.state.ComplainID != 0}
                dataField="crimeTypeId"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.state.jCrimeType,
                  searchEnabled: true,
                  displayExpr: "name",
                  valueExpr: "id",
                }}
                //visible={this.state.jComplain.Status>0}
                //disabled={this.state.ItemEnable}
              >
                <RequiredRule message="Field required" />
              </Item>
              <Item
                dataField="branchId"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.state.jBranch,
                  searchEnabled: true,
                  displayExpr: "name",
                  valueExpr: "id",
                }}
                disabled={this.state.ComplainID != 0}
              >
                <RequiredRule message="Field required" />
              </Item>
              <Item
                dataField="institutionId"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.Institute,
                  searchEnabled: true,
                  displayExpr: "Name",
                  valueExpr: "ID",
                }}
                disabled={this.state.ComplainID != 0}
              >
                <RequiredRule message="Field required" />
              </Item>
              <Item
                dataField="inquiryEntry"
                editorOptions={{
                  maxLength: 4000,
                }}
                disabled={this.state.ComplainID != 0}
              >
                <RequiredRule message="Field required" />
                <Label text="Inquiry"></Label>
              </Item>
              <Item
                dataField="status"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.Status,
                  searchEnabled: true,
                  displayExpr: "Name",
                  valueExpr: "ID",
                }}
                //visible={this.state.ComplainID!=0}
                disabled={true}
              >
                <RequiredRule message="Field required" />
              </Item>
              <Item
                dataField="reviewingResponse"
                editorOptions={{
                  maxLength: 4000,
                }}
                visible={false}
              >
                <Label text="Reviewing Response"></Label>
              </Item>
              <Item
                dataField="assignResponse"
                editorOptions={{
                  maxLength: 4000,
                }}
                visible={false}
              >
                <Label text="Assign Response"></Label>
              </Item>
              <Item
                dataField="investigatingResponse"
                editorOptions={{
                  maxLength: 4000,
                }}
                visible={false}
              >
                <Label text="Investigating Response"></Label>
              </Item>
              <Item
                dataField="completeResponse"
                editorOptions={{
                  maxLength: 4000,
                }}
                visible={false}
              >
                <Label text="Complete Response"></Label>
              </Item>
              <Item
                dataField="userComment"
                editorOptions={{
                  maxLength: 4000,
                }}
                visible={false}
              >
                <Label text="User Comment"></Label>
              </Item>
              <Item disabled={this.state.ComplainID != 0}>
                <FileUploader
                  selectButtonText="Select File"
                  labelText=""
                  accept="application/x-rpt"
                  allowedFileExtensions={[".jpg", ".jpeg", ".gif", ".png"]}
                  uploadMode="useForm"
                  allowCanceling={true}
                  onValueChanged={this.onValueChanged}
                />
                <img
                  src={this.state.base64Image}
                  alt=""
                  width="200px"
                  height="200px"
                />
                <Label text="User Attachment"></Label>
              </Item>
              <Item disabled={true} visible={false}>
                <FileUploader
                  selectButtonText="Select File"
                  labelText=""
                  accept="application/x-rpt"
                  allowedFileExtensions={[".jpg", ".jpeg", ".gif", ".png"]}
                  uploadMode="useForm"
                  allowCanceling={true}
                  onValueChanged={this.onValueChanged}
                />
                <img
                  src={this.state.base64ImageInvestigate}
                  alt=""
                  width="200px"
                  height="200px"
                />
                <Label text="Investigating Attachment"></Label>
              </Item>
            </GroupItem>
          </Form>
        </Card>

        <Navbar bg="light" variant="light">
          <Button
            variant="secondary"
            onClick={this.SaveData}
            disabled={this.state.ComplainID != 0}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={this.OnClearForm}>
            Clear
          </Button>
          <Button variant="secondary" onClick={this.OnListClickEvent}>
            View List
          </Button>
        </Navbar>
        <LoadPanel
          message="Processing.... Please, wait..."
          shadingColor="rgba(0,0,0,0.4)"
          onHiding={this.onLoadPanelHiding}
          visible={this.state.LoadPanelVisible}
          showIndicator={true}
          shading={true}
          showPane={true}
          closeOnOutsideClick={false}
          width={500}
        />

        <List
          Show={this.state.ListViewing}
          OnHide={this.OnListClickEvent}
          ComplainInquiryList={this.state.jComplainList}
        ></List>
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

export default connect(mapStateToProps)(ComplainOEnquiry);
