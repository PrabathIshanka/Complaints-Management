import Form, { Item, GroupItem, Label } from "devextreme-react/form";
import React, { Component } from "react";
import Card from "../../App/components/MainCard";
import { Button, Navbar } from "react-bootstrap";
import List from "./ComplainOEnquiryList";
import { LoadPanel } from "devextreme-react";
import DataGrid, {
  Column,
  SearchPanel,
  GroupPanel,
  Paging,
  Editing,
  Lookup,
  Popup,
} from "devextreme-react/data-grid";

import { FileUploader } from "devextreme-react";
import notify from "devextreme/ui/notify";
import Swal from "sweetalert2";
import axios from "axios";
import UploadAttchment from "../UploadAttachmentTemplate/UploadAttchment";

export class ComplainOEnquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ComplainID: 0,
      jComplain: {},

      jlDefectTypes: [],
      jlCustomers: [],
      jlArea: [],
      jlUser: [],
      jlBank: [],
      jlCategory: [],
      jlItem: [],
      jComplainAttachment: [],
      UploadAttchment: false,
      FileInfo: {},

      SelectedID: 0,
      ComplainInquiryList: [],
      LoadPanelVisible: false,
      ListViewing: false,
      DocumentID: 5001,
      jComplainAction: [],
    };

    this.Status = [
      { ID: 1, Name: "Complain" },
      { ID: 2, Name: "Inquiry" },
      { ID: 3, Name: "Feedback" },
    ];
    this.Status01 = [
      { ID: 1, Name: "Active" },
      { ID: 2, Name: "Inactive" },
      { ID: 3, Name: "Completed" },
    ];
    this.PriorityLevel = [
      { ID: 1, Name: "High" },
      { ID: 2, Name: "Medium" },
      { ID: 3, Name: "Low" },
    ];
    this.ProductType = [
      { ID: 1, Name: "Product Relq" },
      { ID: 2, Name: "Inquiry" },
      { ID: 3, Name: "Feedback" },
    ];
    this.AnswerResult = [
      { ID: 1, Name: "Poor" },
      { ID: 2, Name: "Fair" },
      { ID: 3, Name: "Good" },
      { ID: 4, Name: "Better" },
      { ID: 5, Name: "Best" },
    ];
  }

  componentDidMount = () => {
    this.onInitializeForm();
  };

  onInitializeForm = () => {
    this.setState({ LoadPanelVisible: true }, () => {
      axios
        .all([
          axios.get("/api/number-series-lookup-by-module", {
            params: { DocumentID: this.state.DocumentID },
          }),
          axios.get("/api/area-lookup"),
          axios.get("/api/user-lookup"),
          axios.get("/api/customer"),
          axios.get("/api/category"),
          axios.get("/api/bank-active"),
          axios.get("/api/Item"),
          axios.get("/api/master/list-defect-types"),
        ])
        .then(
          axios.spread(
            (req, area, user, Customer, Category, Bank, Item, defectTypes) => {
              this.setState(
                (prevState) => ({
                  jComplain: {
                    ...prevState.jComplain,
                    ComplainNo: req.data[0].Series,
                  },
                  jlArea: area.data,
                  jlUser: user.data,
                  jlBank: Bank.data,
                  jlCustomers: Customer.data,
                  jlCategory: Category.data,
                  jlItem: Item.data,
                  jlDefectTypes: defectTypes.data,
                }),
                () => this.setState({ LoadPanelVisible: false })
              );
            }
          )
        )
        .catch((error) => console.error(error));
    });
  };

  onViewListClick = (viewListSelectedID) => {
    this.setState({ ListViewing: !this.state.ListViewing }, () => {
      if (this.state.ListViewing) {
        //Open
        this.serverRequest = axios
          .get("/api/feedback/listview-complain-inquiry")
          .then((res) => {
            this.setState({ ComplainInquiryList: res.data });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (!this.state.ListViewing && viewListSelectedID != 0) {
        //Close
        this.setState(
          {
            SelectedID: viewListSelectedID,
            DataLoading: true,
            isDocReadOnly: true,
          },
          () => this.OnLoadData()
        );
      }
    });
  };

  // OnLoadData = () => {
  //   try {
  //     axios
  //       .get("/api/feedback/get-complain-inquiry", {
  //         params: {
  //           AutoID: this.state.SelectedID,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res.data[0]);
  //         this.setState({
  //           ComplainID: this.state.ComplainID,
  //           jComplain: JSON.parse(res.data[0].ComplainOInquiry),
  //           jComplainAttachment: JSON.parse(
  //             res.data[0].ComplainOInquiryAttachments
  //           ),
  //           jComplainAction: JSON.parse(res.data[0].ComplainOInquiryActionLog),
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  onSaveClick = (e) => {
    try {
      axios
        .post("/api/feedback/add-complain-inquiry", {
          ComplainOInquiry: JSON.stringify(this.state.jComplain),
          ComplainOInquiryAttachments: JSON.stringify(
            this.state.jComplainAttachment
          ),
          ComplainOInquiryActionLog: JSON.stringify(this.state.jComplainAction),
        })
        .then((response) => {
          let _newComplainID = response.data[0].NewComplainID;
          if (_newComplainID != 0) {
            this.onLoadPanelHiding("Successfully Saved", "success");
            this.OnClearForm();
          } else if (_newComplainID == 0) {
            this.onLoadPanelHiding("Successfully Updated", "success");
            this.OnClearForm();
          }
        })
        .catch((error) => {
          console.error(error);
          this.onLoadPanelHiding("Something went wrong", "error");
        });
    } catch (error) {
      console.log(error);
    }
  };

  OnClearForm = () => {
    this.setState({
      ComplainID: 0,
      jComplain: {},
      jComplainAction: [],
      jComplainAttachment: [],
    });
    this.onInitializeForm();
  };

  onClearClick = (e) => {
    try {
      this.OnClearForm();
    } catch (error) {
      console.error(error);
    }
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

  onChangeCategory = (e) => {
    if (e.value) {
      axios
        .get("/api/category-wise-item", {
          params: {
            CategoryID: e.value,
          },
        })
        .then((res) => {
          this.setState({ jlItem: res.data });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  onChangeComplainType = (e) => {
    this.setState({}); // don't remove this line
  };

  onCustomerChanged = (e) => {
    if (e.value) {
      axios
        .get("/api/master/customer-by-id", {
          params: {
            CustomerID: e.value,
          },
        })
        .then((res) => {
          let _complaint = this.state.jComplain;
          let _modifiedObj = {
            ..._complaint,
            CustomerID: res.data[0].CustomerID,
            RegistrationNumber: res.data[0].RegistrationNo,
            CustomerName: res.data[0].Name,
            CusIdentificationNo: res.data[0].IdentificationNo,
            CusEmail: res.data[0].Email,
            CusContactNo: res.data[0].ContactNo,
          };

          this.setState({ jComplain: _modifiedObj });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  onUploadUploadAttchmentClick = (e, fileName, filePath, attachmentID) => {
    try {
      let Id = 0;
      this.setState({ UploadAttchment: !this.state.UploadAttchment }, () => {
        if (this.state.UploadAttchment) {
          Id = e.row.data.AttachmentID;

          this.setState({
            FileInfo: e.row.data,
          });
        }
        let attachmentName = fileName + "";
        let attachmentCount = 0;
        if (!this.state.ListViewing) {
          const attachmentLength = this.state.jComplainAttachment.length;

          for (var i = 0; i < attachmentLength; i++) {
            if (
              this.state.jComplainAttachment[i].AttachmentID == attachmentID
            ) {
              attachmentCount = i;
            }
          }
          debugger;
          this.state.jComplainAttachment[attachmentCount].AttachmentFilePath =
            filePath + "";
          this.state.jComplainAttachment[attachmentCount].AttachmentName =
            attachmentName;
          this.setState((prevState) => ({
            jComplainAttachment: this.state.jComplainAttachment,
          }));
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <Card title="Complain/ Inquiry">
          <Form
            onContentReady={this.validateForm}
            ref={this.FormRef}
            formData={this.state.jComplain}
          >
            <GroupItem caption="General Details" colCount={2}>
              <Item
                dataField="PriorityLevel"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.PriorityLevel,
                  valueExpr: "ID",
                  displayExpr: "Name",
                }}
              ></Item>
              <Item
                dataField="ComplainType"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.Status,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  onValueChanged: this.onChangeComplainType,
                }}
              ></Item>
              <Item dataField="ComplainNo"></Item>
              <Item
                dataField="Status"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.Status01,
                  valueExpr: "ID",
                  displayExpr: "Name",
                }}
              ></Item>
            </GroupItem>

            <GroupItem caption="Customer Details" colCount={2}>
              <Item
                dataField="CustomerID"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.state.jlCustomers,
                  valueExpr: "CustomerID",
                  displayExpr: "Name",
                  onValueChanged: this.onCustomerChanged,
                }}
              >
                <Label text="Customer" />
              </Item>
              <Item
                dataField="RegistrationNumber"
                editorOptions={{ readOnly: true }}
              ></Item>
              <Item
                dataField="CustomerName"
                editorOptions={{ readOnly: true }}
              ></Item>
              <Item dataField="Address" editorOptions={{ readOnly: true }}>
                <Label text="Address" />
              </Item>
              {/* <Item
                dataField="CusIdentificationNo"
                editorOptions={{ readOnly: true }}
              >
                <Label text="ID No" />
              </Item> */}
              <Item dataField="CusEmail" editorOptions={{ readOnly: true }}>
                <Label text="Email" />
              </Item>
              <Item
                dataField="TelephoneNumber"
                editorOptions={{ readOnly: true }}
              >
                <Label text="Telephone Number" />
              </Item>
              <Item dataField="MobileNumber" editorOptions={{ readOnly: true }}>
                <Label text="Mobile Number" />
              </Item>
            </GroupItem>

            <GroupItem caption="Complain Details" colCount={2}>
              <Item dataField="ComplainDate" editorType="dxDateBox"></Item>
              <Item dataField="ResolvingDate" editorType="dxDateBox"></Item>
              <Item
                dataField="CategoryID"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.state.jlCategory,
                  valueExpr: "CategoryID",
                  displayExpr: "CategoryName",
                  onValueChanged: this.onChangeCategory,
                }}
              >
                <Label text="Product Type" />
              </Item>
              <Item
                dataField="ItemID"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.state.jlItem,
                  valueExpr: "ItemID",
                  displayExpr: "Name",
                }}
              >
                <Label text="Product Name" />
              </Item>
              <Item dataField="ProductSize"></Item>
              <Item dataField="BatchBarSerialCode">
                <Label text="Batch/Bar/SerialCode" />
              </Item>
              <Item
                dataField="DefectTypeID"
                editorType="dxSelectBox"
                editorOptions={{
                  items: this.state.jlDefectTypes,
                  valueExpr: "AutoID",
                  displayExpr: "DefectCode",
                }}
              >
                <Label text="Defect/Technical Fault Type" />
              </Item>
              <Item dataField="Quantity" editorType="dxNumberBox"></Item>
              <Item
                dataField="ComplainDetails"
                colSpan={2}
                editorType="dxTextArea"
              ></Item>
            </GroupItem>

            <GroupItem
              caption="Sales"
              visible={this.state.jComplain.ComplainType == 3}
            >
              <Item
                dataField="ContactabilityOfSalesRepresentative"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="ContactabilityOfSalesRepresentativeRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>

              <Item
                dataField="SpeedToRespondToAnInquiryOrder"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="
                SpeedToRespondToAnInquiryOrderRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>

              <Item
                dataField="SubmissionOfPriceQuotationInformationOnTime"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="
                SubmissionOfPriceQuotationInformationOnTimeRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>

              <Item
                dataField="
                ResponseToChangesOnOrderPlaced"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="
                ResponseToChangesOnOrderPlacedRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>

              <Item
                dataField="FeedbackGivenOnProcessOfTheOrdersPlaced"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="FeedbackGivenOnProcessOfTheOrdersPlacedRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>

              <Item
                dataField="
                KnowledgeOfThesalesPersonOnProductsOfferedByTheCompany"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="KnowledgeOfThesalesPersonOnProductsOfferedByTheCompanyRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>

              <Item
                dataField="
                AbilityToResolveComplaintsEffectivelyOfRepresentative"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="AbilityToResolveComplaintsEffectivelyOfRepresentativeRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>
            </GroupItem>

            <GroupItem
              caption="Product"
              visible={this.state.jComplain.ComplainType == 3}
            >
              <Item
                dataField="QualityAndDurabilityOfTheProductSupplied"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="QualityAndDurabilityOfTheProductSuppliedRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>

              <Item
                dataField="IncidentOfNonConformatiesDefectiveFaced"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="IncidentOfNonConformatiesDefectiveFacedRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>

              <Item
                dataField="NeatnessOfPackaging"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="NeatnessOfPackagingRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>
            </GroupItem>

            <GroupItem
              caption="Delivery"
              visible={this.state.jComplain.ComplainType == 3}
            >
              <Item
                dataField="OnTimeDeliveryOfYourOrders"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="OnTimeDeliveryOfYourOrdersRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>

              <Item
                dataField="TimeTakenForCompletionOfTheTotalOrderQuantity"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="TimeTakenForCompletionOfTheTotalOrderQuantityRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>
            </GroupItem>

            <GroupItem
              caption="Other"
              visible={this.state.jComplain.ComplainType == 3}
            >
              <Item
                dataField="OverallServiceProvidedByTheCompany"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="OverallServiceProvidedByTheCompanyRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>

              <Item
                dataField="ResponseForSalesReturns"
                editorType="dxRadioGroup"
                editorOptions={{
                  items: this.AnswerResult,
                  valueExpr: "ID",
                  displayExpr: "Name",
                  layout: "horizontal",
                }}
              ></Item>
              <Item
                dataField="ResponseForSalesReturnsRemark"
                editorType="dxTextArea"
              >
                <Label text="Remark" />
              </Item>
            </GroupItem>
          </Form>

          <br />
          <Form>
            <GroupItem caption="Attachment" colCount={2}></GroupItem>
          </Form>
          <DataGrid
            id="grid-list"
            keyExpr="AttachmentID"
            showBorders={true}
            wordWrapEnabled={true}
            allowSearch={true}
            selection={{ mode: "single" }}
            hoverStateEnabled={true}
            dataSource={this.state.jComplainAttachment}
          >
            <Editing
              mode="popup"
              allowDeleting={true}
              allowAdding={true}
              allowUpdating={true}
              useIcons={true}
            >
              <Popup
                title="Add complain/inquiry attachments"
                showTitle={true}
              ></Popup>
            </Editing>
            <SearchPanel visible={true} />
            <GroupPanel visible={true} />
            <Paging defaultPageSize={6} />
            <Column dataField="Name" />
            <Column
              type="buttons"
              buttons={[
                "edit",
                {
                  hint: "Upload",
                  icon: "upload",
                  visible: true,
                  onClick: this.onUploadUploadAttchmentClick,
                },
                {
                  hint: "View",
                  icon: "download",
                  onClick: this.onAppViewClick,
                },
                "delete",
              ]}
            />
          </DataGrid>

          <br></br>
          <Form>
            <GroupItem caption="Action Log" colCount={2}></GroupItem>
          </Form>
          <DataGrid
            id="grid-list"
            keyExpr="AutoID"
            showBorders={true}
            wordWrapEnabled={true}
            allowSearch={true}
            selection={{ mode: "single" }}
            hoverStateEnabled={true}
            dataSource={this.state.jComplainAction}
          >
            <Editing
              mode="popup"
              allowDeleting={true}
              allowAdding={true}
              allowUpdating={true}
              useIcons={true}
            >
              <Popup title="Action Log" showTitle={true}></Popup>
            </Editing>
            <SearchPanel visible={true} />
            <GroupPanel visible={true} />
            <Paging defaultPageSize={20} />
            <Column dataField="UserID" caption="User">
              {" "}
              <Lookup
                dataSource={this.state.jlUser}
                displayExpr="FullName"
                valueExpr="Id"
              />
            </Column>
            <Column dataField="Description" />
            <Column dataField="ActionDate" dataType="date" />
            <Column dataField="Remarks" />
          </DataGrid>

          <br />
          <Navbar bg="light" variant="light">
            <Button
              variant="dark"
              icon="feather icon-layers"
              onClick={this.onSaveClick}
            >
              Save
            </Button>
            <Button
              variant="dark"
              icon="feather icon-layers"
              onClick={this.onClearClick}
            >
              Clear
            </Button>
            <Button
              variant="dark"
              icon="feather icon-layers"
              onClick={this.onViewListClick}
            >
              View List
            </Button>
          </Navbar>
        </Card>

        {/* <LoadPanel
          message="Processing.... Please, wait..."
          shadingColor="rgba(0,0,0,0.4)"
          onHiding={this.onLoadPanelHiding}
          visible={this.state.LoadPanelVisible}
          showIndicator={true}
          shading={true}
          showPane={true}
          closeOnOutsideClick={false}
          width={500}
        /> */}
        <List
          Show={this.state.ListViewing}
          OnHide={this.onViewListClick}
          ComplainInquiryList={this.state.ComplainInquiryList}
        ></List>

        <UploadAttchment
          ref={this.ReportRef}
          Show={this.state.UploadAttchment}
          OnHide={this.onUploadUploadAttchmentClick}
          FileInfo={this.state.FileInfo}
        ></UploadAttchment>
      </div>
    );
  }
}

export default ComplainOEnquiry;

/**
 * GET https://localhost:50000/b1s/v1/Activities
 * GET https://localhost:50000/b1s/v1/Activities?$select=ActivityCode,CardCode,Notes&$filter=ActivityCode ge 2 &$orderby=ActivityCode&$top=10&$skip=1
 * 
 * POST https://localhost:50000/b1s/v1/Activities
{
    "ActivityDate": "2016-08-30",
    "ActivityTime": "08:13:00",
    "CardCode": "C01",
    "DocEntry": "3",
    "DocNum": "1",
    "DocType": "17",
    "Duration": 15,
    "DurationType": "du_Minuts",
    "EndDueDate": "2016-08-30",
    "EndTime": "08:28:00",
    "Reminder": "tYES",
    "ReminderPeriod": 15,
    "ReminderType": "du_Minuts",
    "StartDate": "2016-08-30",
    "StartTime": "08:13:00"
}
 */
