(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[273],{3965:function(e,t,n){"use strict";n.d(t,{Z:function(){return x}});var r=n(3366),i=n(7462),o=n(7294),a=n(6010),s=n(4780),c=n(1657),l=n(948),u=n(4867);function d(e){return(0,u.Z)("MuiCardMedia",e)}(0,n(1588).Z)("MuiCardMedia",["root","media","img"]);var h=n(5893);const m=["children","className","component","image","src","style"],f=(0,l.ZP)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e,{isMediaComponent:r,isImageComponent:i}=n;return[t.root,r&&t.media,i&&t.img]}})((({ownerState:e})=>(0,i.Z)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},e.isMediaComponent&&{width:"100%"},e.isImageComponent&&{objectFit:"cover"}))),v=["video","audio","picture","iframe","img"],p=["picture","img"];var x=o.forwardRef((function(e,t){const n=(0,c.Z)({props:e,name:"MuiCardMedia"}),{children:o,className:l,component:u="div",image:x,src:g,style:y}=n,b=(0,r.Z)(n,m),Z=-1!==v.indexOf(u),j=!Z&&x?(0,i.Z)({backgroundImage:`url("${x}")`},y):y,w=(0,i.Z)({},n,{component:u,isMediaComponent:Z,isImageComponent:-1!==p.indexOf(u)}),A=(e=>{const{classes:t,isMediaComponent:n,isImageComponent:r}=e,i={root:["root",n&&"media",r&&"img"]};return(0,s.Z)(i,d,t)})(w);return(0,h.jsx)(f,(0,i.Z)({className:(0,a.Z)(A.root,l),as:u,role:!Z&&x?"img":void 0,ref:t,style:j,ownerState:w,src:Z?x||g:void 0},b,{children:o}))}))},5848:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/chefs/chef/[cid]",function(){return n(5771)}])},3669:function(e,t,n){"use strict";n.d(t,{Z:function(){return z}});var r=n(943);var i=n(3375);var o=n(1566);function a(e){return function(e){if(Array.isArray(e))return(0,r.Z)(e)}(e)||(0,i.Z)(e)||(0,o.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var s=n(5893),c=n(1664),l=n.n(c),u=n(1059),d=n(8620),h=n(7294),m=n(5697),f=n.n(m),v=n(7577),p=n(6824),x=n(7255),g=n(7677),y=n(6509),b=n(5861),Z=n(828),j=n(2750),w=n(6709),A=(0,w._)({resolverName:"destroyMenuItem",resolverType:"mutation",routePath:"/destroyMenuItem"}),C=(0,w._)({resolverName:"decreaseMenuItemQuantity",resolverType:"mutation",routePath:"/decreaseMenuItemQuantity"}),k=(0,w._)({resolverName:"increaseMenuItemQuantity",resolverType:"mutation",routePath:"/increaseMenuItemQuantity"}),D=n(7720),I=n(6886),P=(0,p.zo)("div")({alignItems:"center",display:"flex"}),S=function(e){var t=e.selectedCartItems,n=(0,Z.Z)((0,j.Db)(A),1)[0],r=(0,Z.Z)((0,j.Db)(C),1)[0],i=(0,Z.Z)((0,j.Db)(k),1)[0];return t.map((function(e){return(0,s.jsxs)("span",{children:[(0,s.jsxs)(I.ZP,{container:!0,sx:{alignItems:"center",flexDirection:"row",paddingTop:2},children:[(0,s.jsx)(I.ZP,{item:!0,xs:4,children:(0,s.jsx)(b.Z,{variant:"body2",children:e.name})}),(0,s.jsx)(I.ZP,{item:!0,xs:!0,children:(0,s.jsxs)(P,{children:[(0,s.jsx)(y.Z,{variant:"text",onClick:function(){return r({id:e.id,quantity:1})},children:"-"}),(0,s.jsx)(y.Z,{variant:"text",onClick:function(){return i({id:e.id,quantity:1})},children:"+"}),(0,s.jsxs)(b.Z,{children:["x",e.quantity]})]})}),(0,s.jsx)(I.ZP,{item:!0,xs:!0,children:(0,s.jsxs)(b.Z,{sx:{float:"right"},children:["$",e.quantity*e.price]})})]},e.id),(0,s.jsx)(y.Z,{variant:"text",size:"small",onClick:function(){return n({menuItemId:e.id})},children:"Delete"}),(0,s.jsx)(D.Z,{})]},e.id)}))},T=(0,p.zo)("div")({padding:2}),M=(0,p.zo)("div")({width:"100%"}),R=function(e){var t,n,r,i,o,c,u,m,f,p=(0,v.cl)(),Z=a(x.jg).concat(a(x.$K)),j=null===(t=p.values)||void 0===t?void 0:t.eventDate,w=null===j||void 0===j?void 0:j.getDay();if(!e.checkoutPage){var A=e.hours.find((function(e){return e.daysOfWeek.find((function(e){return(0,x.bD)(e)===w}))}));o=Z.find((function(e){return e.key===(null===A||void 0===A?void 0:A.startTime)})),c=Z.indexOf(o),u=Z.find((function(e){return e.key===(null===A||void 0===A?void 0:A.endTime)})),m=Z.indexOf(u),f=Z.slice(c,m+1)}return(0,s.jsxs)(h.Fragment,{children:[!e.checkoutPage&&(0,s.jsxs)(h.Fragment,{children:[(0,s.jsx)(b.Z,{variant:"subtitle1",children:"Date"}),(0,s.jsx)(g.Mt,{name:"eventDate",disablePast:!0,required:!0,views:["month","day"],inputVariant:"outlined",shouldDisableDate:function(t){var n=[];return e.hours.map((function(e){return e.daysOfWeek.map((function(e){var t=(0,x.bD)(e);n.push(t)}))})),[0,1,2,3,4,5,6].filter((function(e){return!n.includes(e)})).includes(t.getDay())}}),(0,s.jsx)(b.Z,{variant:"subtitle1",children:"Time"}),(0,s.jsx)(g.Ph,{name:"eventTime",items:f,required:!0})]}),(null===(n=e.cartItems)||void 0===n?void 0:n.length)>0&&(0,s.jsxs)(M,{children:[(0,s.jsx)(b.Z,{variant:"h6",sx:{mt:4,fontWeight:"545"},children:"Your Items"}),(0,s.jsx)(S,{selectedCartItems:e.cartItems}),(0,s.jsxs)(b.Z,{variant:"h6",sx:{my:4},children:["Total: ",(0,x.vx)(e.total)]}),e.buttonText&&(0,s.jsx)(l(),{href:d.Z.Checkout({cid:1,eventDate:j&&new Date(j).toISOString(),eventTime:null===(r=p.values)||void 0===r?void 0:r.eventTime}),children:(0,s.jsx)(y.Z,{variant:"contained",color:"primary",size:"large",disabled:!j||!(null===(i=p.values)||void 0===i?void 0:i.eventTime),children:e.buttonText})})]})]})},N=function(e){var t,n,r,i,o=(0,u.u)(),a=e.checkoutPage,c=e.buttonText,l=e.dishes,d=null===o||void 0===o||null===(t=o.cart)||void 0===t?void 0:t.pendingCartItems,h=(null===o||void 0===o||null===(n=o.cart)||void 0===n?void 0:n.total)||0,m=null===(r=l[0])||void 0===r||null===(i=r.chef)||void 0===i?void 0:i.hours;return(0,s.jsx)(T,{children:(0,s.jsxs)(g.ZP,{children:[c&&(0,s.jsx)(b.Z,{fontWeight:"550",variant:"h5",children:"Your Reservation"}),(0,s.jsx)(R,{buttonText:c,checkoutPage:a,cartItems:d,hours:m,total:h})]})})};N.defaultProps={checkoutPage:!1,dishes:[]},N.PropTypes={checkoutPage:f().bool,dishes:f().array};var z=N},7488:function(e,t,n){"use strict";var r=n(4924),i=n(6042),o=n(9396),a=n(9534),s=n(5893),c=n(6824),l=n(3156),u=(0,c.zo)(l.Z)((function(e){var t=e.theme;return(0,r.Z)({},t.breakpoints.up("md"),{padding:t.spacing(0)})}));t.Z=function(e){var t=e.children,n=(0,a.Z)(e,["children"]);return(0,s.jsx)(u,(0,o.Z)((0,i.Z)({},n),{children:t}))}},1169:function(e,t,n){"use strict";var r=n(5893),i=n(5697),o=n.n(i),a=n(4666),s=n(1425),c=n(6580),l=n(7645),u=function(e){var t=e.actions,n=e.children,i=e.size,o=e.title,u=e.show,d=e.closeModal;return(0,r.jsxs)(a.Z,{open:u,onClose:d,"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",fullWidth:!0,maxWidth:i,scroll:"paper",children:[o&&(0,r.jsx)(l.Z,{id:"modal-title",children:o}),(0,r.jsx)(c.Z,{children:n}),t&&(0,r.jsx)(s.Z,{children:t})]})};u.defaultProps={actions:null,size:"sm",title:""},u.propTypes={actions:o().element,closeModal:o().func.isRequired,size:o().oneOf(["xs","sm","md","lg","xl"]),show:o().bool.isRequired,title:o().string},t.Z=u},7255:function(e,t,n){"use strict";n.d(t,{$K:function(){return a},KY:function(){return s},bD:function(){return c},jg:function(){return o},vx:function(){return r}});var r=function(e){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"USD"}).format(e)},i=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"AM",t=12,n=[],r=1;r<=t;r++)for(var i=0;i<60;i+=30){new Date;var o="".concat(r,":").concat(i," ").concat(e);0===i&&(o="".concat(r,":").concat(i,"0 ").concat(e));var a={key:o,value:o};n.push(a)}return n},o=i(),a=i("PM"),s=[{label:"Sunday",value:"SUNDAY"},{label:"Monday",value:"MONDAY"},{label:"Tuesday",value:"TUESDAY"},{label:"Wednesday",value:"WEDNESDAY"},{label:"Thursday",value:"THURSDAY"},{label:"Friday",value:"FRIDAY"},{label:"Saturday",value:"SATURDAY"}],c=function(e){return{SUNDAY:0,MONDAY:1,TUESDAY:2,WEDNESDAY:3,THURSDAY:4,FRIDAY:5,SATURDAY:6}[e]}},5771:function(e,t,n){"use strict";n.r(t),n.d(t,{ChefPage:function(){return ge},default:function(){return ye}});var r=n(6042),i=n(9396),o=n(9534),a=n(828),s=n(7297),c=n(5893),l=n(5675),u=n.n(l),d=n(2750),h=n(1163),m=n(7294),f={src:"/_next/static/media/logo.f0bc5c0b.png",height:370,width:800,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAIAAAA8r+mnAAAAXUlEQVR42mXLsQ5AMBCA4b7/ixiNBpvY6CQmBiRCpZFUmqveuaO7f/4/RSh2p/eXAk9F5vzF0xCXMa4zuvOJNytrQpmb5HQNbQVdE3odjo1UUtagiATgNBIJeCaUD69tWj+27iBKAAAAAElFTkSuQmCC"},v=n(6824),p=n(6709),x=(0,p._)({resolverName:"chefDishesQuery",resolverType:"query",routePath:"/chefDishesQuery"}),g=n(3366),y=n(7462),b=n(6010),Z=n(4780),j=n(948),w=n(1657),A=(0,n(8169).Z)((0,c.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),C=n(4867);function k(e){return(0,C.Z)("MuiAvatar",e)}(0,n(1588).Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);const D=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],I=(0,j.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],n.colorDefault&&t.colorDefault]}})((({theme:e,ownerState:t})=>(0,y.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===t.variant&&{borderRadius:(e.vars||e).shape.borderRadius},"square"===t.variant&&{borderRadius:0},t.colorDefault&&(0,y.Z)({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:{backgroundColor:"light"===e.palette.mode?e.palette.grey[400]:e.palette.grey[600]})))),P=(0,j.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),S=(0,j.ZP)(A,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"});var T,M=m.forwardRef((function(e,t){const n=(0,w.Z)({props:e,name:"MuiAvatar"}),{alt:r,children:i,className:o,component:a="div",imgProps:s,sizes:l,src:u,srcSet:d,variant:h="circular"}=n,f=(0,g.Z)(n,D);let v=null;const p=function({crossOrigin:e,referrerPolicy:t,src:n,srcSet:r}){const[i,o]=m.useState(!1);return m.useEffect((()=>{if(!n&&!r)return;o(!1);let i=!0;const a=new Image;return a.onload=()=>{i&&o("loaded")},a.onerror=()=>{i&&o("error")},a.crossOrigin=e,a.referrerPolicy=t,a.src=n,r&&(a.srcset=r),()=>{i=!1}}),[e,t,n,r]),i}((0,y.Z)({},s,{src:u,srcSet:d})),x=u||d,j=x&&"error"!==p,A=(0,y.Z)({},n,{colorDefault:!j,component:a,variant:h}),C=(e=>{const{classes:t,variant:n,colorDefault:r}=e,i={root:["root",n,r&&"colorDefault"],img:["img"],fallback:["fallback"]};return(0,Z.Z)(i,k,t)})(A);return v=j?(0,c.jsx)(P,(0,y.Z)({alt:r,src:u,srcSet:d,sizes:l,ownerState:A,className:C.img},s)):null!=i?i:x&&r?r[0]:(0,c.jsx)(S,{className:C.fallback}),(0,c.jsx)(I,(0,y.Z)({as:a,ownerState:A,className:(0,b.Z)(C.root,o),ref:t},f,{children:v}))})),R=n(7488),N=n(3965),z=n(6242),O=n(4267),q=n(7357),E=n(6886),U=n(5861),_=n(7568),F=n(4051),Y=n.n(F),Q=new Uint8Array(16);function W(){if(!T&&!(T="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return T(Q)}var V=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var B=function(e){return"string"===typeof e&&V.test(e)},H=[],$=0;$<256;++$)H.push(($+256).toString(16).substr(1));var X=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(H[e[t+0]]+H[e[t+1]]+H[e[t+2]]+H[e[t+3]]+"-"+H[e[t+4]]+H[e[t+5]]+"-"+H[e[t+6]]+H[e[t+7]]+"-"+H[e[t+8]]+H[e[t+9]]+"-"+H[e[t+10]]+H[e[t+11]]+H[e[t+12]]+H[e[t+13]]+H[e[t+14]]+H[e[t+15]]).toLowerCase();if(!B(n))throw TypeError("Stringified UUID is invalid");return n};var K=function(e,t,n){var r=(e=e||{}).random||(e.rng||W)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){n=n||0;for(var i=0;i<16;++i)t[n+i]=r[i];return t}return X(r)},L=n(5697),J=n.n(L),G=(0,p._)({resolverName:"createMenuItemOnCart",resolverType:"mutation",routePath:"/createMenuItemOnCart"}),ee=n(1169),te=n(6509),ne=(0,v.zo)("div")((function(e){return{display:"flex",alignItems:"center",marginRight:e.theme.spacing(2)}})),re=(0,v.zo)("div")((function(e){return{marginBottom:e.theme.spacing(2),position:"relative",height:"250px",width:"100%"}})),ie=(0,v.zo)("div")({minHeight:"500px"}),oe=function(e){var t=e.show,n=e.onClose,s=e.menuItem,l=(0,o.Z)(e,["show","onClose","menuItem"]),h=(0,a.Z)((0,d.Db)(G),1)[0],f=(0,m.useState)(1),v=f[0],p=f[1],x=function(){var e=(0,_.Z)(Y().mark((function e(){var t;return Y().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={id:K(),dishId:s.id,description:s.description,chefId:s.chefId,name:s.name,price:Number(s.price),quantity:v},e.prev=1,e.next=4,h(t);case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),console.error("Error adding menu item to cart",e.t0);case 9:return e.prev=9,n(),p(1),e.finish(9);case 13:case"end":return e.stop()}}),e,null,[[1,6,9,13]])})));return function(){return e.apply(this,arguments)}}();return s?(0,c.jsx)(ee.Z,(0,i.Z)((0,r.Z)({closeModal:n,show:t,size:"xs",actions:(0,c.jsxs)(m.Fragment,{children:[(0,c.jsxs)(ne,{children:[(0,c.jsx)(te.Z,{variant:"text",onClick:function(){p((function(e){return 1===e?1:e-=1}))},children:"-"}),(0,c.jsx)(U.Z,{sx:{px:1},children:v}),(0,c.jsx)(te.Z,{variant:"text",onClick:function(){p((function(e){return e+1}))},children:"+"})]}),(0,c.jsx)(te.Z,{color:"primary",variant:"contained",onClick:x,children:s&&"Add To Cart - $".concat(s.price*v)})]})},l),{children:(0,c.jsxs)(ie,{children:[(0,c.jsx)(re,{children:(0,c.jsx)(u(),{src:"/logo.png",layout:"fill"})}),(0,c.jsx)(U.Z,{variant:"h6",children:s.name}),(0,c.jsx)(U.Z,{sx:{my:2},children:"There was a feature request in my current company, product team requested a table component which should order columns in ascending or descending way when clicking the column\u2019s title. At the end of this post, you\u2019ll see the working POC. There may be so many things to improve in the aspect of code quality but do not forget, this is just a POC. I\u2019m looking forward to your responses to the code."}),(0,c.jsxs)("section",{children:[(0,c.jsx)(U.Z,{variant:"subtitle1",sx:{fontWeight:"bold",fontSize:".95rem"},children:"What's Included:"}),(0,c.jsx)(U.Z,{children:"3 Course meal"})]})]})})):null};oe.propTypes={show:J().bool.isRequired,onClose:J().func.isRequired};var ae=oe,se=n(3669);function ce(){var e=(0,s.Z)(["\n  & .MuiCardMedia-img {\n    object-fit: contain;\n  }\n"]);return ce=function(){return e},e}var le=(0,v.zo)(N.Z)(ce()),ue=function(e){var t=e.dishes,n=(0,m.useState)(null),r=n[0],i=n[1],o=(0,m.useState)(!1),a=o[0],s=o[1],l=(0,m.useCallback)((function(e){i(e),s(!0)}),[]),u=(0,m.useCallback)((function(){s(!1),i(null)}),[]);return(0,c.jsxs)(E.ZP,{container:!0,spacing:2,sx:{p:1,flexDirection:{xs:"column-reverse",md:"row"}},children:[(0,c.jsx)(E.ZP,{item:!0,xs:12,md:8,children:(0,c.jsx)(E.ZP,{container:!0,item:!0,spacing:2,children:t.map((function(e,t){return(0,c.jsx)(E.ZP,{item:!0,xs:12,children:(0,c.jsxs)(z.Z,{sx:{display:"flex",justifyContent:"space-between"},onClick:function(){return l(e)},children:[(0,c.jsx)(q.Z,{sx:{display:"flex",flexDirection:"column"},children:(0,c.jsxs)(O.Z,{sx:{flex:"1 0 auto"},children:[(0,c.jsx)(U.Z,{variant:"body1",children:e.name}),(0,c.jsxs)(U.Z,{variant:"subtitle1",color:"text.secondary",children:["$",e.price]}),(0,c.jsx)(U.Z,{variant:"subtitle2",color:"text.secondary",children:(n="There was a feature request in my current company, product team requested a table component which should order columns in ascending or descending way when clicking the column\u2019s title. At the end of this post, you\u2019ll see the working POC. There may be so many things to improve in the aspect of code quality but do not forget, this is just a POC. I\u2019m looking forward to your responses to the code.","".concat(n.substring(0,20),"..."))})]})}),(0,c.jsx)(le,{component:"img",sx:{width:75,mr:2},image:"/logo.png",alt:"Live from space album cover"})]})},t);var n}))})}),(0,c.jsx)(E.ZP,{item:!0,xs:12,md:4,children:(0,c.jsx)(se.Z,{buttonText:"Checkout",dishes:t})}),r&&(0,c.jsx)(ae,{"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",menuItem:r,show:a,onClose:u})]})},de=n(1703),he=n(44),me=n(5229);function fe(){var e=(0,s.Z)(["\n  & .MuiAvatar-img {\n    object-position: top center;\n  }\n"]);return fe=function(){return e},e}var ve=(0,v.zo)(M)(fe());function pe(e){var t=e.children,n=e.value,a=e.index,s=(0,o.Z)(e,["children","value","index"]);return(0,c.jsx)("div",(0,i.Z)((0,r.Z)({role:"tabpanel",hidden:n!==a,id:"slyderz-tabpanel-".concat(a),"aria-labelledby":"simple-tab-".concat(a)},s),{children:n===a&&(0,c.jsx)(m.Fragment,{children:t})}))}function xe(e){return{id:"slyderz-tab-".concat(e),"aria-controls":"slyderz-tabpanel-".concat(e)}}var ge=function(e){var t=(0,h.useRouter)(),n=(0,a.Z)(m.useState(0),2),i=n[0],o=n[1],s=t.query.cid,l=(0,a.Z)((0,d.aM)(x,{chefId:Number(s)}),1)[0];return(0,c.jsx)(R.Z,{children:(0,c.jsxs)(E.ZP,{container:!0,children:[(0,c.jsx)(E.ZP,{item:!0,xs:12,sx:{mb:4},children:(0,c.jsx)("div",{style:{height:250,maxHeight:250,width:"100%",position:"relative"},children:(0,c.jsx)(u(),{src:f,layout:"fill",objectFit:"cover"})})}),(0,c.jsx)(E.ZP,{item:!0,xs:12,children:(0,c.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,c.jsx)(ve,{alt:"Remy Sharp",sx:{height:75,width:75,mb:2},src:"/profile_pic.jpeg"}),(0,c.jsx)(U.Z,{variant:"h1",children:"Shakhor Smith"}),(0,c.jsxs)(de.Z,{value:i,onChange:function(e,t){o(t)},"aria-label":"Chef tabs",sx:{my:4},children:[(0,c.jsx)(he.Z,(0,r.Z)({label:"Menu"},xe(0))),(0,c.jsx)(he.Z,(0,r.Z)({label:"Hours"},xe(1))),(0,c.jsx)(he.Z,(0,r.Z)({label:"Photos"},xe(2)))]})]})}),(0,c.jsxs)(E.ZP,{item:!0,xs:!0,children:[(0,c.jsx)(pe,{value:i,index:0,children:(0,c.jsx)(ue,{dishes:l})}),(0,c.jsx)(pe,{value:i,index:1,children:"Item Two"}),(0,c.jsx)(pe,{value:i,index:2,children:"Item Three"})]})]})})};ge.getLayout=function(e){return(0,c.jsx)(me.Z,{title:"Dashboard",children:e})};var ye=ge},7297:function(e,t,n){"use strict";function r(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}n.d(t,{Z:function(){return r}})}},function(e){e.O(0,[997,101,675,229,774,888,179],(function(){return t=5848,e(e.s=t);var t}));var t=e.O();_N_E=t}]);