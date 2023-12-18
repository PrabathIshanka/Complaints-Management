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
} from "devextreme-react/form";
import { Button, Navbar, Nav } from "react-bootstrap";
import List from "./UserList";
import { TreeList, Editing, Column, Lookup } from "devextreme-react/tree-list";
import { Switch, Route } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import notify from "devextreme/ui/notify";
import { SelectBox, TagBox } from "devextreme-react";
import { LoadPanel } from "devextreme-react/load-panel";
import { connect } from "react-redux";

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserID: 0,
      jUser: { Cashier: false, Status: 1 },
      jAuthorization: [],
      SelectedSchool: [],

      jlSchool: [],
      jlCachGLAccount: [],
      jlUserGroup: [],

      jUserList: [],

      ListViewing: false,
      DataLoading: false,
      PasswordChange: false,
      IsCashier: false,
      DocReadOnly: false,
    };

    this.Auth = [
      { ID: 0, Name: "Full Authorization" },
      { ID: 1, Name: "Read-Only" },
      { ID: 2, Name: "No Authorization" },
      { ID: 9, Name: "Various Authorization" },
    ];

    this.Status = [
      { ID: 1, Name: "Active" },
      { ID: 2, Name: "Inactive" },
    ];

    this.onLoadPanelHiding = this.onLoadPanelHiding.bind(this);
    this.FormRef = React.createRef();
  }

  get FormLayout() {
    return this.FormRef.current.instance;
  }

  componentDidMount() {


  }

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

  onDefaultSchoolChanged = (e) => {
    Promise.all([
      axios.get("/api/account-determination-lookup", {
        params: { SchoolID: e.value },
      }),
    ])
      .then(([Account]) => {
        this.setState({
          jlCachGLAccount: Account.data,
        });
      })
      .catch((error) => console.log(error));
  };

  OnClickEvent = () => { };

  OnSaveValidation = async () => {
    let matchPassword =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!this.FormLayout.validate().isValid) {
      this.OnNotification("Fields marked with * are required", "error");
      return false;
    }
    if (this.state.IsCashier) {
      if (
        this.state.jUser.CashGLAccount == "" ||
        this.state.jUser.CashGLAccount == NaN ||
        this.state.jUser.CashGLAccount == undefined
      ) {
        this.OnNotification("Cash in Hand Account is Required", "error");
        return false;
      } else if (
        this.state.jUser.ChequeGLAccount == "" ||
        this.state.jUser.ChequeGLAccount == NaN ||
        this.state.jUser.ChequeGLAccount == undefined
      ) {
        this.OnNotification("Check in hand Account is Required", "error");
        return false;
      } else if (
        this.state.jUser.BankTransfer == "" ||
        this.state.jUser.BankTransfer == NaN ||
        this.state.jUser.BankTransfer == undefined
      ) {
        this.OnNotification("Banck Transfer Account is Required", "error");
        return false;
      } else if (
        this.state.jUser.CreditCardGLAccount == "" ||
        this.state.jUser.CreditCardGLAccount == NaN ||
        this.state.jUser.CreditCardGLAccount == undefined
      ) {
        this.OnNotification("Credit card in hand Account is Required", "error");
        return false;
      }
    }
    if (this.state.jUser.PasswordChange) {
      if (
        this.state.jUser.Password == "" ||
        this.state.jUser.Password == NaN ||
        this.state.jUser.Password == undefined
      ) {
        this.OnNotification("Password is Required", "error");
        return false;
      } else if (matchPassword.test(this.state.jUser.Password) == false) {
        this.OnNotification(
          "Passwords must contain at least 8 characters, including uppercase, lowercase letters and numbers.",
          "error"
        );
        return false;
      } else if (
        this.state.jUser.Password != this.state.jUser.ConfirmPassword
      ) {
        this.OnNotification(
          "New password & Confirm password must match",
          "error"
        );
        return false;
      }
    }

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
          this.state.SelectedSchool = [];
          this.state.jUser.Schools.forEach((element) => {
            this.state.SelectedSchool.push({
              Id: element,
            });
          });
          this.serverRequest = axios
            .post("/api/user", {
              UserID: this.state.UserID,
              User: JSON.stringify(this.state.jUser),
              School: JSON.stringify(this.state.SelectedSchool),
              Authorization: JSON.stringify(this.state.jAuthorization),
              AdminUserID:
                this.props.data.user == undefined
                  ? this.props.data.data.user.Id
                  : this.props.data.user.Id,
            })
            .then((response) => {
              this.onLoadPanelHiding("Successfully Saved", "success");
              this.OnClearForm();
              //this.setState({CourseID: response.data[0].CourseID});
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
    let auth = this.state.jAuthorization;

    auth = auth.map((el) => (el.Auth !== 2 ? { ...el, Auth: 2 } : el));

    this.setState({
      UserID: 0,
      jUser: { Cashier: false, Status: 1 },
      jAuthorization: auth,
      SelectedSchool: [],

      //jlSchool: [],
      jlCachGLAccount: [],
      //jlUserGroup: [],

      jUserList: [],

      ListViewing: false,
      PasswordChange: false,
      IsCashier: false,
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

  onModuleValueChanged = (e) => {
    if (e.value && !this.state.DataLoading) {
      axios
        .all([
          axios.get("/api/user-group", {
            params: { GroupID: e.value },
          }),
        ])
        .then(
          axios.spread((People) => {
            this.setState({
              jAuthorization: JSON.parse(People.data[0].UserWiseAuthontication),
            });
          })
        )
        .catch((error) => console.log(error));
    }
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
          this.setState({ DataLoading: true }, () =>
            this.setState(
              {
                jUser: JSON.parse(User.data[0].Users),
                jAuthorization: JSON.parse(User.data[0].UserWiseAuthontication),
                jlCachGLAccount: JSON.parse(User.data[0].CashierAccount),
                PasswordChange: false,
                IsCashier: JSON.parse(User.data[0].Users).Cashier,
              },
              () =>
                this.setState(
                  (prevState) => ({
                    jUser: {
                      ...prevState.jUser,
                      Schools: JSON.parse(User.data[0].UserWiseSchool), //Object.values(User.data[0].UserWiseSchool),
                    },
                  }),
                  () => this.setState({ DataLoading: false })
                )
            )
          );
        })
      )
      .catch((error) => console.log(error));
  }

  onChangeCashire = (e) => {
    if (!this.state.DataLoading) {
      this.setState((prevState) => ({
        jUser: {
          ...prevState.jUser,
          CashGLAccount: "",
          ChequeGLAccount: "",
          BankTransfer: "",
          CreditCardGLAccount: "",
        },
        IsCashier: e.value,
      }));
    }
  };

  onChangePassword = (e) => {
    if (e.value && !this.state.DataLoading) {
      this.setState((prevState) => ({
        jUser: {
          ...prevState.jUser,
          Password: "",
          ConfirmPassword: "",
        },
        PasswordChange: e.value,
      }));
    }
  };

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
        <Card title="User">
          <Form ref={this.FormRef} formData={this.state.jUser}>
            <GroupItem caption="User Information" colCount={2}>
              <Item
                dataField="UserName"
                editorOptions={{
                  maxLength: 50,
                  readOnly: this.state.UserID != 0,
                }}
              >
                <RequiredRule message="Field required" />
                <Label text="User Name"></Label>
              </Item>
              <Item
                dataField="FullName"
                editorOptions={{
                  maxLength: 50,
                }}
              >
                <RequiredRule message="Field required" />
              </Item>
              <Item
                dataField="Designation"
                editorOptions={{
                  maxLength: 50,
                }}
              ></Item>
              <Item
                dataField="EmployeeNo"
                editorOptions={{
                  maxLength: 50,
                }}
              ></Item>
              <Item
                dataField="ContactNo"
                editorOptions={{
                  maxLength: 50,
                }}
              ></Item>
              <Item
                dataField="Email"
                editorOptions={{
                  maxLength: 50,
                }}
              ></Item>
              <Item
                dataField="Address"
                editorOptions={{
                  maxLength: 100,
                }}
              ></Item>

              <Item dataField="Remark"></Item>
              <Item
                dataField="GroupID"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.state.jlUserGroup,
                  valueExpr: "AutoID",
                  displayExpr: "GroupName",
                  onValueChanged: this.onModuleValueChanged,
                }}
              >
                <Label text="User Group" />
              </Item>
              <Item
                dataField="Status"
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

            <GroupItem caption="Password" colCount={2}>
              <Item
                dataField="PasswordChange"
                editorType="dxCheckBox"
                editorOptions={{
                  onValueChanged: this.onChangePassword,
                }}
              ></Item>
              <EmptyItem></EmptyItem>
              <Item
                dataField="Password"
                displayFormat="#"
                editorOptions={{
                  mode: "password",
                  readOnly: !this.state.PasswordChange,
                }}
              >
                <Label text="New Password" />
              </Item>
              <Item
                dataField="ConfirmPassword"
                editorOptions={{
                  mode: "password",
                  readOnly: !this.state.PasswordChange,
                }}
              ></Item>
            </GroupItem>



          </Form>
        </Card>

        <Card title="Authorization">
          <TreeList
            id="user-authorization"
            dataSource={this.state.jAuthorization}
            columnAutoWidth={true}
            wordWrapEnabled={true}
            showBorders={true}
            keyExpr="MenuID"
            parentIdExpr="ParentID"
            onRowUpdated={this.onRowUpdated}
            onRowUpdating={this.onRowUpdating}
          >
            <Editing allowUpdating={true} mode="cell" />
            <Column
              minWidth={250}
              dataField="Name"
              caption="Module"
              allowEditing={false}
            >
              <RequiredRule />
            </Column>
            <Column minWidth={120} dataField="Auth" caption="Authorization">
              <Lookup
                dataSource={this.Auth}
                valueExpr="ID"
                displayExpr="Name"
              />
              <RequiredRule />
            </Column>
          </TreeList>
        </Card>

        <Navbar bg="light" variant="light">
          <Button
            variant="secondary"
            onClick={this.SaveData}
            disabled={this.state.DocReadOnly}
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
          UserList={this.state.jUserList}
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

export default connect(mapStateToProps)(Users);

// export default Users;
