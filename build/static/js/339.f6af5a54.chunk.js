"use strict";(self.webpackChunkdatta_able_rv18_0_4=self.webpackChunkdatta_able_rv18_0_4||[]).push([[339],{17451:(e,a,s)=>{s.d(a,{Z:()=>h});var t=s(72791),r=s(63370),i=s(64074),l=s(73193),n=(s(28088),s(74387)),o=s(91923),d=s(80184);class c extends t.Component{constructor(){super(...arguments),this.state={isOption:this.props.isOption,fullCard:!1,collapseCard:!1,loadCard:!1,cardRemove:!1},this.cardReloadHandler=()=>{this.setState({loadCard:!0}),setInterval((()=>{this.setState({loadCard:!1})}),3e3)},this.cardRemoveHandler=()=>{this.setState({cardRemove:!0})}}render(){let e,a,s,t,c="",h=[];return this.state.isOption&&(s=(0,d.jsx)("div",{className:"card-header-right",children:(0,d.jsxs)(r.Z,{alignRight:!0,className:"btn-group card-option",children:[(0,d.jsx)(r.Z.Toggle,{id:"dropdown-basic",className:"btn-icon",children:(0,d.jsx)("i",{className:"feather icon-more-horizontal"})}),(0,d.jsxs)(r.Z.Menu,{as:"ul",className:"list-unstyled card-option",children:[(0,d.jsxs)(r.Z.Item,{as:"li",className:"dropdown-item",onClick:()=>{this.setState((e=>({fullCard:!e.fullCard})))},children:[(0,d.jsx)("i",{className:this.state.fullCard?"feather icon-minimize":"feather icon-maximize"}),(0,d.jsxs)("a",{href:o.Z.BLANK_LINK,children:[" ",this.state.fullCard?"Restore":"Maximize"," "]})]}),(0,d.jsxs)(r.Z.Item,{as:"li",className:"dropdown-item",onClick:()=>{this.setState((e=>({collapseCard:!e.collapseCard})))},children:[(0,d.jsx)("i",{className:this.state.collapseCard?"feather icon-plus":"feather icon-minus"}),(0,d.jsxs)("a",{href:o.Z.BLANK_LINK,children:[" ",this.state.collapseCard?"Expand":"Collapse"," "]})]}),(0,d.jsxs)(r.Z.Item,{as:"li",className:"dropdown-item",onClick:this.cardReloadHandler,children:[(0,d.jsx)("i",{className:"feather icon-refresh-cw"}),(0,d.jsx)("a",{href:o.Z.BLANK_LINK,children:" Reload "})]}),(0,d.jsxs)(r.Z.Item,{as:"li",className:"dropdown-item",onClick:this.cardRemoveHandler,children:[(0,d.jsx)("i",{className:"feather icon-trash"}),(0,d.jsx)("a",{href:o.Z.BLANK_LINK,children:" Remove "})]})]})]})})),t=(0,d.jsxs)(i.Z.Header,{children:[(0,d.jsx)(i.Z.Title,{as:"h5",children:this.props.title}),s]}),this.state.fullCard&&(h=[...h,"full-card"],e={position:"fixed",top:0,left:0,right:0,width:this.props.windowWidth,height:this.props.windowHeight}),this.state.loadCard&&(h=[...h,"card-load"],a=(0,d.jsx)("div",{className:"card-loader",children:(0,d.jsx)("i",{className:"pct-loader1 anim-rotate"})})),this.state.cardRemove&&(h=[...h,"d-none"]),this.props.cardClass&&(h=[...h,this.props.cardClass]),c=(0,d.jsxs)(i.Z,{className:h.join(" "),style:e,children:[t,(0,d.jsx)(l.Z,{in:!this.state.collapseCard,children:(0,d.jsx)("div",{children:(0,d.jsx)(i.Z.Body,{children:this.props.children})})}),a]}),(0,d.jsx)(n.Z,{children:c})}}const h=c},58339:(e,a,s)=>{s.r(a),s.d(a,{Report:()=>h,default:()=>p});var t=s(72791),r=s(74387),i=(s(68962),s(17451),s(89139)),l=s(43360),n=s(85797),o=(s(47885),s(65410)),d=s.n(o),c=(s(21830),s(50649),s(80184));class h extends t.Component{constructor(e){super(e),this.OnNotification=(e,a)=>{d()({message:e,type:a,displayTime:3e3,position:{at:"top right",offset:"50"}})},this.onLoadPanelHiding=()=>{this.setState({LoadPanelVisible:!1})},this.OnClearFormData=()=>{this.setState({})},this.state={}}componentDidMount(){}render(){return(0,c.jsx)(r.Z,{children:(0,c.jsxs)(i.Z,{bg:"light",variant:"light",children:[(0,c.jsx)(l.Z,{variant:"secondary",icon:"feather icon-layers",onClick:this.onClickView,disabled:this.state.DocReadOnly,children:"View"}),(0,c.jsx)(l.Z,{variant:"secondary",icon:"feather icon-layers",onClick:this.OnClearFormData,children:"Clear"})]})})}}const p=(0,n.$j)((e=>({data:e.loggedReducer})))(h)},89139:(e,a,s)=>{s.d(a,{Z:()=>R});var t=s(87462),r=s(63366),i=s(81694),l=s.n(i),n=s(72791),o=s(80239),d=s(66543),c=s(10162),h=["bsPrefix","className","as"],p=n.forwardRef((function(e,a){var s=e.bsPrefix,i=e.className,o=e.as,d=(0,r.Z)(e,h);s=(0,c.vE)(s,"navbar-brand");var p=o||(d.href?"a":"span");return n.createElement(p,(0,t.Z)({},d,{ref:a,className:l()(i,s)}))}));p.displayName="NavbarBrand";const m=p;var f=s(73193),x=s(5715),v=["children","bsPrefix"],u=n.forwardRef((function(e,a){var s=e.children,i=e.bsPrefix,l=(0,r.Z)(e,v);return i=(0,c.vE)(i,"navbar-collapse"),n.createElement(x.Z.Consumer,null,(function(e){return n.createElement(f.Z,(0,t.Z)({in:!(!e||!e.expanded)},l),n.createElement("div",{ref:a,className:i},s))}))}));u.displayName="NavbarCollapse";const N=u;var C=s(52134),g=["bsPrefix","className","children","label","as","onClick"],b=n.forwardRef((function(e,a){var s=e.bsPrefix,i=e.className,o=e.children,d=e.label,h=e.as,p=void 0===h?"button":h,m=e.onClick,f=(0,r.Z)(e,g);s=(0,c.vE)(s,"navbar-toggler");var v=(0,n.useContext)(x.Z)||{},u=v.onToggle,N=v.expanded,b=(0,C.Z)((function(e){m&&m(e),u&&u()}));return"button"===p&&(f.type="button"),n.createElement(p,(0,t.Z)({},f,{ref:a,onClick:b,"aria-label":d,className:l()(i,s,!N&&"collapsed")}),o||n.createElement("span",{className:s+"-icon"}))}));b.displayName="NavbarToggle",b.defaultProps={label:"Toggle navigation"};const Z=b;var j=s(20026),y=["bsPrefix","expand","variant","bg","fixed","sticky","className","children","as","expanded","onToggle","onSelect","collapseOnSelect"],w=(0,d.Z)("navbar-text",{Component:"span"}),k=n.forwardRef((function(e,a){var s=(0,o.Ch)(e,{expanded:"onToggle"}),i=s.bsPrefix,d=s.expand,h=s.variant,p=s.bg,m=s.fixed,f=s.sticky,v=s.className,u=s.children,N=s.as,C=void 0===N?"nav":N,g=s.expanded,b=s.onToggle,Z=s.onSelect,w=s.collapseOnSelect,k=(0,r.Z)(s,y),R=(0,c.vE)(i,"navbar"),P=(0,n.useCallback)((function(){Z&&Z.apply(void 0,arguments),w&&g&&b&&b(!1)}),[Z,w,g,b]);void 0===k.role&&"nav"!==C&&(k.role="navigation");var E=R+"-expand";"string"===typeof d&&(E=E+"-"+d);var S=(0,n.useMemo)((function(){return{onToggle:function(){return b&&b(!g)},bsPrefix:R,expanded:!!g}}),[R,g,b]);return n.createElement(x.Z.Provider,{value:S},n.createElement(j.Z.Provider,{value:P},n.createElement(C,(0,t.Z)({ref:a},k,{className:l()(v,R,d&&E,h&&R+"-"+h,p&&"bg-"+p,f&&"sticky-"+f,m&&"fixed-"+m)}),u)))}));k.defaultProps={expand:!0,variant:"light",collapseOnSelect:!1},k.displayName="Navbar",k.Brand=m,k.Toggle=Z,k.Collapse=N,k.Text=w;const R=k}}]);
//# sourceMappingURL=339.f6af5a54.chunk.js.map