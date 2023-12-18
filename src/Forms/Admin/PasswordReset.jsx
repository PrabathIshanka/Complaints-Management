import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import Form, { Item, Label, RequiredRule } from "devextreme-react/form";
import DataGrid, {
  Column,
  Editing,
  Popup,
  Lookup,
  Scrolling,
  Paging,
  Selection,
  SearchPanel,
} from "devextreme-react/data-grid";
import Card from "../../App/components/MainCard";
import { Button, Navbar, Dropdown, DropdownButton } from "react-bootstrap";
import { LoadPanel } from "devextreme-react/load-panel";
import notify from "devextreme/ui/notify";
import Swal from "sweetalert2";
import axios from "axios";
import Layout from "../../component/Report/ReportList";
import { connect } from "react-redux";
import Moment from "moment";
import DropDownBox from "devextreme-react/drop-down-box";

export class PasswordRest extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      jPasswordReset: {},
    };

    this.FormRef = React.createRef();
  }

  OnClickEvent = (e) => {
    if (this.FormLayout.validate().isValid == true) {
      axios
        .get("/api/password-check", {
          params: {
            CurrentPassword: this.state.jPasswordReset.CurrentPassword,
            UserID:
              this.props.data.user === undefined
                ? this.props.data.data.user.Id
                : this.props.data.user.Id,
          },
        })
        .then((res) => {
          if (res.data.length > 0) {
            if (
              this.state.jPasswordReset.ConfirmPassword ==
              this.state.jPasswordReset.NewPassword
            ) {
              Swal.fire({
                type: "info",
                showCancelButton: true,
                text: "Do you want to reset your password ?",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                allowOutsideClick: false,
                allowEscapeKey: false,
              }).then((res) => {
                if (res.value) {
                  axios
                    .post("/api/password-check", {
                      NewPassword: this.state.jPasswordReset.NewPassword,
                      UserID:
                        this.props.data.user === undefined
                          ? this.props.data.data.user.Id
                          : this.props.data.user.Id,
                    })
                    .then((res) => {
                      notify({
                        message: "Password Reset Successfully Completed",
                        type: "success",
                        displayTime: 3000,
                        position: { at: "top right", offset: "50" },
                      });
                      this.OnClearClickEvent();
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } else if (res.dismiss == "cancel") {
                  //console.log("cancel");
                } else if (res.dismiss == "esc") {
                  //console.log("cancle");
                }
              });
            } else {
              notify({
                message: "Password Not is Match",
                type: "error",
                displayTime: 3000,
                position: { at: "top right", offset: "50" },
              });
            }
          } else {
            notify({
              message: "Current Password Not is Match",
              type: "error",
              displayTime: 3000,
              position: { at: "top right", offset: "50" },
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      notify({
        message: "Fields marked with * are required",
        type: "error",
        displayTime: 3000,
        position: { at: "top right", offset: "50" },
      });
    }
  };

  OnClearForm = () => {
    this.setState({
      jPasswordReset: {},
    });

    this.componentDidMount();
  };

  onLoadPanelHiding = () => {
    this.setState({
      LoadPanelVisible: false,
    });

    notify({
      message: "Successfully Saved",
      type: "success",
      displayTime: 3000,
      position: { at: "top right", offset: "50" },
    });
  };

  clearRelatedGrid() {
    this.setState({
      jPasswordReset: {},
    });
  }

  OnClearClickEvent = () => {
    this.setState({ jPasswordReset: {} });
  };

  get FormLayout() {
    return this.FormRef.current.instance;
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
        <Card title="Password Reset">
          <Form ref={this.FormRef} formData={this.state.jPasswordReset}>
            <Item
              dataField="CurrentPassword"
              editorOptions={{
                maxLength: 50,
                mode: "password",
              }}
            >
              <RequiredRule />
            </Item>
            <Item
              dataField="NewPassword"
              editorOptions={{
                maxLength: 50,
                mode: "password",
              }}
            >
              <RequiredRule />
            </Item>
            <Item
              dataField="ConfirmPassword"
              editorOptions={{
                maxLength: 50,
                mode: "password",
              }}
            >
              <RequiredRule />
            </Item>
          </Form>
        </Card>

        <Navbar bg="light" variant="light">
          <Button
            variant="secondary"
            icon="feather icon-layers"
            onClick={this.OnClickEvent}
          >
            Update
          </Button>
          <Button
            variant="secondary"
            icon="feather icon-layers"
            onClick={this.OnClearForm}
          >
            Clear
          </Button>
        </Navbar>
      </Aux>
    );
  }
}

// export default ExamSetup;

const mapStateToProps = (state) => {
  return {
    data: state.loggedReducer,
  };
};

export default connect(mapStateToProps)(PasswordRest);
