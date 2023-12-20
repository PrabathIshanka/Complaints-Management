import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import Card from "../../App/components/MainCard";
import Form, {
  Item,
  GroupItem,
  RequiredRule,
  Label,
  PatternRule,
  EmptyItem,
  EmailRule,
} from "devextreme-react/form";

import { Button, Navbar, Nav } from "react-bootstrap";
import List from "./EmployeeList";
import { TreeList, Editing, Column, Lookup } from "devextreme-react/tree-list";
import { Switch, Route } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import notify from "devextreme/ui/notify";
import { SelectBox, TagBox } from "devextreme-react";
import { LoadPanel } from "devextreme-react/load-panel";
import { connect } from "react-redux";

export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmployeeID: 0,
      jEmployee: { Status: "Active" },
      jRoles:[],
      jAuthorization: [],

      jEmployeeList: [],

      ListViewing: false,
      DataLoading: false,
      PasswordChange: false,
      IsCashier: false,
      DocReadOnly: false,
    };


    this.Status = [
      { ID: "Active", Name: "Active" },
      { ID: "Inactive", Name: "Inactive" },
    ];

    this.Gender = [
      { ID: "Male", Name: "Male" },
      { ID: "Female", Name: "Female" },
    ];

    this.onLoadPanelHiding = this.onLoadPanelHiding.bind(this);
    this.FormRef = React.createRef();
  }

  get FormLayout() {
    return this.FormRef.current.instance;
  }

  componentDidMount = (e) => {
    let auth;
    // if (this.props.data.userWiseAuthorization.length != 0) {
    //   auth ={};
    //    /* this.props.data.userWiseAuthorization.find(
    //       (item) => item.MenuID === 9001
    //     ).Auth === 1;*/
    // };
    
    axios
      .all([
         axios.get("http://20.201.121.161:4478/api/Role",{headers:{Authorization : ("Bearer "+localStorage.getItem("token"))}}),
        // axios.get("/api/user-auth-tree"),
      ])
      .then(
      axios.spread((JobRoles) => { console.log("jRoles", JobRoles)
        this.setState(
          {
            jRoles: JobRoles.data,
          },
          () => console.log("jRoles", this.state.jRoles)
        );
      }))
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
     

    return true;
  };

  SaveData = async (e) => {
    if (await this.OnSaveValidation()) {
      Swal.fire({
        type: "info",
        showCancelButton: true,
        text: "Do you want to save ?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((res) => {
        if (res.value) {
          this.setState({ LoadPanelVisible: true });
          console.log({
            firstName: this.state.jEmployee.firstName,
            lastName: this.state.jEmployee.lastName,
            email: this.state.jEmployee.email,
            nic: this.state.jEmployee.nic,
            address: this.state.jEmployee.address,
            mobileNo: this.state.jEmployee.mobileNo,
            dob: this.state.jEmployee.dob,
            gender: this.state.jEmployee.gender,
            status: this.state.jEmployee.status,
            type: 0,
            roleId: this.state.jEmployee.roleId,
            branchId: 2,
            designation:this.state.jEmployee.designation ,
            changePassword: false,
          } );
          this.serverRequest = axios
            .post("http://20.201.121.161:4478/api/Employee",
              {
              firstName: this.state.jEmployee.firstName,
              lastName: this.state.jEmployee.lastName,
              email: this.state.jEmployee.email,
              nic: this.state.jEmployee.nic,
              address: this.state.jEmployee.address,
              mobileNo: JSON.stringify( this.state.jEmployee.mobileNo),
              dob: this.state.jEmployee.dob,
              gender: this.state.jEmployee.gender,
              status: this.state.jEmployee.status,
              type: 0,
              roleId: this.state.jEmployee.roleId,
              branchId: 2,
              designation:this.state.jEmployee.designation ,
              changePassword: false,
            } , 
              {headers:{Authorization : ("Bearer "+localStorage.getItem("token")),
              'Content-Type': 'application/json',}})
            .then((response) => {
              this.onLoadPanelHiding(response.data.email, "success");
              this.OnClearForm();
              //this.setState({CourseID: response.data[0].CourseID});
            })
            .catch((error) => {
              this.onLoadPanelHiding("Something went wrong", "error");
              console.log("Error",error);
            });
        } else if (res.dismiss == "cancel") {
          //console.log("cancel");
        } else if (res.dismiss == "esc") {
          //console.log("cancle");
        }
      });
    }
  };

  OnClearForm = () => {console.log("cleared");
    let auth = this.state.jAuthorization;

    //auth = auth.map((el) => (el.Auth !== 2 ? { ...el, Auth: 2 } : el));


    this.setState({
      EmployeeID: 0,
      jEmployee: { Status: "Active" },
      jRoles:[],
      jAuthorization: [],

      jEmployeeList: [],

      ListViewing: false,
      DataLoading: false,
      PasswordChange: false,
      IsCashier: false,
      DocReadOnly: false,
    });
  };

  onValueChanged = (e) => {
    this.state.SelectedSchool = [];
    const newValues = e.value;
    newValues.forEach((element) => {
      this.state.SelectedSchool.push({
        Id: element,
      });
    });
    console.log(this.state.SelectedSchool);
  };

  OnListClickEvent = (SelectID) => {
    this.setState({ ListViewing: !this.state.ListViewing }, () => {
      if (this.state.ListViewing) {
        //Open
        this.serverRequest = axios
          .get("/api/user-lookup")
          .then((res) => {
            console.log(res.data);
            this.setState({ jUserList: res.data });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (!this.state.ListViewing && SelectID != 0) {
        //Close
        this.setState({ UserID: SelectID }, () => this.OnLoadData());
      }
    });
  };

  OnLoadData() {
    axios
      .all([
        axios.get("/api/user", {
          params: { UserID: this.state.UserID },
        }),
      ])
      .then(
        axios.spread((User) => {
          console.log("User", User);
          this.setState({ DataLoading: true }, () =>
            this.setState({
              jlUserGroup: this.getUserGroup(
                JSON.parse(User.data[0].Users).GroupID
              ),
              jUser: JSON.parse(User.data[0].Users),
              jAuthorization: JSON.parse(User.data[0].UserWiseAuthontication),
              //jlCachGLAccount: JSON.parse(User.data[0].CashierAccount),
              PasswordChange: false,
              //IsCashier: JSON.parse(User.data[0].Users).Cashier,
              //jlUserGroup:JSON.parse(User.data[0].UserGroup)
            })
          );
        })
      )
      .catch((error) => console.log(error));
  }

 

  onRowUpdating = (e) => {
    if (e.newData.Auth === 9) {
      e.cancel = true;
    }
  };

  onRowUpdated = (e) => {
    let auth = this.state.jAuthorization;

    if (e.data.Type === 1) {
      auth = auth.map((el) =>
        el.RootParent === e.data.MenuID || el.ParentID === e.data.MenuID
          ? { ...el, Auth: e.data.Auth }
          : el
      );
    } else {
      let allParentCount = auth.filter(
        (item) => item.ParentID === e.data.ParentID
      );
      let typeParentCount = auth.filter(
        (item) => item.ParentID === e.data.ParentID && item.Auth === e.data.Auth
      );

      if (allParentCount.length === typeParentCount.length)
        auth = auth.map((el) =>
          el.MenuID === e.data.ParentID ? { ...el, Auth: e.data.Auth } : el
        );
      else
        auth = auth.map((el) =>
          el.MenuID === e.data.ParentID ? { ...el, Auth: 9 } : el
        );

      /////////////////////////

      let allRootCount = auth.filter(
        (item) => item.RootParent === e.data.RootParent
      );
      let typeRootCount = auth.filter(
        (item) =>
          item.RootParent === e.data.RootParent && item.Auth === e.data.Auth
      );

      if (allRootCount.length === typeRootCount.length)
        auth = auth.map((el) =>
          el.MenuID === e.data.RootParent ? { ...el, Auth: e.data.Auth } : el
        );
      else    
        auth = auth.map((el) =>
          el.MenuID === e.data.RootParent ? { ...el, Auth: 9 } : el
        );
    }

    this.setState({ jAuthorization: auth });
  };

  render() {
    return (
      <Aux>
        <Card title="Employee">
          <Form ref={this.FormRef} formData={this.state.jEmployee}>
            <GroupItem caption="Employee Information" colCount={2}>
              <Item
                dataField="firstName"
                editorOptions={{
                  maxLength: 50,
                  readOnly: this.state.EmployeeID != 0,
                }}
              >
                <RequiredRule message="Field required" />
                <Label text="First Name"></Label>
              </Item>
              <Item
                dataField="lastName"
                editorOptions={{
                  maxLength: 50,
                }}
              >
                <RequiredRule message="Field required" />
              </Item>
              <Item
                dataField="email"
                editorOptions={{
                  maxLength: 50,
                }}
              >
                <RequiredRule message="Field required" />
                <EmailRule message="Email is invalid" />
              </Item>
              <Item
                dataField="nic"
                editorOptions={{
                  maxLength: 12,
                  minLength: 10,
                }}
              >
                <RequiredRule message="Field required" />
              </Item>
              <Item
                dataField="address"
                editorOptions={{
                  maxLength: 100,
                }}
              >
                <RequiredRule message="Field required" />
              </Item>
              <Item
                dataField="mobileNo"
                editorType="dxNumberBox"
                editorOptions={{
                  maxLength: 12,
                }}
              >
                <RequiredRule message="Field required" />
              </Item>
              <Item dataField="dob" editorType="dxDateBox">
                <Label text="Birthday" />

                <RequiredRule message="Field required" />
              </Item>
              <Item
                dataField="gender"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.Gender,
                  searchEnabled: true,
                  displayExpr: "Name",
                  valueExpr: "ID",
                }}
              >
                <RequiredRule message="Field required" />
              </Item>
              <Item
                dataField="roleId"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.state.jRoles,
                  searchEnabled: true,
                  displayExpr: "name",
                  valueExpr: "id",
                }}
              >
              <Label text="Job Role" />
                <RequiredRule message="Field required" />
              </Item>

              <Item
                dataField="branchId"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.state.jRoles,
                  searchEnabled: true,
                  displayExpr: "name",
                  valueExpr: "id",
                }}
              >
              <Label text="Instititution" />
                <RequiredRule message="Field required" />
              </Item>

              
              <Item
                dataField="designation"
                editorOptions={{
                  maxLength: 100,
                }}
              >
                <RequiredRule message="Field required" />
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
              >
                <RequiredRule message="Field required" />
              </Item>
            </GroupItem>
          </Form>
        </Card>


        <Navbar bg="light" variant="light">
          <Button
            variant="secondary"
            onClick={this.SaveData}
            disabled={this.state.DocReadOnly} //
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
          UserList={this.state.jEmployeeList}
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

export default connect(mapStateToProps)(Employee);

//export default Users;
