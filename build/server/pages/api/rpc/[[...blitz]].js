"use strict";
(() => {
var exports = {};
exports.id = 2099;
exports.ids = [2099];
exports.modules = {

/***/ 7897:
/***/ ((module) => {

module.exports = require("@blitzjs/auth");

/***/ }),

/***/ 5481:
/***/ ((module) => {

module.exports = require("@blitzjs/rpc");

/***/ }),

/***/ 3524:
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ 4262:
/***/ ((module) => {

module.exports = require("@sendgrid/client");

/***/ }),

/***/ 8910:
/***/ ((module) => {

module.exports = require("@tanstack/react-query");

/***/ }),

/***/ 4405:
/***/ ((module) => {

module.exports = require("blitz");

/***/ }),

/***/ 6974:
/***/ ((module) => {

module.exports = require("debug");

/***/ }),

/***/ 7318:
/***/ ((module) => {

module.exports = require("hoist-non-react-statics");

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

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 8174:
/***/ ((module) => {

module.exports = require("stripe");

/***/ }),

/***/ 72:
/***/ ((module) => {

module.exports = require("superjson");

/***/ }),

/***/ 9926:
/***/ ((module) => {

module.exports = import("zod");;

/***/ }),

/***/ 3737:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_blitz_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4243);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,app_blitz_server__WEBPACK_IMPORTED_MODULE_1__/* .api */ .hi)((0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.rpcHandler)({
    onError: console.log
})));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/resetCartItemsMutation", ()=>__webpack_require__.e(/* import() */ 3295).then(__webpack_require__.bind(__webpack_require__, 3295)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/getOrderByConfirmation", ()=>__webpack_require__.e(/* import() */ 8898).then(__webpack_require__.bind(__webpack_require__, 8898)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/changePassword", ()=>Promise.all(/* import() */[__webpack_require__.e(7774), __webpack_require__.e(7869)]).then(__webpack_require__.bind(__webpack_require__, 7869)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/forgotPassword", ()=>__webpack_require__.e(/* import() */ 2739).then(__webpack_require__.bind(__webpack_require__, 2739)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/login", ()=>__webpack_require__.e(/* import() */ 7774).then(__webpack_require__.bind(__webpack_require__, 7774)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/logout", ()=>__webpack_require__.e(/* import() */ 2589).then(__webpack_require__.bind(__webpack_require__, 2589)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/resetPassword", ()=>Promise.all(/* import() */[__webpack_require__.e(7774), __webpack_require__.e(9552)]).then(__webpack_require__.bind(__webpack_require__, 9552)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/signup", ()=>__webpack_require__.e(/* import() */ 648).then(__webpack_require__.bind(__webpack_require__, 648)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/createMenuItemOnCart", ()=>__webpack_require__.e(/* import() */ 6024).then(__webpack_require__.bind(__webpack_require__, 6024)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/decreaseMenuItemQuantity", ()=>__webpack_require__.e(/* import() */ 2985).then(__webpack_require__.bind(__webpack_require__, 2985)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/destroyMenuItem", ()=>__webpack_require__.e(/* import() */ 3177).then(__webpack_require__.bind(__webpack_require__, 3177)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/increaseMenuItemQuantity", ()=>__webpack_require__.e(/* import() */ 5940).then(__webpack_require__.bind(__webpack_require__, 5940)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/chefDishesQuery", ()=>__webpack_require__.e(/* import() */ 5543).then(__webpack_require__.bind(__webpack_require__, 5543)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/createDishMutation", ()=>__webpack_require__.e(/* import() */ 2725).then(__webpack_require__.bind(__webpack_require__, 8239)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/createHoursMutation", ()=>__webpack_require__.e(/* import() */ 1943).then(__webpack_require__.bind(__webpack_require__, 1943)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/createSectionMutation", ()=>__webpack_require__.e(/* import() */ 537).then(__webpack_require__.bind(__webpack_require__, 537)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/destroyDishMutation", ()=>__webpack_require__.e(/* import() */ 1773).then(__webpack_require__.bind(__webpack_require__, 1773)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/destroyHoursMutation", ()=>__webpack_require__.e(/* import() */ 6926).then(__webpack_require__.bind(__webpack_require__, 6926)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/destroySectionMutation", ()=>__webpack_require__.e(/* import() */ 3901).then(__webpack_require__.bind(__webpack_require__, 3901)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/updateDishMutation", ()=>__webpack_require__.e(/* import() */ 3548).then(__webpack_require__.bind(__webpack_require__, 3548)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/dishQuery", ()=>__webpack_require__.e(/* import() */ 7278).then(__webpack_require__.bind(__webpack_require__, 7278)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/hoursQuery", ()=>__webpack_require__.e(/* import() */ 385).then(__webpack_require__.bind(__webpack_require__, 385)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/menuSectionQuery", ()=>__webpack_require__.e(/* import() */ 6093).then(__webpack_require__.bind(__webpack_require__, 6093)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/menuSectionsQuery", ()=>__webpack_require__.e(/* import() */ 9890).then(__webpack_require__.bind(__webpack_require__, 9890)));
(0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_0__.__internal_addBlitzRpcResolver)("/getCurrentUser", ()=>__webpack_require__.e(/* import() */ 6252).then(__webpack_require__.bind(__webpack_require__, 6252)));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [3407,4243], () => (__webpack_exec__(3737)));
module.exports = __webpack_exports__;

})();