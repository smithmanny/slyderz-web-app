"use strict";
(() => {
var exports = {};
exports.id = 9295;
exports.ids = [9295];
exports.modules = {

/***/ 5871:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ConfirmOrderPage": () => (/* binding */ ConfirmOrderPage),
  "default": () => (/* binding */ _oid_confirm),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./app/blitz-server.ts
var blitz_server = __webpack_require__(9057);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "stripe"
var external_stripe_ = __webpack_require__(8174);
var external_stripe_default = /*#__PURE__*/__webpack_require__.n(external_stripe_);
// EXTERNAL MODULE: ./db/index.ts
var db = __webpack_require__(6417);
// EXTERNAL MODULE: ./app/helpers/index.ts
var helpers = __webpack_require__(7255);
// EXTERNAL MODULE: ./app/helpers/dateHelpers.ts
var dateHelpers = __webpack_require__(672);
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
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./app/orders/components/OrderItems.tsx





const OrderItems = (props)=>{
    const { order  } = props;
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* default */.Z, {
        sx: {
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* default */.Z, {
                sx: {
                    textAlign: "left",
                    mb: 4
                },
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Typography/* default */.Z, {
                        gutterBottom: true,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                children: "Confirmation#:"
                            }),
                            " ",
                            order.confirmationNumber
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Typography/* default */.Z, {
                        gutterBottom: true,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                children: "Event Date:"
                            }),
                            " ",
                            (0,dateHelpers/* readableDate */.J)(new Date(order.eventDate))
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Typography/* default */.Z, {
                        gutterBottom: true,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("strong", {
                                children: "Event Time:"
                            }),
                            " ",
                            order.eventTime
                        ]
                    })
                ]
            }),
            order.dishes.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(Box/* default */.Z, {
                    sx: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                    },
                    children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                        children: item.dish.name
                    })
                }))
        ]
    });
};
/* harmony default export */ const components_OrderItems = (OrderItems);

// EXTERNAL MODULE: ./app/core/components/shared/Divider.jsx
var Divider = __webpack_require__(4612);
;// CONCATENATED MODULE: ./pages/orders/[oid]/confirm/index.tsx














const STRIPE_SECRET = process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY || "";
const getServerSideProps = (0,blitz_server/* gSSP */.t2)(async function getServerSideProps({ req , res , params  }) {
    const stripe = new (external_stripe_default())(STRIPE_SECRET, {
        apiVersion: "2022-08-01"
    });
    const confirmationNumber = String(params?.oid);
    if (!confirmationNumber) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }
    const order = await db["default"].order.findFirstOrThrow({
        where: {
            confirmationNumber
        },
        select: {
            amount: true,
            confirmationNumber: true,
            eventDate: true,
            eventTime: true,
            id: true,
            orderStatus: true,
            paymentMethodId: true,
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
            chef: {
                select: {
                    id: true
                }
            },
            user: {
                select: {
                    id: true,
                    stripeCustomerId: true,
                    firstName: true
                }
            }
        }
    });
    // Don't charge card again if order is already accepted
    if (order.orderStatus !== "PENDING") {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }
    // Stripe amount must be in cents
    const stripeAmount = Number((parseFloat(String(order.amount)) * 100).toString());
    const paymentIntent = await stripe.paymentIntents.create({
        amount: stripeAmount,
        capture_method: "manual",
        currency: "usd",
        customer: order.user.stripeCustomerId,
        payment_method: order.paymentMethodId,
        off_session: true,
        confirm: true,
        metadata: {
            cartItems: JSON.stringify(order.dishes),
            userId: order.user.id
        }
    });
    if (!paymentIntent) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }
    await stripe.paymentIntents.capture(paymentIntent.id);
    await db["default"].order.update({
        where: {
            confirmationNumber
        },
        data: {
            orderStatus: "ACCEPTED"
        }
    });
    const eventDate = new Date(order.eventDate);
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
        eventDate: (0,dateHelpers/* readableDate */.J)(eventDate)
    };
    (0,helpers/* sendOrderResponseEmail */.By)(emailData, true);
    return {
        props: {
            order
        }
    };
});
const ConfirmOrderPage = (props)=>{
    const { order  } = props;
    const router = (0,router_.useRouter)();
    return /*#__PURE__*/ jsx_runtime_.jsx(ConsumerContainer/* default */.Z, {
        maxWidth: "sm",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* default */.Z, {
            sx: {
                display: "flex",
                flexDirection: "column"
            },
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                    variant: "h6",
                    children: "The order has been approved."
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(Divider/* default */.Z, {
                    sx: {
                        marginBottom: 2
                    }
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(components_OrderItems, {
                    order: order
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
ConfirmOrderPage.getLayout = (page)=>/*#__PURE__*/ jsx_runtime_.jsx(Layout/* default */.Z, {
        title: "Order has been reserved",
        children: page
    });
/* harmony default export */ const _oid_confirm = (ConfirmOrderPage);


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

/***/ 8174:
/***/ ((module) => {

module.exports = require("stripe");

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
var __webpack_exports__ = __webpack_require__.X(0, [2952,1990,1664,1522,2072,9110,4877], () => (__webpack_exec__(5871)));
module.exports = __webpack_exports__;

})();