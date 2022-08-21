"use strict";
(() => {
var exports = {};
exports.id = 2583;
exports.ids = [2583];
exports.modules = {

/***/ 2647:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ authConfig),
/* harmony export */   "p": () => (/* binding */ withBlitz)
/* harmony export */ });
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7897);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _blitzjs_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1990);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__);



const authConfig = {
    cookiePrefix: "blitz-cookie-prefix"
};
const { withBlitz  } = (0,_blitzjs_next__WEBPACK_IMPORTED_MODULE_2__/* .setupBlitzClient */ .qd)({
    plugins: [
        (0,_blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__.AuthClientPlugin)(authConfig),
        (0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_1__.BlitzRpcPlugin)({}), 
    ]
});


/***/ }),

/***/ 9057:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t2": () => (/* binding */ gSSP)
/* harmony export */ });
/* unused harmony exports gSP, api */
/* harmony import */ var _blitzjs_next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1990);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7897);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6417);
/* harmony import */ var _blitz_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2647);





const { gSSP , gSP , api  } = (0,_blitzjs_next__WEBPACK_IMPORTED_MODULE_3__/* .setupBlitzServer */ .te)({
    plugins: [
        (0,_blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__.AuthServerPlugin)({
            ..._blitz_client__WEBPACK_IMPORTED_MODULE_2__/* .authConfig */ .a,
            storage: (0,_blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__.PrismaStorage)(db__WEBPACK_IMPORTED_MODULE_1__["default"]),
            isAuthorized: _blitzjs_auth__WEBPACK_IMPORTED_MODULE_0__.simpleRolesIsAuthorized
        }), 
    ]
});


/***/ }),

/***/ 7488:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var integrations_material_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2868);
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5556);



const SlyderzContainer = (0,integrations_material_ui__WEBPACK_IMPORTED_MODULE_1__/* .styled */ .zo)(_Container__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(({ theme  })=>({
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(0)
        }
    }));
const ConsumerContainer = ({ children , ...props })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(SlyderzContainer, {
        ...props,
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConsumerContainer);


/***/ }),

/***/ 6417:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var blitz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4405);
/* harmony import */ var blitz__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(blitz__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);


const EnhancedPrisma = (0,blitz__WEBPACK_IMPORTED_MODULE_0__.enhancePrisma)(_prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new EnhancedPrisma());


/***/ }),

/***/ 6587:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ConfirmationPage": () => (/* binding */ ConfirmationPage),
  "default": () => (/* binding */ _oid_new),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./app/blitz-server.ts
var blitz_server = __webpack_require__(9057);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: external "@blitzjs/rpc"
var rpc_ = __webpack_require__(5481);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "@blitzjs/auth"
var auth_ = __webpack_require__(7897);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./app/account/mutations/resetCartItemsMutation.ts

const __internal_rpcHandler = rpc_.resolver.pipe(rpc_.resolver.authorize(), async (input, ctx)=>{
    return await ctx.session.$setPublicData({
        cart: {
            pendingCartItems: [],
            total: 0
        }
    });
});
__internal_rpcHandler._resolverName = "resetCartItemsMutation";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/resetCartItemsMutation";
/* harmony default export */ const resetCartItemsMutation = (__internal_rpcHandler);

;// CONCATENATED MODULE: ./public/completed-order.svg
/* harmony default export */ const completed_order = ({"src":"/_next/static/media/completed-order.221eb0b8.svg","height":250,"width":250});
// EXTERNAL MODULE: ./app/core/components/shared/Box.tsx
var Box = __webpack_require__(583);
// EXTERNAL MODULE: ./app/core/components/shared/ConsumerContainer.jsx
var ConsumerContainer = __webpack_require__(7488);
// EXTERNAL MODULE: ./app/core/components/shared/Button.tsx
var Button = __webpack_require__(6509);
// EXTERNAL MODULE: ./app/core/components/shared/Typography.tsx
var Typography = __webpack_require__(6165);
// EXTERNAL MODULE: ./app/core/layouts/Layout.tsx + 9 modules
var Layout = __webpack_require__(2072);
;// CONCATENATED MODULE: ./pages/orders/[oid]/new/index.tsx














const getServerSideProps = (0,blitz_server/* gSSP */.t2)(async function getServerSideProps({ req , res , params  }) {
    const session = await (0,auth_.getSession)(req, res);
    if (!params?.oid) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }
    if (!session.userId) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }
    const confirmationNumber = params.oid;
    // TODO: Redirect if confirmation status is not 'PENDING'
    // check session.userId and order.userId
    // Throw error if it don't match
    return {
        props: {
            confirmationNumber,
            userId: session.userId
        }
    };
});
const ConfirmationPage = (props)=>{
    const router = (0,router_.useRouter)();
    const [resetCartItems] = (0,rpc_.useMutation)(resetCartItemsMutation);
    (0,external_react_.useEffect)(()=>{
        if (!props.userId || !props.confirmationNumber) {
            router.push("/");
            return;
        }
        router.prefetch("/");
        resetCartItems();
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx(ConsumerContainer/* default */.Z, {
        maxWidth: "sm",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* default */.Z, {
            sx: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            },
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                    variant: "h4",
                    sx: {
                        marginBottom: 2,
                        textAlign: "center",
                        textTransform: "capitalize"
                    },
                    children: "Thank you for your order!"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                    src: completed_order,
                    height: 250,
                    width: 250
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                    variant: "h5",
                    align: "center",
                    children: "Your order has been requested. We'll notify you when the chef has confirmed your order."
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                    variant: "caption",
                    align: "center",
                    children: "•Your card will not be charged until the chef confirms your order."
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                    onClick: ()=>router.replace("/"),
                    sx: {
                        p: 2,
                        maxWidth: 400,
                        width: "100%",
                        mt: 2
                    },
                    children: "Go back home"
                })
            ]
        })
    });
};
ConfirmationPage.getLayout = (page)=>/*#__PURE__*/ jsx_runtime_.jsx(Layout/* default */.Z, {
        title: "Order Reserved",
        children: page
    });
