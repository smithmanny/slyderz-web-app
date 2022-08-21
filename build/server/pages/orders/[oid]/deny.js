"use strict";
(() => {
var exports = {};
exports.id = 2278;
exports.ids = [2278];
exports.modules = {

/***/ 4880:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DenyOrderPage": () => (/* binding */ DenyOrderPage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_blitz_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9057);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6417);
/* harmony import */ var app_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7255);
/* harmony import */ var app_helpers_dateHelpers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(672);
/* harmony import */ var app_core_components_shared_Box__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(583);
/* harmony import */ var app_core_components_shared_ConsumerContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7488);
/* harmony import */ var app_core_components_shared_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6509);
/* harmony import */ var app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6165);
/* harmony import */ var app_core_layouts_Layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2072);
/* harmony import */ var app_core_components_shared_Divider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4612);












const getServerSideProps = (0,app_blitz_server__WEBPACK_IMPORTED_MODULE_1__/* .gSSP */ .t2)(async function getServerSideProps({ req , res , params  }) {
    const confirmationNumber = String(params?.oid);
    if (!confirmationNumber) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }
    const order = await db__WEBPACK_IMPORTED_MODULE_3__["default"].order.findFirstOrThrow({
        where: {
            confirmationNumber
        },
        select: {
            amount: true,
            confirmationNumber: true,
            eventDate: true,
            eventTime: true,
            orderStatus: true,
            dishes: {
                include: {
                    dish: {
                        select: {
                            description: true,
                            name: true
                        }
                    }
                }
            },
            chefId: true
        }
    });
    if (order.orderStatus !== "PENDING") {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }
    await db__WEBPACK_IMPORTED_MODULE_3__["default"].order.update({
        where: {
            confirmationNumber
        },
        data: {
            orderStatus: "DECLINED"
        }
    });
    const emailData = {
        cartItems: order.dishes.map((d)=>({
                id: String(d.id),
                quantity: d.quantity,
                description: d.dish.description,
                name: d.dish.name
            })),
        orderTotal: order.amount,
        orderNumber: order.confirmationNumber,
        eventTime: order.eventTime,
        eventDate: (0,app_helpers_dateHelpers__WEBPACK_IMPORTED_MODULE_11__/* .readableDate */ .J)(order.eventDate)
    };
    (0,app_helpers__WEBPACK_IMPORTED_MODULE_4__/* .sendOrderResponseEmail */ .By)(emailData, false);
    return {
        props: {
            order
        }
    };
});
const DenyOrderPage = (props)=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_ConsumerContainer__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
        maxWidth: "sm",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(app_core_components_shared_Box__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
            sx: {
                display: "flex",
                flexDirection: "column"
            },
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                    variant: "h6",
                    children: "This order has been declined."
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Divider__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                    sx: {
                        marginBottom: 2
                    }
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Button__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
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
DenyOrderPage.getLayout = (page)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_layouts_Layout__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
        title: "Order not accepted",
        children: page
    });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DenyOrderPage);


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

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

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
var __webpack_exports__ = __webpack_require__.X(0, [2952,1990,1664,1522,2072,9110,4877], () => (__webpack_exec__(4880)));
module.exports = __webpack_exports__;

})();