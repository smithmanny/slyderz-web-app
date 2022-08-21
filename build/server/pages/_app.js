"use strict";
(() => {
var exports = {};
exports.id = 2888;
exports.ids = [2888];
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

/***/ 4290:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* reexport */ (CircularProgress_default()))
});

;// CONCATENATED MODULE: external "@mui/material/CircularProgress"
const CircularProgress_namespaceObject = require("@mui/material/CircularProgress");
var CircularProgress_default = /*#__PURE__*/__webpack_require__.n(CircularProgress_namespaceObject);
;// CONCATENATED MODULE: ./app/core/components/shared/CircularProgress.js



/***/ }),

/***/ 100:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ redux)
});

;// CONCATENATED MODULE: external "@reduxjs/toolkit"
const toolkit_namespaceObject = require("@reduxjs/toolkit");
;// CONCATENATED MODULE: ./integrations/redux/reducers/modalReducer.js

const initialState = {
    isModalOpen: false,
    menuItemModalOpen: false
};
const modal = (0,toolkit_namespaceObject.createSlice)({
    name: "modal",
    initialState: {
        ...initialState
    },
    reducers: {
        openMenuItemModal: (state)=>{
            state.menuItemModalOpen = true;
            state.isModalOpen = true;
        },
        closeModal: (state)=>{
            return initialState;
        }
    }
});
// Extract the action creators object and the reducer
const { actions , reducer  } = modal;
// Extract and export each action creator by name
const { openMenuItemModal , closeModal  } = actions;
// Export the reducer, either as a default or named export
/* harmony default export */ const modalReducer = (reducer); // export const decreaseMenuItem = () => async(dispatch, getState) => {
 //   const {
 //     menuItem: { quantity },
 //   } = getState();
 //   if (quantity === 1) {
 //     dispatch(resetQuantity())
 //   } else {
 //     dispatch(decreaseQuantity())
 //   }
 // }

;// CONCATENATED MODULE: ./integrations/redux/index.js


const store = (0,toolkit_namespaceObject.configureStore)({
    reducer: (0,toolkit_namespaceObject.combineReducers)({
        modals: modalReducer
    })
});
/* harmony default export */ const redux = (store);


/***/ }),

/***/ 5656:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "reportWebVitals": () => (/* reexport safe */ next_axiom__WEBPACK_IMPORTED_MODULE_13__.reportWebVitals)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var blitz__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4405);
/* harmony import */ var blitz__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(blitz__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_blitz_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2647);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _blitzjs_next__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1990);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4960);
/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var integrations_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(100);
/* harmony import */ var integrations_material_ui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2868);
/* harmony import */ var app_auth_components_LoginForm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9976);
/* harmony import */ var app_core_components_shared_Box__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(583);
/* harmony import */ var app_core_components_shared_CircularProgress__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(4290);
/* harmony import */ var next_axiom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(2930);
/* harmony import */ var next_axiom__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_axiom__WEBPACK_IMPORTED_MODULE_13__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([app_auth_components_LoginForm__WEBPACK_IMPORTED_MODULE_10__]);
app_auth_components_LoginForm__WEBPACK_IMPORTED_MODULE_10__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];















function LoadingIcon() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Box__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
        sx: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_CircularProgress__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
            size: 250
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,app_blitz_client__WEBPACK_IMPORTED_MODULE_3__/* .withBlitz */ .p)(function App({ Component , pageProps  }) {
    const getLayout = Component.getLayout || ((page)=>page);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_redux__WEBPACK_IMPORTED_MODULE_7__.Provider, {
        store: integrations_redux__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material_styles__WEBPACK_IMPORTED_MODULE_5__.StyledEngineProvider, {
            injectFirst: true,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material_styles__WEBPACK_IMPORTED_MODULE_5__.ThemeProvider, {
                theme: integrations_material_ui__WEBPACK_IMPORTED_MODULE_9__/* .theme */ .rS,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_6___default()), {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blitzjs_next__WEBPACK_IMPORTED_MODULE_14__/* .ErrorBoundary */ .SV, {
                        FallbackComponent: RootErrorFallback,
                        onReset: (0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_4__.useQueryErrorResetBoundary)().reset,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
                            fallback: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(LoadingIcon, {}),
                            children: getLayout(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                                ...pageProps
                            }))
                        })
                    })
                ]
            })
        })
    });
}));
function RootErrorFallback({ error , resetErrorBoundary  }) {
    if (error instanceof blitz__WEBPACK_IMPORTED_MODULE_2__.AuthenticationError) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_auth_components_LoginForm__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
            onSuccess: resetErrorBoundary
        });
    } else if (error instanceof blitz__WEBPACK_IMPORTED_MODULE_2__.AuthorizationError) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blitzjs_next__WEBPACK_IMPORTED_MODULE_14__/* .ErrorComponent */ .qz, {
            statusCode: error.statusCode,
            title: "Sorry, you are not authorized to access this"
        });
    } else {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_blitzjs_next__WEBPACK_IMPORTED_MODULE_14__/* .ErrorComponent */ .qz, {
            statusCode: error.statusCode || 400,
            title: error.message || error.name
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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

/***/ 5692:
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ 19:
/***/ ((module) => {

module.exports = require("@mui/material/Box");

/***/ }),

/***/ 3819:
/***/ ((module) => {

module.exports = require("@mui/material/Button");

/***/ }),

/***/ 4960:
/***/ ((module) => {

module.exports = require("@mui/material/CssBaseline");

/***/ }),

/***/ 5612:
/***/ ((module) => {

module.exports = require("@mui/material/Grid");

/***/ }),

/***/ 7934:
/***/ ((module) => {

module.exports = require("@mui/material/IconButton");

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

/***/ 9138:
/***/ ((module) => {

module.exports = require("mui-rff");

/***/ }),

/***/ 2930:
/***/ ((module) => {

module.exports = require("next-axiom");

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

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 72:
/***/ ((module) => {

module.exports = require("superjson");

/***/ }),

/***/ 9926:
/***/ ((module) => {

module.exports = import("zod");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2952,1990,1664,1522,7575,872,9976], () => (__webpack_exec__(5656)));
module.exports = __webpack_exports__;

})();