"use strict";
(() => {
var exports = {};
exports.id = 7966;
exports.ids = [7966];
exports.modules = {

/***/ 6090:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_StripeCardElement)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// CONCATENATED MODULE: external "@stripe/stripe-js"
const stripe_js_namespaceObject = require("@stripe/stripe-js");
;// CONCATENATED MODULE: external "@stripe/react-stripe-js"
const react_stripe_js_namespaceObject = require("@stripe/react-stripe-js");
// EXTERNAL MODULE: ./integrations/material-ui.js
var material_ui = __webpack_require__(2868);
// EXTERNAL MODULE: ./app/core/components/shared/Box.tsx
var Box = __webpack_require__(583);
// EXTERNAL MODULE: ./app/core/components/shared/Button.tsx
var Button = __webpack_require__(6509);
// EXTERNAL MODULE: ./app/core/components/shared/Typography.tsx
var Typography = __webpack_require__(6165);
;// CONCATENATED MODULE: ./app/account/components/StripeCardElement.tsx









const StripePaymentSpan = (0,material_ui/* styled */.zo)("span")(({ theme  })=>({
        display: "flex",
        alignItems: "center",
        marginLeft: theme.spacing(2)
    }));
const promise = (0,stripe_js_namespaceObject.loadStripe)("pk_test_GrN77dvsAhUuGliIXge1nUD8");
const StripeCard = (props)=>{
    const router = (0,router_.useRouter)();
    const stripe = (0,react_stripe_js_namespaceObject.useStripe)();
    const elements = (0,react_stripe_js_namespaceObject.useElements)();
    const { 0: errorMessage , 1: setErrorMessage  } = (0,external_react_.useState)(null);
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        const { error  } = await stripe.confirmSetup({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/account"
            }
        });
        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
            router.reload();
        }
    };
    const destroyPaymentMethodMutation = async (paymentMethodId)=>{
        let data;
        try {
            const res = await fetch("http://localhost:3000/api/stripe/destroy-payment-method", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    paymentMethodId
                })
            });
            data = await res.json();
        } catch (err) {
            console.log(err);
        }
        if (data) {
            router.reload();
        }
    };
    return props.paymentMethods.length > 0 ? props.paymentMethods.map((stripePaymentMethod)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* default */.Z, {
            sx: {
                display: "flex",
                alignItems: "center",
                mb: 1
            },
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                    children: stripePaymentMethod.card.last4
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(StripePaymentSpan, {
                    children: /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                        variant: "text",
                        onClick: async ()=>await destroyPaymentMethodMutation(stripePaymentMethod.id),
                        children: "Delete"
                    })
                })
            ]
        }, stripePaymentMethod.id)) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)((external_react_default()).Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(react_stripe_js_namespaceObject.PaymentElement, {
                id: "payment-element"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                type: "submit",
                sx: {
                    mt: 2
                },
                onClick: handleSubmit,
                children: "Save Card"
            })
        ]
    });
};
const StripeCardElement = (props)=>{
    const { clientSecret , paymentMethods  } = props;
    const appearance = {
        theme: "stripe"
    };
    const options = {
        clientSecret,
        appearance
    };
    return /*#__PURE__*/ jsx_runtime_.jsx((external_react_default()).Fragment, {
        children: clientSecret && /*#__PURE__*/ jsx_runtime_.jsx(react_stripe_js_namespaceObject.Elements, {
            options: options,
            stripe: promise,
            children: /*#__PURE__*/ jsx_runtime_.jsx(StripeCard, {
                paymentMethods: paymentMethods
            })
        })
    });
};
/* harmony default export */ const components_StripeCardElement = (StripeCardElement);


/***/ }),

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

/***/ 7180:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "x": () => (/* binding */ useCurrentUser)
});

// EXTERNAL MODULE: external "@blitzjs/rpc"
var rpc_ = __webpack_require__(5481);
// EXTERNAL MODULE: ./db/index.ts
var db = __webpack_require__(6417);
;// CONCATENATED MODULE: ./app/users/queries/getCurrentUser.ts

