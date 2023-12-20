"use strict";(self.webpackChunkdatta_able_rv18_0_4=self.webpackChunkdatta_able_rv18_0_4||[]).push([[490],{17451:(e,t,a)=>{a.d(t,{Z:()=>c});var s=a(72791),i=a(63370),o=a(64074),d=a(73193),n=(a(28088),a(74387)),r=a(91923),l=a(80184);class h extends s.Component{constructor(){super(...arguments),this.state={isOption:this.props.isOption,fullCard:!1,collapseCard:!1,loadCard:!1,cardRemove:!1},this.cardReloadHandler=()=>{this.setState({loadCard:!0}),setInterval((()=>{this.setState({loadCard:!1})}),3e3)},this.cardRemoveHandler=()=>{this.setState({cardRemove:!0})}}render(){let e,t,a,s,h="",c=[];return this.state.isOption&&(a=(0,l.jsx)("div",{className:"card-header-right",children:(0,l.jsxs)(i.Z,{alignRight:!0,className:"btn-group card-option",children:[(0,l.jsx)(i.Z.Toggle,{id:"dropdown-basic",className:"btn-icon",children:(0,l.jsx)("i",{className:"feather icon-more-horizontal"})}),(0,l.jsxs)(i.Z.Menu,{as:"ul",className:"list-unstyled card-option",children:[(0,l.jsxs)(i.Z.Item,{as:"li",className:"dropdown-item",onClick:()=>{this.setState((e=>({fullCard:!e.fullCard})))},children:[(0,l.jsx)("i",{className:this.state.fullCard?"feather icon-minimize":"feather icon-maximize"}),(0,l.jsxs)("a",{href:r.Z.BLANK_LINK,children:[" ",this.state.fullCard?"Restore":"Maximize"," "]})]}),(0,l.jsxs)(i.Z.Item,{as:"li",className:"dropdown-item",onClick:()=>{this.setState((e=>({collapseCard:!e.collapseCard})))},children:[(0,l.jsx)("i",{className:this.state.collapseCard?"feather icon-plus":"feather icon-minus"}),(0,l.jsxs)("a",{href:r.Z.BLANK_LINK,children:[" ",this.state.collapseCard?"Expand":"Collapse"," "]})]}),(0,l.jsxs)(i.Z.Item,{as:"li",className:"dropdown-item",onClick:this.cardReloadHandler,children:[(0,l.jsx)("i",{className:"feather icon-refresh-cw"}),(0,l.jsx)("a",{href:r.Z.BLANK_LINK,children:" Reload "})]}),(0,l.jsxs)(i.Z.Item,{as:"li",className:"dropdown-item",onClick:this.cardRemoveHandler,children:[(0,l.jsx)("i",{className:"feather icon-trash"}),(0,l.jsx)("a",{href:r.Z.BLANK_LINK,children:" Remove "})]})]})]})})),s=(0,l.jsxs)(o.Z.Header,{children:[(0,l.jsx)(o.Z.Title,{as:"h5",children:this.props.title}),a]}),this.state.fullCard&&(c=[...c,"full-card"],e={position:"fixed",top:0,left:0,right:0,width:this.props.windowWidth,height:this.props.windowHeight}),this.state.loadCard&&(c=[...c,"card-load"],t=(0,l.jsx)("div",{className:"card-loader",children:(0,l.jsx)("i",{className:"pct-loader1 anim-rotate"})})),this.state.cardRemove&&(c=[...c,"d-none"]),this.props.cardClass&&(c=[...c,this.props.cardClass]),h=(0,l.jsxs)(o.Z,{className:c.join(" "),style:e,children:[s,(0,l.jsx)(d.Z,{in:!this.state.collapseCard,children:(0,l.jsx)("div",{children:(0,l.jsx)(o.Z.Body,{children:this.props.children})})}),t]}),(0,l.jsx)(n.Z,{children:h})}}const c=h},86490:(e,t,a)=>{a.r(t),a.d(t,{Branch:()=>u,default:()=>x});var s=a(72791),i=a(74387),o=a(50649),d=a.n(o),n=a(17451),r=a(55294),l=a(80134),h=a(85797),c=a(65410),p=a.n(c),m=a(80184);class u extends s.Component{constructor(e){super(e),this.componentDidMount=e=>{r.Z.all([r.Z.get("http://20.201.121.161:4478/api/Branch",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}),r.Z.get("http://20.201.121.161:4478/api/City",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}})]).then(r.Z.spread(((e,t)=>{this.setState({jBranch:e.data,jCity:t.data})}))).catch((e=>console.log(e)))},this.onIDValidation=e=>new Promise(((t,a)=>{r.Z.get("/api/sub-master/defect-type-exist",{params:{AutoID:e.newData.AutoID?e.newData.AutoID:0,Code:e.newData.MSCode,Name:e.newData.MSName}}).then((e=>{t(1===e.data[0].Exist)})).catch((e=>{console.log(e)}))})),this.onRowValidating=async e=>{if(e.isValid){if(this.ValidationCheck)return e.isValid=!0,void(this.ValidationCheck=!1);if(e.isValid=!1,await this.onIDValidation(e))return e.isValid=!1,void this.OnNotification("Code or Name already exists","error");(0,l.confirm)("Want to save this record?","Confirmation").done((t=>{t?(this.ValidationCheck=!0,e.component.saveEditData()):e.component.cancelEditData()}))}},this.OnNotification=(e,t)=>{p()({message:e,type:t,displayTime:3e3,position:{at:"top right",offset:"50"}})},this.state={jBranch:[],jCity:[],DocReadOnly:!1},this.Status=[{ID:1,Name:"Active"},{ID:0,Name:"Inactive"}],this.Institute=[{ID:0,Name:"Wildlife conservations"},{ID:1,Name:"Forest conservations"}],this.ValidationCheck=!1,this.onRowInserted=this.onRowInserted.bind(this),this.onRowUpdated=this.onRowUpdated.bind(this),this.onRowRemoved=this.onRowRemoved.bind(this)}onRowInserted(e){e.data.id=0,console.log(e.data),this.serverRequest=r.Z.post("http://20.201.121.161:4478/api/Branch",e.data,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then((e=>{console.log(e)})).catch((e=>{console.log(e)}))}onRowUpdated(e){this.serverRequest=r.Z.put("/api/sub-master/update-defect-types",e.data).then((e=>{console.log(e.data)})).catch((e=>{console.log(e)}))}onRowRemoved(e){this.serverRequest=r.Z.delete("/api/sub-master/remove-defect-types/".concat(e.data.AutoID)).then((e=>{console.log(e.data)})).catch((e=>{console.log(e)}))}onInitNewRow(e){}render(){return(0,m.jsx)(i.Z,{children:(0,m.jsx)(n.Z,{title:"Branch",children:(0,m.jsxs)(d(),{id:"grid-defect-types",keyExpr:"id",dataSource:this.state.jBranch,allowColumnReordering:!0,onRowInserted:this.onRowInserted,onInitNewRow:this.onInitNewRow,showBorders:!0,wordWrapEnabled:!0,allowSearch:!0,showColumnLines:!0,showRowLines:!1,rowAlternationEnabled:!0,children:[(0,m.jsx)(o.Editing,{mode:"popup",useIcons:!0,allowUpdating:!this.state.DocReadOnly,allowDeleting:!1,allowAdding:!this.state.DocReadOnly,children:(0,m.jsx)(o.Popup,{title:"Branch",showTitle:!0})}),(0,m.jsx)(o.SearchPanel,{visible:!0,placeholder:"Search..."}),(0,m.jsx)(o.Column,{dataField:"id",editorOptions:{maxLength:50}}),(0,m.jsx)(o.Column,{dataField:"name",editorOptions:{maxLength:50},children:(0,m.jsx)(o.RequiredRule,{})}),(0,m.jsx)(o.Column,{dataField:"address",editorOptions:{maxLength:50},children:(0,m.jsx)(o.RequiredRule,{})}),(0,m.jsx)(o.Column,{dataField:"phoneNumber",editorOptions:{maxLength:50},children:(0,m.jsx)(o.RequiredRule,{})}),(0,m.jsx)(o.Column,{dataField:"emailAddress",editorOptions:{maxLength:50},children:(0,m.jsx)(o.RequiredRule,{})}),(0,m.jsxs)(o.Column,{dataField:"cityId",children:[(0,m.jsx)(o.Lookup,{dataSource:this.state.jCity,valueExpr:"id",displayExpr:"name"}),(0,m.jsx)(o.RequiredRule,{})]}),(0,m.jsxs)(o.Column,{dataField:"institutionId",children:[(0,m.jsx)(o.Lookup,{dataSource:this.Institute,valueExpr:"ID",displayExpr:"Name"}),(0,m.jsx)(o.RequiredRule,{})]})]})})})}}const x=(0,h.$j)((e=>(console.log(e.loggedReducer),{data:e.loggedReducer})))(u)}}]);
//# sourceMappingURL=490.10bb5840.chunk.js.map