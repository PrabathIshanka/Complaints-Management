import React, { Component, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import DataGrid, {
  Column,
  SearchPanel,
  GroupPanel,
  Paging,
} from "devextreme-react/data-grid";

export class ComplainOEnquiryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewListSelectedID: 0,
      ComplainInquiryList: [],
    };
  }

  componentDidMount() { 
    console.log();
  }

  onSelectionChanged = (e) => {
    this.setState({ viewListSelectedID: e.selectedRowsData[0].id });
  };

  onSelectClick = (e) => {
    this.props.OnHide(this.state.viewListSelectedID);
  };

  onCloseClick = (e) => {
    this.props.OnHide(0);
  };

  render() {
    return (
      <Fragment>
        <Modal
          size="xl"
          show={this.props.Show}
          onHide={this.onCloseClick}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>List of Complains/Inquiries</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DataGrid
              id="grid-list"
              dataSource={this.props.ComplainInquiryList}
              keyExpr="id"
              showBorders={true}
              wordWrapEnabled={true}
              allowSearch={true}
              selection={{ mode: "single" }}
              hoverStateEnabled={true}
              onSelectionChanged={this.onSelectionChanged}
            >
              <SearchPanel visible={true} />
              <GroupPanel visible={true} />
              <Paging defaultPageSize={12} />
              <Column dataField="id" visible={false} />
              <Column dataField="crimeTypeId" />
              <Column dataField="inquiryEntry" />
              <Column dataField="userComment" />
              <Column dataField="rating" />
            </DataGrid>

            <br></br>
            <br></br>

            <Button variant="dark" onClick={this.onSelectClick}>
              Open
            </Button>
            <Button
              variant="dark"
              onClick={this.onCloseClick}
              icon="feather icon-layers"
            >
              Close
            </Button>
            
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }
}

export default ComplainOEnquiryList