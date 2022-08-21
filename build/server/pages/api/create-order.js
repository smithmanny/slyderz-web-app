"use strict";
(() => {
var exports = {};
exports.id = 5329;
exports.ids = [5329];
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

/***/ 8403:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ create_order)
});

// EXTERNAL MODULE: ./app/blitz-server.ts + 1 modules
var blitz_server = __webpack_require__(4243);
// EXTERNAL MODULE: external "@blitzjs/auth"
var auth_ = __webpack_require__(7897);
;// CONCATENATED MODULE: external "randomstring"
const external_randomstring_namespaceObject = require("randomstring");
var external_randomstring_default = /*#__PURE__*/__webpack_require__.n(external_randomstring_namespaceObject);
;// CONCATENATED MODULE: ./app/helpers/dateHelpers.ts
const transfromDateToReadableTime = (date)=>{
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    });
};
const readableDate = (date)=>{
    return date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
};

;// CONCATENATED MODULE: ./app/helpers/index.ts
const formatNumberToCurrency = (number)=>{
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "USD"
    }).format(number);
};
const renderHours = (tod = "AM")=>{
    const hours = 12;
    const times = [];
    for(let x = 1; x <= hours; x++){
        for(let y = 0; y < 60; y += 30){
            const date = new Date();
            let time = `${x}:${y} ${tod}`;
            if (y === 0) {
                time = `${x}:${y}0 ${tod}`;
            }
            const data = {
                key: time,
                value: time
            };
            times.push(data);
        }
    }
    return times;
};
const todAM = renderHours();
const todPM = renderHours("PM");
const weekdays = [
    {
        label: "Sunday",
        value: "SUNDAY"
    },
    {
        label: "Monday",
        value: "MONDAY"
    },
    {
        label: "Tuesday",
        value: "TUESDAY"
    },
    {
        label: "Wednesday",
        value: "WEDNESDAY"
    },
    {
        label: "Thursday",
        value: "THURSDAY"
    },
    {
        label: "Friday",
        value: "FRIDAY"
    },
    {
        label: "Saturday",
        value: "SATURDAY"
    }, 
];
const convertDayToInt = (day)=>{
    const daysOfWeek = {
        "SUNDAY": 0,
        "MONDAY": 1,
        "TUESDAY": 2,
        "WEDNESDAY": 3,
        "THURSDAY": 4,
        "FRIDAY": 5,
        "SATURDAY": 6
    };
    return daysOfWeek[day];
};
function sendOrderRequestEmail(emailData) {
    const orderRequestData = {
        to: "shakhorsmith@gmail.com",
        templateData: {
            acceptOrderUrl: emailData.acceptOrderUrl,
            denyOrderUrl: emailData.denyOrderUrl,
            cartItems: emailData.cartItems,
            eventDate: emailData.eventDate,
            eventTime: emailData.eventTime,
            location: "4288 Leola Rd, Douglasville, Ga, 30135",
            orderNumber: emailData.confirmationNumber,
            orderTotal: emailData.orderTotal
        }
    };
    return fetch("http://localhost:3000/api/mailers/send-order-request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderRequestData)
    });
}
function sendOrderResponseEmail(emailData, response) {
    const orderRequestData = {
        to: "shakhorsmith@gmail.com",
        templateData: {
            cartItems: emailData.cartItems,
            orderNumber: emailData.orderNumber,
            eventDate: emailData.eventDate,
            eventTime: emailData.eventTime,
            location: "4288 Leola Rd, Douglasville, Ga, 30135",
            orderTotal: emailData.orderTotal
        },
        response
    };
    return fetch("http://localhost:3000/api/mailers/order-response", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderRequestData)
    });
}

// EXTERNAL MODULE: ./db/index.ts
var db = __webpack_require__(3747);
;// CONCATENATED MODULE: ./pages/api/create-order.ts






const handler = async (req, res)=>{
    const session = await (0,auth_.getSession)(req, res);
    const { eventDate , eventTime , paymentMethodId  } = req.body;
    if (!session.cart) {
        throw new Error("Cart can't be empty");
    }
    if (session.stripeCustomerId === undefined || !paymentMethodId) {
        throw Error("Wrong order data");
    }
    // Create order
    const confirmationNumber = `SLY-${external_randomstring_default().generate({
        charset: "alphanumeric",
        capitalization: "uppercase",
        length: 7
    })}`;
    const order = await db["default"].order.create({
        data: {
            amount: Number(session.cart?.total),
            chefId: session.cart.pendingCartItems[0].chefId,
            confirmationNumber,
            eventDate,
            eventTime,
            dishes: {
                createMany: {
                    data: session.cart.pendingCartItems.map((item)=>({
                            dishId: item.dishId,
                            chefId: item.chefId,
                            quantity: item.quantity
                        }))
                }
            },
            paymentMethodId,
            userId: Number(session.userId)
        },
        select: {
            confirmationNumber: true,
            id: true
        }
    });
    // Send email
    if (order) {
        const date = new Date(eventDate);
        const acceptUrl = new URL(`http://localhost:3000/orders/${order.confirmationNumber}/confirm`);
        const denyUrl = new URL(`http://localhost:3000/orders/${order.confirmationNumber}/deny`);
        const emailData = {
            acceptOrderUrl: acceptUrl,
            denyOrderUrl: denyUrl,
            cartItems: session.cart.pendingCartItems,
            orderTotal: session.cart.total,
            confirmationNumber: order.confirmationNumber,
            eventTime,
            eventDate: readableDate(date)
        };
        sendOrderRequestEmail(emailData);
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
        data: order
    }));
};
/* harmony default export */ const create_order = ((0,blitz_server/* api */.hi)(handler));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [3407,4243], () => (__webpack_exec__(8403)));
module.exports = __webpack_exports__;

})();