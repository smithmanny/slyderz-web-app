"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[229],{5229:function(n,e,r){r.d(e,{Z:function(){return sn}});var i=r(5893),t=r(9008),s=r.n(t),o=r(6042),l=r(9396),a=r(1664),c=r.n(a),d=r(1059),h=r(8620),x=r(7294),j=r(3946),p=r(6447),u=r(5398),m=r(155),Z=r(2293),f=r(828),g=r(1163),v=r(2750),b=r(5697),y=r.n(b),C=r(8462),w=r(7212),z=r(8619),k=r(8987),P=r(9334),S=r(6540),_=(0,r(6709)._)({resolverName:"logout",resolverType:"mutation",routePath:"/logout"}),E=r(9534),T=r(4564),R=function(n){var e=n.anchorEl,r=n.children,t=n.handleClose,s=n.name,a=(0,E.Z)(n,["anchorEl","children","handleClose","name"]),c=Boolean(e),d=c?s:void 0;return(0,i.jsx)(T.ZP,(0,l.Z)((0,o.Z)({"aria-labelledby":s,id:d,open:c,anchorEl:e,onClose:t,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"}},a),{children:r}))};R.defaultProps={name:"Popover"},R.propTypes={anchorEl:y().element.isRequired,handleClose:y().func.isRequired,name:y().string};var A=R,D=[{id:0,icon:S.Z,name:"Account",route:"/account"}],B=function(n){var e=(0,f.Z)((0,v.Db)(_),1)[0],r=(0,g.useRouter)();return(0,i.jsx)(A,(0,l.Z)((0,o.Z)({},n),{children:(0,i.jsxs)(C.Z,{children:[D.map((function(e){return(0,i.jsxs)(z.Z,{onClick:function(){return i=e.route,r.push(i),void n.onClose();var i},children:[(0,i.jsx)(k.Z,{children:(0,i.jsx)(u.Z,{fontSize:"large"})}),(0,i.jsx)(P.Z,{primary:e.name,sx:{"& span":{fontWeight:"500"}}})]},e.id)})),(0,i.jsx)(w.ZP,{button:!0,onClick:function(){return e()},children:(0,i.jsx)(P.Z,{primary:"Sign out",sx:{"& span":{fontWeight:"500"}}})})]})}))};B.defaultProps={anchorEl:null,id:null},B.propTypes={id:y().string,onClose:y().func.isRequired,open:y().bool.isRequired,anchorEl:y().element};var L=B,W=r(6509),q=r(7357),I=r(5861),N=function(n){var e=(0,d.u)(),r=(0,x.useState)(null),t=r[0],s=r[1],a=Boolean(t),f=a?"account-popover":null,g=function(){s(null)},v=function(n){s(n.currentTarget)};return(0,i.jsx)(Z.Z,(0,l.Z)((0,o.Z)({position:"static",sx:{backgroundColor:"transparent",mb:4}},n),{children:(0,i.jsx)(m.Z,{children:(0,i.jsxs)(q.Z,{sx:{display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center"},children:[(0,i.jsx)(c(),{href:"/",children:(0,i.jsx)("a",{children:(0,i.jsx)(I.Z,{variant:"h5",children:"Slyderz"})})}),(0,i.jsx)("div",{children:e.userId?(0,i.jsx)("span",{children:(0,i.jsxs)(p.Z,{direction:"row",spacing:2,children:[(0,i.jsx)(W.Z,{variant:"text",color:"white",children:"Dashboard"}),(0,i.jsx)(j.Z,{"aria-label":"cart",disableRipple:!0,onClick:v,size:"large",children:(0,i.jsx)(u.Z,{fontSize:"large"})}),(0,i.jsx)(L,{id:f,open:a,onClose:g,anchorEl:t})]})}):(0,i.jsx)("span",{children:(0,i.jsxs)(p.Z,{direction:"row",spacing:2,children:[(0,i.jsx)(c(),{href:h.Z.LoginPage(),children:(0,i.jsx)(W.Z,{variant:"contained",component:"a",children:"Log in"})}),(0,i.jsx)(c(),{href:h.Z.SignupPage(),children:(0,i.jsx)(W.Z,{variant:"contained",component:"a",children:"Sign up"})})]})})})]})})}))},F=r(4924),O=r(7109),H=r(2255),J=r(5233),G=r(8143),K=r(3410),M=r(6824),Q=r(3156),U=r(7720),V=r(6886),X=r(5113),Y=r(7677),$=(0,M.zo)("div")((function(n){var e=n.theme;return{backgroundColor:e.palette.primary.dark,marginTop:e.spacing(4),padding:e.spacing(6,0)}})),nn=((0,M.zo)("span")((function(n){var e,r=n.theme;return e={},(0,F.Z)(e,r.breakpoints.up("md"),{flexDirection:"row"}),(0,F.Z)(e,"display","flex"),(0,F.Z)(e,"flexDirection","column"),e})),(0,M.zo)("div")((function(n){return{"& span":{marginLeft:"auto"},"& h6":{fontSize:"16px"},alignItems:"center",display:"flex",color:"white",marginTop:n.theme.spacing(2)}}))),en=(0,M.zo)("ul")((function(n){return{"& a":{color:"rgba(255, 255, 255, 0.2)"},"& a:hover":{color:"rgba(255, 255, 255, 0.7)",cursor:"pointer"},"& li":{"& svg":{fontSize:"32px"},marginRight:n.theme.spacing(3)},display:"flex",listStyle:"none"}})),rn=(0,M.zo)("table")((function(n){var e=n.theme;return{"& a:hover":{cursor:"pointer",textDecoration:"underline"},"& th":{textTransform:"uppercase","& h6":{fontSize:"14px"}},"& tr":{display:"flex",fontWeight:500,marginBottom:e.spacing(2),justifyContent:"space-between"},color:"white",marginBottom:e.spacing(2),marginTop:e.spacing(4),width:"100%"}})),tn=function(){return(0,i.jsx)($,{children:(0,i.jsx)(Q.Z,{children:(0,i.jsxs)(V.ZP,{container:!0,sx:{flexDirection:{xs:"row",md:"row-reverse"}},spacing:2,children:[(0,i.jsx)(V.ZP,{item:!0,xs:12,md:6,children:(0,i.jsxs)(X.Z,{sx:{ml:{md:"auto"},maxWidth:"500px",padding:3},children:[(0,i.jsxs)(I.Z,{sx:{mb:3},color:"primary",variant:"h6",children:["We\u2019re cooking up something delicious.",(0,i.jsx)("br",{}),"Sign up to find out more."]}),(0,i.jsx)(Y.ZP,{onSubmit:{},children:(0,i.jsxs)(V.ZP,{container:!0,spacing:2,children:[(0,i.jsx)(Y.nv,{name:"email",variant:"outlined",label:"email",placeholder:"Email",InputProps:{startAdornment:(0,i.jsx)(O.Z,{position:"start",children:(0,i.jsx)(H.Z,{})})},xs:12,md:7}),(0,i.jsx)(V.ZP,{item:!0,xs:12,md:5,textAlign:"right",children:(0,i.jsx)(W.Z,{color:"primary",sx:{padding:2,width:{xs:"100%"}},variant:"contained",type:"submit",children:"Find a Chef"})})]})})]})}),(0,i.jsx)(V.ZP,{item:!0,xs:12,md:6,children:(0,i.jsx)(rn,{children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{children:(0,i.jsx)(I.Z,{variant:"h6",children:"Company"})}),(0,i.jsx)("th",{children:(0,i.jsx)(I.Z,{variant:"h6",children:"Chefs"})}),(0,i.jsx)("th",{children:(0,i.jsx)(I.Z,{variant:"h6",children:"Support"})}),(0,i.jsx)("th",{children:(0,i.jsx)(I.Z,{variant:"h6",children:"Cities"})})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)(c(),{href:"/about",children:(0,i.jsx)(I.Z,{variant:"body1",component:"a",children:"About"})})}),(0,i.jsx)("td",{children:(0,i.jsx)(c(),{href:"/become-a-chef",children:(0,i.jsx)(I.Z,{variant:"body1",component:"a",children:"Join Slyderz"})})}),(0,i.jsx)("td",{children:(0,i.jsx)(I.Z,{variant:"body1",children:"Consumer Help"})}),(0,i.jsx)("td",{children:(0,i.jsx)(I.Z,{variant:"body1",children:"Atlanta"})})]}),(0,i.jsx)("tr",{children:(0,i.jsx)("td",{children:(0,i.jsx)(c(),{href:"/contact",children:(0,i.jsx)(I.Z,{variant:"body1",component:"a",children:"Contact"})})})}),(0,i.jsx)("tr",{children:(0,i.jsx)("td",{children:(0,i.jsx)(I.Z,{variant:"body1",children:"Blog"})})}),(0,i.jsx)("tr",{children:(0,i.jsx)("td",{children:(0,i.jsx)(c(),{href:"/terms-and-conditions",children:(0,i.jsx)(I.Z,{variant:"body1",component:"a",children:"Terms"})})})}),(0,i.jsx)("tr",{children:(0,i.jsx)("td",{children:(0,i.jsx)(I.Z,{variant:"body1",children:"Privacy"})})})]})})}),(0,i.jsx)(V.ZP,{item:!0,xs:12,children:(0,i.jsx)(U.Z,{sx:{backgroundColor:"rgba(255, 255, 255, 0.2)"}})}),(0,i.jsx)(V.ZP,{item:!0,xs:12,children:(0,i.jsxs)(nn,{children:[(0,i.jsx)(I.Z,{variant:"h6",children:"\xa9 2020 Slyderz LLC"}),(0,i.jsx)("span",{children:(0,i.jsxs)(en,{children:[(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"https://www.facebook.com/slyderz",target:"__blank",children:(0,i.jsx)(J.Z,{})})}),(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"https://twitter.com/SlyderzApp",target:"__blank",children:(0,i.jsx)(G.Z,{})})}),(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"https://www.instagram.com/slyderz_app/",target:"__blank",children:(0,i.jsx)(K.Z,{})})})]})})]})})]})})})},sn=function(n){var e=n.title,r=n.children;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(s(),{children:[(0,i.jsx)("title",{children:e||"blitz-slyderz"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,i.jsx)(N,{}),(0,i.jsx)("main",{children:r}),(0,i.jsx)(tn,{})]})}}}]);