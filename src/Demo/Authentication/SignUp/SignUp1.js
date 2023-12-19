import React from 'react';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Card from "../../../App/components/MainCard";
import Form, {
    Item,
    GroupItem,
    RequiredRule,
    EmailRule,
    Label,
    EmptyItem,
} from "devextreme-react/form";
import DataGrid, {
    Column,
    SearchPanel,
    GroupPanel,
    Paging,
    Editing,
    Popup,
    Form as GForm,
    Lookup
} from "devextreme-react/data-grid";
import FileUploader from 'devextreme-react/file-uploader';
import { LoadPanel } from 'devextreme-react';
import notify from 'devextreme/ui/notify';
import Swal from "sweetalert2";
import axios from "axios";
var { v4: uuidv4 } = require("uuid");

class SignUp1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          UserID: 0,
          jUser: { Status: 1 },
          jAuthorization: [],
    
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
   
    axios
      .all([
        // axios.get("/api/Get-Users-Groups"),
        // axios.get("/api/user-auth-tree"),
      ])
      .then
      // axios.spread((UserGroup, AuthTree) => {
      //   console.log("UserGroup", UserGroup);
      //   this.setState(
      //     {
      //       jlUserGroup: UserGroup.data,
      //       jAuthorization: AuthTree.data,
      //       DocReadOnly: auth,
      //     },
      //     () => console.log("DocReadOnly", this.state.jAuthorization)
      //   );
      // })
      ()
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
    let matchPassword =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!this.FormLayout.validate().isValid) {
      this.OnNotification("Fields marked with * are required", "error");
      return false;
    }
    console.log(this.state.jUser.password);
    //if (this.state.jUser.PasswordChange) {
    if (
      this.state.jUser.password == "" ||
      this.state.jUser.password == NaN ||
      this.state.jUser.password == undefined
    ) {
      this.OnNotification("Password is Required", "error");
      return false;
    } else if (matchPassword.test(this.state.jUser.password) == false) {
      this.OnNotification(
        "Passwords must contain at least 8 characters, including uppercase, lowercase letters and numbers.",
        "error"
      );
      return false;
    } else if (this.state.jUser.password != this.state.jUser.ConfirmPassword) {
      this.OnNotification(
        "New password & Confirm password must match",
        "error"
      );
      return false;
    }
    // }

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
          console.log( {
            firstName: this.state.jUser.firstName,
            lastName: this.state.jUser.lastName,
            email: this.state.jUser.email,
            nic: this.state.jUser.nic,
            address: this.state.jUser.address,
            mobileNo: this.state.jUser.mobileNo,
            dob: this.state.jUser.dob,
            gender: this.state.jUser.gender,
            status: this.state.jUser.status,
            password :this.state.jUser.password,
            type: 1,
            roleId: 2,
          });
          this.serverRequest = axios
            .post("http://20.201.121.161:4478/api/User/Register", {
              firstName: this.state.jUser.firstName,
              lastName: this.state.jUser.lastName,
              email: this.state.jUser.email,
              nic: this.state.jUser.nic,
              address: this.state.jUser.address,
              mobileNo: JSON.stringify( this.state.jUser.mobileNo),
              dob: this.state.jUser.dob,
              gender: this.state.jUser.gender,
              status: this.state.jUser.status,
              password :this.state.jUser.password,
              type: 1,
              roleId: 2,
            })
            .then((response) => {
              this.onLoadPanelHiding(response.data, "success");
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


    this.setState({
      UserID: 0,
      jUser: { Status: 1 },
      jAuthorization: [],

      jUserList: [],

      ListViewing: false,
      DataLoading: false,
      PasswordChange: false,
      IsCashier: false,
      DocReadOnly: false,
    });
  };

    OnClickBackToLogin = (e) => {
        window.open(
            `/`,
            "_self"
        );
    }



    render() {
        return (
            <Aux>
                <Card title="">
          <Form ref={this.FormRef} formData={this.state.jUser}>
            <GroupItem caption="Register" colCount={2}>
              <Item
                dataField="firstName"
                editorOptions={{
                  maxLength: 50,
                  readOnly: this.state.UserID != 0,
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
              <Item
                dataField="password"
                displayFormat="#"
                editorOptions={{
                  mode: "password",
                  //readOnly: !this.state.PasswordChange,
                }}
              >
                <RequiredRule message="Field required" />
                <Label text="New Password" />
              </Item>
              <Item
                dataField="ConfirmPassword"
                editorOptions={{
                  mode: "password",
                  //readOnly: !this.state.PasswordChange,
                }}
              ></Item>
            </GroupItem>
          </Form>
        

                        <br />
                        <hr />

                        <button
                            className="btn btn-primary shadow-2 mb-4"
                            onClick={this.SaveData}
                            disabled={false}
                        >
                            Registration
                        </button>
                        <button
                            className="btn btn-primary shadow-2 mb-4"
                            onClick={this.OnClickBackToLogin}
                        >
                            Back To Login
                        </button>

                    </Card>
                

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

               
            </Aux>
        );
    }
}

export default SignUp1;