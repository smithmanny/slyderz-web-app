"use strict";
(() => {
var exports = {};
exports.id = 2382;
exports.ids = [2382];
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

/***/ 2139:
/***/ ((module) => {

module.exports = require("@sendgrid/mail");

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

/***/ 72:
/***/ ((module) => {

module.exports = require("superjson");

/***/ }),

/***/ 7237:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const sgMail = __webpack_require__(2139);
sgMail.setApiKey(process.env.BLITZ_PUBLIC_SENDGRID_API_TOKEN);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sgMail);


/***/ }),

/***/ 7089:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var app_blitz_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4243);
/* harmony import */ var integrations_sendgrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7237);


const handler = (req, res)=>{
    const { to , templateData  } = req.body;
    const consumerMsg = {
        from: "shakhor@slyderz.co",
        templateId: "d-2098a0532be343408f1cf09da4cf4fe1",
        personalizations: [
            {
                to,
                dynamic_template_data: templateData
            }
        ]
    };
    const chefMsg = {
        from: "shakhor@slyderz.co",
        templateId: "d-dbc3f3d3b14e4f02b51e36e2a30b2376",
        personalizations: [
            {
                to,
                dynamic_template_data: templateData
            }
        ]
    };
    integrations_sendgrid__WEBPACK_IMPORTED_MODULE_1__/* ["default"].send */ .Z.send(consumerMsg).then(()=>integrations_sendgrid__WEBPACK_IMPORTED_MODULE_1__/* ["default"].send */ .Z.send(chefMsg)).catch((err)=>{
        console.error(`Failed to send email ${err}`);
    });
    res.end();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,app_blitz_server__WEBPACK_IMPORTED_MODULE_0__/* .api */ .hi)(handler));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [3407,4243], () => (__webpack_exec__(7089)));
module.exports = __webpack_exports__;

})();