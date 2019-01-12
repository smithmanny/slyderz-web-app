module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/styles");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Grid");

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/AppBar");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Toolbar");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/IconButton");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/icons/AccountCircle");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Paper");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/GridList");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/GridListTile");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/GridListTileBar");

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(36);


/***/ }),
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "@material-ui/core/Typography"
var Typography_ = __webpack_require__(2);
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(4);

// EXTERNAL MODULE: external "@material-ui/core/styles"
var styles_ = __webpack_require__(1);

// EXTERNAL MODULE: external "@material-ui/core/AppBar"
var AppBar_ = __webpack_require__(17);
var AppBar_default = /*#__PURE__*/__webpack_require__.n(AppBar_);

// EXTERNAL MODULE: external "@material-ui/core/Toolbar"
var Toolbar_ = __webpack_require__(18);
var Toolbar_default = /*#__PURE__*/__webpack_require__.n(Toolbar_);

// EXTERNAL MODULE: external "@material-ui/core/IconButton"
var IconButton_ = __webpack_require__(19);
var IconButton_default = /*#__PURE__*/__webpack_require__.n(IconButton_);

// EXTERNAL MODULE: external "@material-ui/icons/AccountCircle"
var AccountCircle_ = __webpack_require__(20);
var AccountCircle_default = /*#__PURE__*/__webpack_require__.n(AccountCircle_);

// CONCATENATED MODULE: ./components/Layout.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var useStyles = function useStyles(theme) {
  return {
    main: {
      padding: '40px 24px',
      maxWidth: 1032,
      margin: 'auto'
    },
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    }
  };
};

var Layout_Layout = function Layout(_ref) {
  var children = _ref.children,
      classes = _ref.classes;

  var _useState = Object(external_react_["useState"])(true),
      _useState2 = _slicedToArray(_useState, 2),
      user = _useState2[0],
      setUser = _useState2[1];

  return external_react_default.a.createElement(external_react_default.a.Fragment, null, external_react_default.a.createElement("div", {
    className: classes.root
  }, external_react_default.a.createElement(AppBar_default.a, {
    position: "static",
    color: "primary"
  }, external_react_default.a.createElement(Toolbar_default.a, null, external_react_default.a.createElement(Typography_default.a, {
    variant: "h6",
    color: "inherit",
    className: classes.grow
  }, "Slyderz"), user && external_react_default.a.createElement(IconButton_default.a, {
    color: "inherit"
  }, external_react_default.a.createElement(AccountCircle_default.a, null))))), external_react_default.a.createElement("main", {
    className: classes.main
  }, children));
};

/* harmony default export */ var components_Layout = (Object(styles_["withStyles"])(useStyles)(Layout_Layout));
// EXTERNAL MODULE: external "@material-ui/core/Grid"
var Grid_ = __webpack_require__(8);
var Grid_default = /*#__PURE__*/__webpack_require__.n(Grid_);

// EXTERNAL MODULE: external "@material-ui/core/Button"
var Button_ = __webpack_require__(21);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button_);

// EXTERNAL MODULE: external "@material-ui/core/Paper"
var Paper_ = __webpack_require__(22);
var Paper_default = /*#__PURE__*/__webpack_require__.n(Paper_);

// CONCATENATED MODULE: ./components/Chefs.js








var styles = function styles(theme) {
  return {
    orderWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden'
    },
    section: {
      paddingTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 5
    },
    paper: {
      height: 205,
      marginBottom: theme.spacing.unit
    }
  };
};

var cookData = [{
  img: '/static/food.jpg',
  name: 'Shakhor Smith',
  specialize: 'BBQ',
  price: 50
}, {
  img: '/static/food.jpg',
  name: 'Shamar Smith',
  specialize: 'Seafood',
  price: 50
}, {
  img: '/static/food.jpg',
  name: 'Nicole Hollingsworth',
  specialize: 'American',
  price: 60
}, {
  img: '/static/food.jpg',
  name: 'Johnathan Smith',
  specialize: 'Chinese',
  price: 70
}, {
  img: '/static/food.jpg',
  name: 'Jayla Smth',
  specialize: 'Burgers',
  price: 20
}];

