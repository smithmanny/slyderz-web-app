"use strict";
exports.id = 2072;
exports.ids = [2072];
exports.modules = {

/***/ 5556:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* reexport default from dynamic */ _mui_material_Container__WEBPACK_IMPORTED_MODULE_0___default.a)
/* harmony export */ });
/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4475);
/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Container__WEBPACK_IMPORTED_MODULE_0__);



/***/ }),

/***/ 4612:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* reexport default from dynamic */ _mui_material_Divider__WEBPACK_IMPORTED_MODULE_0___default.a)
/* harmony export */ });
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3646);
/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_0__);



/***/ }),

/***/ 2072:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ layouts_Layout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(968);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "@blitzjs/auth"
var auth_ = __webpack_require__(7897);
// EXTERNAL MODULE: ./node_modules/@blitzjs/next/dist/index-server.cjs
var index_server = __webpack_require__(1990);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@mui/material/IconButton"
var IconButton_ = __webpack_require__(7934);
var IconButton_default = /*#__PURE__*/__webpack_require__.n(IconButton_);
// EXTERNAL MODULE: external "@mui/material/Stack"
var Stack_ = __webpack_require__(8742);
var Stack_default = /*#__PURE__*/__webpack_require__.n(Stack_);
// EXTERNAL MODULE: external "@mui/icons-material/Person"
var Person_ = __webpack_require__(1939);
var Person_default = /*#__PURE__*/__webpack_require__.n(Person_);
// EXTERNAL MODULE: external "@mui/material/Toolbar"
var Toolbar_ = __webpack_require__(1431);
var Toolbar_default = /*#__PURE__*/__webpack_require__.n(Toolbar_);
// EXTERNAL MODULE: external "@mui/material/AppBar"
var AppBar_ = __webpack_require__(3882);
var AppBar_default = /*#__PURE__*/__webpack_require__.n(AppBar_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "@blitzjs/rpc"
var rpc_ = __webpack_require__(5481);
// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(580);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);
// EXTERNAL MODULE: external "@mui/material/List"
var List_ = __webpack_require__(4192);
var List_default = /*#__PURE__*/__webpack_require__.n(List_);
// EXTERNAL MODULE: external "@mui/material/ListItem"
var ListItem_ = __webpack_require__(834);
var ListItem_default = /*#__PURE__*/__webpack_require__.n(ListItem_);
// EXTERNAL MODULE: external "@mui/material/ListItemButton"
var ListItemButton_ = __webpack_require__(1011);
var ListItemButton_default = /*#__PURE__*/__webpack_require__.n(ListItemButton_);
// EXTERNAL MODULE: external "@mui/material/ListItemAvatar"
var ListItemAvatar_ = __webpack_require__(2101);
var ListItemAvatar_default = /*#__PURE__*/__webpack_require__.n(ListItemAvatar_);
// EXTERNAL MODULE: external "@mui/material/ListItemText"
var ListItemText_ = __webpack_require__(8315);
var ListItemText_default = /*#__PURE__*/__webpack_require__.n(ListItemText_);
// EXTERNAL MODULE: external "@mui/icons-material/Add"
var Add_ = __webpack_require__(6146);
var Add_default = /*#__PURE__*/__webpack_require__.n(Add_);
;// CONCATENATED MODULE: ./app/auth/mutations/logout.ts
const __internal_rpcHandler = async function logout(_, ctx) {
    return await ctx.session.$revoke();
};
__internal_rpcHandler._resolverName = "logout";
__internal_rpcHandler._resolverType = "mutation";
__internal_rpcHandler._routePath = "/api/rpc/logout";
/* harmony default export */ const mutations_logout = (__internal_rpcHandler);

// EXTERNAL MODULE: external "@mui/material/Popover"
var Popover_ = __webpack_require__(5768);
var Popover_default = /*#__PURE__*/__webpack_require__.n(Popover_);
;// CONCATENATED MODULE: ./app/core/components/shared/Popover.jsx



const Popover = ({ anchorEl , children , handleClose , name , ...props })=>{
    const open = Boolean(anchorEl);
    const id = open ? name : undefined;
    return /*#__PURE__*/ jsx_runtime_.jsx((Popover_default()), {
        "aria-labelledby": name,
        id: id,
        open: open,
        anchorEl: anchorEl,
        onClose: handleClose,
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "left"
        },
        ...props,
        children: children
    });
};
Popover.defaultProps = {
    name: "Popover"
};
Popover.propTypes = {
    anchorEl: (external_prop_types_default()).element.isRequired,
    handleClose: (external_prop_types_default()).func.isRequired,
    name: (external_prop_types_default()).string
};
/* harmony default export */ const shared_Popover = (Popover);