/* harmony default export */ const _oid_new = (ConfirmationPage);


/***/ }),

/***/ 7897:
/***/ ((module) => {

module.exports = require("@blitzjs/auth");

/***/ }),

/***/ 5481:
/***/ ((module) => {

module.exports = require("@blitzjs/rpc");

/***/ }),

/***/ 7031:
/***/ ((module) => {

module.exports = require("@date-io/date-fns");

/***/ }),

/***/ 6146:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Add");

/***/ }),

/***/ 1939:
/***/ ((module) => {

module.exports = require("@mui/icons-material/Person");

/***/ }),

/***/ 5692:
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ 3882:
/***/ ((module) => {

module.exports = require("@mui/material/AppBar");

/***/ }),

/***/ 19:
/***/ ((module) => {

module.exports = require("@mui/material/Box");

/***/ }),

/***/ 3819:
/***/ ((module) => {

module.exports = require("@mui/material/Button");

/***/ }),

/***/ 4475:
/***/ ((module) => {

module.exports = require("@mui/material/Container");

/***/ }),

/***/ 3646:
/***/ ((module) => {

module.exports = require("@mui/material/Divider");

/***/ }),

/***/ 5612:
/***/ ((module) => {

module.exports = require("@mui/material/Grid");

/***/ }),

/***/ 7934:
/***/ ((module) => {

module.exports = require("@mui/material/IconButton");

/***/ }),

/***/ 3103:
/***/ ((module) => {

module.exports = require("@mui/material/InputAdornment");

/***/ }),

/***/ 4192:
/***/ ((module) => {

module.exports = require("@mui/material/List");

/***/ }),

/***/ 834:
/***/ ((module) => {

module.exports = require("@mui/material/ListItem");

/***/ }),

/***/ 2101:
/***/ ((module) => {

module.exports = require("@mui/material/ListItemAvatar");

/***/ }),

/***/ 1011:
/***/ ((module) => {

module.exports = require("@mui/material/ListItemButton");

/***/ }),

/***/ 8315:
/***/ ((module) => {

module.exports = require("@mui/material/ListItemText");

/***/ }),

/***/ 1168:
/***/ ((module) => {

module.exports = require("@mui/material/Paper");

/***/ }),

/***/ 5768:
/***/ ((module) => {

module.exports = require("@mui/material/Popover");

/***/ }),

/***/ 8742:
/***/ ((module) => {

module.exports = require("@mui/material/Stack");

/***/ }),

/***/ 1431:
/***/ ((module) => {

module.exports = require("@mui/material/Toolbar");

/***/ }),

/***/ 7163:
/***/ ((module) => {

module.exports = require("@mui/material/Typography");

/***/ }),

/***/ 5574:
/***/ ((module) => {

module.exports = require("@mui/material/colors");

/***/ }),

/***/ 8442:
/***/ ((module) => {

module.exports = require("@mui/material/styles");

/***/ }),

/***/ 8409:
/***/ ((module) => {

module.exports = require("@mui/styles/makeStyles");

/***/ }),

/***/ 4046:
/***/ ((module) => {

module.exports = require("@mui/x-date-pickers/AdapterDateFns");

/***/ }),

/***/ 5753:
/***/ ((module) => {

module.exports = require("@mui/x-date-pickers/LocalizationProvider");

/***/ }),

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 8910:
/***/ ((module) => {

module.exports = require("@tanstack/react-query");

/***/ }),

/***/ 4405:
/***/ ((module) => {

module.exports = require("blitz");

/***/ }),

/***/ 4146:
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),

/***/ 6974:
/***/ ((module) => {

module.exports = require("debug");

/***/ }),

/***/ 2774:
/***/ ((module) => {

module.exports = require("final-form");

/***/ }),

/***/ 7318:
/***/ ((module) => {

module.exports = require("hoist-non-react-statics");

/***/ }),

/***/ 9791:
/***/ ((module) => {

module.exports = require("mdi-material-ui");

/***/ }),

/***/ 9138:
/***/ ((module) => {

module.exports = require("mui-rff");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 580:
/***/ ((module) => {

module.exports = require("prop-types");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 2411:
/***/ ((module) => {

module.exports = require("react-final-form");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 72:
/***/ ((module) => {

module.exports = require("superjson");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2952,1990,1664,5675,1522,2072], () => (__webpack_exec__(6587)));
module.exports = __webpack_exports__;

})();