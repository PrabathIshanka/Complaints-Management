import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import Form, {
  Item,
  EmptyItem,
  RequiredRule,
  Label,
} from "devextreme-react/form";
import Card from "../../App/components/MainCard";
import { Button, Navbar } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { LoadPanel } from "devextreme-react/load-panel";
import notify from "devextreme/ui/notify";
import Swal from "sweetalert2";
import DataGrid, {
  Column,
  Editing,
  Popup,
  Lookup,
  Selection,
  Scrolling,
  Paging,
  SearchPanel,
  TotalItem,
  Summary,
  Format,
  GroupPanel,
  Form as GridForm,
  Export,
} from "devextreme-react/data-grid";
export class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };


  }

  componentDidMount() {

  }


  OnNotification = (message, type) => {
    notify({
      message: message,
      type: type,
      displayTime: 3000,
      position: { at: "top right", offset: "50" },
    });
  };

  onLoadPanelHiding = () => {
    this.setState({
      LoadPanelVisible: false,
    });
  };

  OnClearFormData = () => {
    this.setState({
  
    });
  };



  render() {
    return (
      <Aux>

        <Navbar bg="light" variant="light">
          <Button
            variant="secondary"
            icon="feather icon-layers"
            onClick={this.onClickView}
            disabled={this.state.DocReadOnly}
          >
            View
          </Button>
          <Button
            variant="secondary"
            icon="feather icon-layers"
            onClick={this.OnClearFormData}
          >
            Clear
          </Button>
        </Navbar>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.loggedReducer,
  };
};
export default connect(mapStateToProps)(Report);