;// CONCATENATED MODULE: ./app/core/components/accountPopover/AccountPopover.jsx














const routes = [
    {
        id: 0,
        icon: (Add_default()),
        name: "Account",
        route: "/account"
    }, 
];
const AccountPopover = (props)=>{
    const [logout] = (0,rpc_.useMutation)(mutations_logout);
    const router = (0,router_.useRouter)();
    const handlePopoverClick = (route)=>{
        router.push(route);
        props.onClose();
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(shared_Popover, {
        ...props,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((List_default()), {
            children: [
                routes.map((link)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)((ListItemButton_default()), {
                        onClick: ()=>handlePopoverClick(link.route),
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx((ListItemAvatar_default()), {
                                children: /*#__PURE__*/ jsx_runtime_.jsx((Person_default()), {
                                    fontSize: "large"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx((ListItemText_default()), {
                                primary: link.name,
                                sx: {
                                    "& span": {
                                        fontWeight: "500"
                                    }
                                }
                            })
                        ]
                    }, link.id)),
                /*#__PURE__*/ jsx_runtime_.jsx((ListItem_default()), {
                    button: true,
                    onClick: ()=>logout(),
                    children: /*#__PURE__*/ jsx_runtime_.jsx((ListItemText_default()), {
                        primary: "Sign out",
                        sx: {
                            "& span": {
                                fontWeight: "500"
                            }
                        }
                    })
                })
            ]
        })
    });
};
AccountPopover.defaultProps = {
    anchorEl: null,
    id: null
};
AccountPopover.propTypes = {
    id: (external_prop_types_default()).string,
    onClose: (external_prop_types_default()).func.isRequired,
    open: (external_prop_types_default()).bool.isRequired,
    anchorEl: (external_prop_types_default()).element
};
/* harmony default export */ const accountPopover_AccountPopover = (AccountPopover);

;// CONCATENATED MODULE: ./app/core/components/accountPopover/index.js


// EXTERNAL MODULE: ./app/core/components/shared/Button.tsx
var Button = __webpack_require__(6509);
// EXTERNAL MODULE: ./app/core/components/shared/Box.tsx
var Box = __webpack_require__(583);
// EXTERNAL MODULE: ./app/core/components/shared/Typography.tsx
var Typography = __webpack_require__(6165);
;// CONCATENATED MODULE: ./app/core/components/appbar/Appbar.tsx














const Appbar = (props)=>{
    const session = (0,auth_.useSession)();
    const { 0: accountAnchorEl , 1: setAccountAnchorEl  } = (0,external_react_.useState)(null);
    const isAccountOpen = Boolean(accountAnchorEl);
    const accountId = isAccountOpen ? "account-popover" : null;
    const closeAccountModal = ()=>{
        setAccountAnchorEl(null);
    };
    const handleAccountModalClick = (event)=>{
        setAccountAnchorEl(event.currentTarget);
    };
    const renderLoggedOutLinks = ()=>/*#__PURE__*/ jsx_runtime_.jsx("span", {
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Stack_default()), {
                direction: "row",
                spacing: 2,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: index_server/* Routes.LoginPage */.Z5.LoginPage(),
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                            variant: "contained",
                            component: "a",
                            children: "Log in"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: index_server/* Routes.SignupPage */.Z5.SignupPage(),
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                            variant: "contained",
                            component: "a",
                            children: "Sign up"
                        })
                    })
                ]
            })
        });
    const renderLoggedInLinks = ()=>/*#__PURE__*/ jsx_runtime_.jsx("span", {
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Stack_default()), {
                direction: "row",
                spacing: 2,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                        variant: "text",
                        color: "white",
                        children: "Dashboard"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((IconButton_default()), {
                        "aria-label": "cart",
                        disableRipple: true,
                        onClick: handleAccountModalClick,
                        size: "large",
                        children: /*#__PURE__*/ jsx_runtime_.jsx((Person_default()), {
                            fontSize: "large"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(accountPopover_AccountPopover, {
                        id: accountId,
                        open: isAccountOpen,
                        onClose: closeAccountModal,
                        anchorEl: accountAnchorEl
                    })
                ]
            })
        });
    return /*#__PURE__*/ jsx_runtime_.jsx((AppBar_default()), {
        position: "static",
        sx: {
            backgroundColor: "transparent",
            mb: 4
        },
        ...props,
        children: /*#__PURE__*/ jsx_runtime_.jsx((Toolbar_default()), {
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* default */.Z, {
                sx: {
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "/",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                variant: "h5",
                                children: "Slyderz"
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: session.userId ? renderLoggedInLinks() : renderLoggedOutLinks()
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const appbar_Appbar = (Appbar);

;// CONCATENATED MODULE: ./app/core/components/appbar/index.js


// EXTERNAL MODULE: external "@mui/material/InputAdornment"
var InputAdornment_ = __webpack_require__(3103);
var InputAdornment_default = /*#__PURE__*/__webpack_require__.n(InputAdornment_);
// EXTERNAL MODULE: external "mdi-material-ui"
var external_mdi_material_ui_ = __webpack_require__(9791);
// EXTERNAL MODULE: ./integrations/material-ui.js
var material_ui = __webpack_require__(2868);
// EXTERNAL MODULE: ./app/core/components/shared/Container.js
var Container = __webpack_require__(5556);
// EXTERNAL MODULE: ./app/core/components/shared/Divider.jsx
var Divider = __webpack_require__(4612);
// EXTERNAL MODULE: ./app/core/components/shared/Grid.jsx
var Grid = __webpack_require__(8820);
// EXTERNAL MODULE: external "@mui/material/Paper"
var Paper_ = __webpack_require__(1168);
var Paper_default = /*#__PURE__*/__webpack_require__.n(Paper_);
;// CONCATENATED MODULE: ./app/core/components/shared/Paper.jsx


// EXTERNAL MODULE: ./app/core/components/form/index.js + 6 modules
var components_form = __webpack_require__(5252);
;// CONCATENATED MODULE: ./app/core/components/footer/Footer.jsx













const FooterDiv = (0,material_ui/* styled */.zo)("div")(({ theme  })=>({
        backgroundColor: theme.palette.primary.dark,
        marginTop: theme.spacing(4),
        padding: theme.spacing(6, 0)
    }));
const Signup = (0,material_ui/* styled */.zo)("span")(({ theme  })=>({
        [theme.breakpoints.up("md")]: {
            flexDirection: "row"
        },
        display: "flex",
        flexDirection: "column"
    }));
const SocialContainer = (0,material_ui/* styled */.zo)("div")(({ theme  })=>({
        "& span": {
            marginLeft: "auto"
        },
        "& h6": {
            fontSize: "16px"
        },
        alignItems: "center",
        display: "flex",
        color: "white",
        marginTop: theme.spacing(2)
    }));
const SocialList = (0,material_ui/* styled */.zo)("ul")(({ theme  })=>({
        "& a": {
            color: "rgba(255, 255, 255, 0.2)"
        },
        "& a:hover": {
            color: "rgba(255, 255, 255, 0.7)",
            cursor: "pointer"
        },
        "& li": {
            "& svg": {
                fontSize: "32px"
            },
            marginRight: theme.spacing(3)
        },
        display: "flex",
        listStyle: "none"
    }));
const Table = (0,material_ui/* styled */.zo)("table")(({ theme  })=>({
        "& a:hover": {
            cursor: "pointer",
            textDecoration: "underline"
        },
        "& th": {
            textTransform: "uppercase",
            "& h6": {
                fontSize: "14px"
            }
        },
        "& tr": {
            display: "flex",
            fontWeight: 500,
            marginBottom: theme.spacing(2),
            justifyContent: "space-between"
        },
        color: "white",
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(4),
        width: "100%"
    }));
const Footer = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(FooterDiv, {
        children: /*#__PURE__*/ jsx_runtime_.jsx(Container/* default */.Z, {
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Grid/* default */.Z, {
                container: true,
                sx: {
                    flexDirection: {
                        xs: "row",
                        md: "row-reverse"
                    }
                },
                spacing: 2,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Grid/* default */.Z, {
                        item: true,
                        xs: 12,
                        md: 6,
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Paper_default()), {
                            sx: {
                                ml: {
                                    md: "auto"
                                },
                                maxWidth: "500px",
                                padding: 3
                            },
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Typography/* default */.Z, {
                                    sx: {
                                        mb: 3
                                    },
                                    color: "primary",
                                    variant: "h6",
                                    children: [
                                        "We’re cooking up something delicious.",
                                        /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                        "Sign up to find out more."
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(components_form/* default */.ZP, {
                                    onSubmit: {},
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Grid/* default */.Z, {
                                        container: true,
                                        spacing: 2,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(components_form/* TextField */.nv, {
                                                name: "email",
                                                variant: "outlined",
                                                label: "email",
                                                placeholder: "Email",
                                                InputProps: {
                                                    startAdornment: /*#__PURE__*/ jsx_runtime_.jsx((InputAdornment_default()), {
                                                        position: "start",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx(external_mdi_material_ui_.EmailOutline, {})
                                                    })
                                                },
                                                xs: 12,
                                                md: 7
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(Grid/* default */.Z, {
                                                item: true,
                                                xs: 12,
                                                md: 5,
                                                textAlign: "right",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                                                    color: "primary",
                                                    sx: {
                                                        padding: 2,
                                                        width: {
                                                            xs: "100%"
                                                        }
                                                    },
                                                    variant: "contained",
                                                    type: "submit",
                                                    children: "Find a Chef"
                                                })
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Grid/* default */.Z, {
                        item: true,
                        xs: 12,
                        md: 6,
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Table, {
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tbody", {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                    variant: "h6",
                                                    children: "Company"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                    variant: "h6",
                                                    children: "Chefs"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                    variant: "h6",
                                                    children: "Support"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("th", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                    variant: "h6",
                                                    children: "Cities"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                    href: "/about",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                        variant: "body1",
                                                        component: "a",
                                                        children: "About"
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                    href: "/become-a-chef",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                        variant: "body1",
                                                        component: "a",
                                                        children: "Join Slyderz"
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                    variant: "body1",
                                                    children: "Consumer Help"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                    variant: "body1",
                                                    children: "Atlanta"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("tr", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/contact",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                    variant: "body1",
                                                    component: "a",
                                                    children: "Contact"
                                                })
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("tr", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                variant: "body1",
                                                children: "Blog"
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("tr", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                href: "/terms-and-conditions",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                    variant: "body1",
                                                    component: "a",
                                                    children: "Terms"
                                                })
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("tr", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                                variant: "body1",
                                                children: "Privacy"
                                            })
                                        })
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Grid/* default */.Z, {
                        item: true,
                        xs: 12,
                        children: /*#__PURE__*/ jsx_runtime_.jsx(Divider/* default */.Z, {
                            sx: {
                                backgroundColor: "rgba(255, 255, 255, 0.2)"
                            }
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Grid/* default */.Z, {
                        item: true,
                        xs: 12,
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(SocialContainer, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(Typography/* default */.Z, {
                                    variant: "h6",
                                    children: "\xa9 2020 Slyderz LLC"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(SocialList, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    href: "https://www.facebook.com/slyderz",
                                                    target: "__blank",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_mdi_material_ui_.Facebook, {})
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    href: "https://twitter.com/SlyderzApp",
                                                    target: "__blank",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_mdi_material_ui_.Twitter, {})
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    href: "https://www.instagram.com/slyderz_app/",
                                                    target: "__blank",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_mdi_material_ui_.Instagram, {})
                                                })
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const footer_Footer = (Footer);

;// CONCATENATED MODULE: ./app/core/components/footer/index.js


;// CONCATENATED MODULE: ./app/core/layouts/Layout.tsx




const Layout = ({ title , children  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: title || "blitz-slyderz"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(appbar_Appbar, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                children: children
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(footer_Footer, {})
        ]
    });
};
/* harmony default export */ const layouts_Layout = (Layout);


/***/ })

};
;