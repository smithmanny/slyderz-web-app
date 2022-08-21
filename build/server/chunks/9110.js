"use strict";
exports.id = 9110;
exports.ids = [9110];
exports.modules = {

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

/***/ 7255:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$K": () => (/* binding */ todPM),
/* harmony export */   "By": () => (/* binding */ sendOrderResponseEmail),
/* harmony export */   "KY": () => (/* binding */ weekdays),
/* harmony export */   "bD": () => (/* binding */ convertDayToInt),
/* harmony export */   "jg": () => (/* binding */ todAM),
/* harmony export */   "vx": () => (/* binding */ formatNumberToCurrency)
/* harmony export */ });
/* unused harmony export sendOrderRequestEmail */
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


/***/ })

};
;