var Chefs_Chefs = function Chefs(_ref) {
  var classes = _ref.classes;
  return external_react_default.a.createElement("div", {
    className: classes.section
  }, external_react_default.a.createElement(Typography_default.a, {
    variant: "h5",
    color: "inherit",
    gutterBottom: true
  }, "Chefs near you"), external_react_default.a.createElement("div", {
    className: classes.orderWrapper
  }, external_react_default.a.createElement(Grid_default.a, {
    container: true,
    spacing: 32
  }, cookData.map(function (cook) {
    return external_react_default.a.createElement(Grid_default.a, {
      key: cook.name,
      item: true,
      xs: 12,
      md: 3
    }, external_react_default.a.createElement(Paper_default.a, {
      className: classes.paper,
      elevation: 2
    }, external_react_default.a.createElement("img", {
      src: cook.img,
      alt: cook.title,
      style: {
        height: '100%',
        width: '100%',
        objectFit: 'cover'
      }
    })), external_react_default.a.createElement(Typography_default.a, {
      variant: "caption",
      color: "primary",
      gutterBottom: true
    }, cook.specialize), external_react_default.a.createElement(Typography_default.a, {
      variant: "subheading",
      color: "inherit"
    }, cook.name), external_react_default.a.createElement(Typography_default.a, {
      variant: "caption",
      color: "inherit",
      gutterBottom: true
    }, "$", cook.price, " per person"));
  }), external_react_default.a.createElement(Grid_default.a, {
    item: true,
    xs: 12
  }, external_react_default.a.createElement(Button_default.a, {
    variant: "contained",
    size: "small",
    color: "primary"
  }, "View All")))));
};

/* harmony default export */ var components_Chefs = (Object(styles_["withStyles"])(styles)(Chefs_Chefs));
// EXTERNAL MODULE: external "@material-ui/core/GridList"
var GridList_ = __webpack_require__(23);
var GridList_default = /*#__PURE__*/__webpack_require__.n(GridList_);

// EXTERNAL MODULE: external "@material-ui/core/GridListTile"
var GridListTile_ = __webpack_require__(24);
var GridListTile_default = /*#__PURE__*/__webpack_require__.n(GridListTile_);

// EXTERNAL MODULE: external "@material-ui/core/GridListTileBar"
var GridListTileBar_ = __webpack_require__(25);
var GridListTileBar_default = /*#__PURE__*/__webpack_require__.n(GridListTileBar_);

// CONCATENATED MODULE: ./components/Foods.js






var Foods_styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1
    },
    orderWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      paddingBottom: theme.spacing.unit * 5
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)'
    },
    titleBar: {
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    },
    section: {
      paddingTop: theme.spacing.unit * 5,
      paddingBottom: theme.spacing.unit * 5
    },
    chefImage: {
      height: '100%'
    },
    paper: {
      height: 205,
      marginBottom: theme.spacing.unit
    }
  };
};

var tileData = [{
  img: '/static/food.jpg',
  title: 'BBQ'
}, {
  img: '/static/food.jpg',
  title: 'Seafood'
}, {
  img: '/static/food.jpg',
  title: 'American'
}];

var Foods_Foods = function Foods(_ref) {
  var classes = _ref.classes;
  return external_react_default.a.createElement("div", {
    className: classes.orderWrapper
  }, external_react_default.a.createElement(GridList_default.a, {
    className: classes.gridList,
    cols: 3,
    spacing: 16
  }, tileData.map(function (tile) {
    return external_react_default.a.createElement(GridListTile_default.a, {
      key: tile.title
    }, external_react_default.a.createElement("img", {
      src: tile.img,
      alt: tile.title
    }), external_react_default.a.createElement(GridListTileBar_default.a, {
      title: tile.title,
      classes: {
        root: classes.titleBar
      }
    }));
  })));
};

/* harmony default export */ var components_Foods = (Object(styles_["withStyles"])(Foods_styles)(Foods_Foods));
// CONCATENATED MODULE: ./pages/index.js





/* harmony default export */ var pages = __webpack_exports__["default"] = (function () {
  return external_react_default.a.createElement(components_Layout, null, external_react_default.a.createElement(Typography_default.a, {
    variant: "h5",
    color: "inherit",
    gutterBottom: true
  }, "What would you like to eat?"), external_react_default.a.createElement(components_Foods, null), external_react_default.a.createElement(components_Chefs, null));
});

/***/ })
/******/ ]);