const __internal_rpcHandler = async function getCurrentUser(_ = null, { session  }) {
    if (!session.userId) return null;
    const user = await db["default"].user.findFirst({
        where: {
            id: session.userId
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true
        }
    });
    return user;
};
__internal_rpcHandler._resolverName = "getCurrentUser";
__internal_rpcHandler._resolverType = "query";
__internal_rpcHandler._routePath = "/api/rpc/getCurrentUser";
/* harmony default export */ const getCurrentUser = (__internal_rpcHandler);

;// CONCATENATED MODULE: ./app/core/hooks/useCurrentUser.ts


const useCurrentUser = ()=>{
    const [user] = (0,rpc_.useQuery)(getCurrentUser, null);
    return user;
};


/***/ }),

/***/ 4085:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_blitz_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9057);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5481);
/* harmony import */ var _blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7897);
/* harmony import */ var _blitzjs_auth__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_blitzjs_auth__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8174);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(stripe__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var app_auth_mutations_login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(872);
/* harmony import */ var app_auth_validations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4935);
/* harmony import */ var app_core_hooks_useCurrentUser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7180);
/* harmony import */ var app_core_layouts_Layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2072);
/* harmony import */ var app_core_components_shared_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6509);
/* harmony import */ var app_core_components_shared_ConsumerContainer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7488);
/* harmony import */ var app_core_components_shared_Grid__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8820);
/* harmony import */ var app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6165);
/* harmony import */ var app_core_components_form__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(5252);
/* harmony import */ var app_account_components_StripeCardElement__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(6090);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([app_auth_mutations_login__WEBPACK_IMPORTED_MODULE_6__, app_auth_validations__WEBPACK_IMPORTED_MODULE_7__]);
([app_auth_mutations_login__WEBPACK_IMPORTED_MODULE_6__, app_auth_validations__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
















const STRIPE_SECRET = process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY || "";
const getServerSideProps = (0,app_blitz_server__WEBPACK_IMPORTED_MODULE_1__/* .gSSP */ .t2)(async function getServerSideProps({ req , res  }) {
    const session = await (0,_blitzjs_auth__WEBPACK_IMPORTED_MODULE_3__.getSession)(req, res);
    const stripe = new (stripe__WEBPACK_IMPORTED_MODULE_5___default())(STRIPE_SECRET, {
        apiVersion: "2022-08-01"
    });
    if (!session.userId || !session.stripeCustomerId) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        };
    }
    const paymentMethods = await stripe.paymentMethods.list({
        customer: session.stripeCustomerId,
        type: "card"
    });
    const setupIntent = await stripe.setupIntents.create({
        customer: session.stripeCustomerId,
        payment_method_types: [
            "card"
        ],
        metadata: {
            userId: session.userId
        }
    });
    return {
        props: {
            setupIntent,
            paymentMethods: paymentMethods.data
        }
    };
});
const Account = (props)=>{
    const [login] = (0,_blitzjs_rpc__WEBPACK_IMPORTED_MODULE_2__.useMutation)(app_auth_mutations_login__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z);
    const user = (0,app_core_hooks_useCurrentUser__WEBPACK_IMPORTED_MODULE_8__/* .useCurrentUser */ .x)();
    const clientSecret = props.setupIntent.client_secret;
    const initialValues = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email
    };
    // useEffect(() => {
    //   if (!stripe) {
    //     return;
    //   }
    //   // Retrieve the "setup_intent_client_secret" query parameter appended to
    //   // your return_url by Stripe.js
    //   const clientSecret = new URLSearchParams(window.location.search).get(
    //     'setup_intent_client_secret'
    //   );
    //   if (!clientSecret) {
    //     return
    //   }
    //   // Retrieve the SetupIntent
    //   stripe
    //     .retrieveSetupIntent(clientSecret)
    //     .then(({ setupIntent }) => {
    //       // Inspect the SetupIntent `status` to indicate the status of the payment
    //       // to your customer.
    //       //
    //       // Some payment methods will [immediately succeed or fail][0] upon
    //       // confirmation, while others will first enter a `processing` state.
    //       //
    //       // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
    //       switch (setupIntent?.status) {
    //         case 'succeeded':
    //           console.log('Success! Your payment method has been saved.');
    //           break;
    //         case 'processing':
    //           console.log("Processing payment details. We'll update you when processing is complete.");
    //           break;
    //         case 'requires_payment_method':
    //           // Redirect your user back to your payment page to attempt collecting
    //           // payment again
    //           console.log('Failed to process payment details. Please try another payment method.');
    //           break;
    //       }
    //     });
    // }, [stripe]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react__WEBPACK_IMPORTED_MODULE_4___default().Fragment), {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(app_core_components_shared_ConsumerContainer__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
            maxWidth: "sm",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                    variant: "h2",
                    align: "center",
                    children: "Your Account"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(app_core_components_form__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .ZP, {
                    submitText: "Update Password",
                    schema: app_auth_validations__WEBPACK_IMPORTED_MODULE_7__/* .Login */ .m3,
                    initialValues: initialValues,
                    mutation: {
                        schema: login,
                        toVariables: (values)=>({
                                ...values
                            })
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                            variant: "h6",
                            sx: {
                                mt: 6
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                children: "Update Password"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_form__WEBPACK_IMPORTED_MODULE_14__/* .TextField */ .nv, {
                            name: "password",
                            label: "Current Password",
                            placeholder: "Current Password"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_form__WEBPACK_IMPORTED_MODULE_14__/* .TextField */ .nv, {
                            name: "newPassword1",
                            label: "New Password",
                            placeholder: "New Password"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_form__WEBPACK_IMPORTED_MODULE_14__/* .TextField */ .nv, {
                            name: "newPassword2",
                            label: "Confirm New Password",
                            placeholder: "Confirm New Password"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(app_core_components_form__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .ZP, {
                    schema: app_auth_validations__WEBPACK_IMPORTED_MODULE_7__/* .Login */ .m3,
                    initialValues: initialValues,
                    mutation: {
                        schema: login,
                        toVariables: (values)=>({
                                ...values
                            })
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                            variant: "h6",
                            sx: {
                                mt: 6
                            },
                            gutterBottom: true,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                children: "Personal Info"
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(app_core_components_shared_Grid__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
                            item: true,
                            container: true,
                            spacing: 2,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_form__WEBPACK_IMPORTED_MODULE_14__/* .TextField */ .nv, {
                                    disabled: true,
                                    name: "firstName",
                                    label: "First Name",
                                    placeholder: "First Name",
                                    md: 6
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_form__WEBPACK_IMPORTED_MODULE_14__/* .TextField */ .nv, {
                                    disabled: true,
                                    name: "lastName",
                                    label: "Last Name",
                                    placeholder: "Last Name",
                                    md: 6
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                    variant: "h6",
                    sx: {
                        mt: 6
                    },
                    gutterBottom: true,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                        children: "Payment Methods"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_account_components_StripeCardElement__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z, {
                    clientSecret: clientSecret,
                    paymentMethods: props.paymentMethods
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Typography__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                    variant: "h6",
                    sx: {
                        mt: 6
                    },
                    gutterBottom: true,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                        children: "Delete Your Account"
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_components_shared_Button__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                    variant: "text",
                    children: "Delete Account"
                })
            ]
        })
    });
};
Account.authenticate = {
    redirectTo: "/"
};
Account.getLayout = (page)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(app_core_layouts_Layout__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
        children: page
    });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Account);

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
var __webpack_exports__ = __webpack_require__.X(0, [2952,1990,1664,1522,2072,7575,872], () => (__webpack_exec__(4085)));
module.exports = __webpack_exports__;

})();