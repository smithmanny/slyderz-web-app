webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Foods.js":
/*!*****************************!*\
  !*** ./components/Foods.js ***!
  \*****************************/
/*! exports provided: allFoodsQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allFoodsQuery", function() { return allFoodsQuery; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-boost */ "./node_modules/apollo-boost/lib/index.js");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/react-apollo.browser.umd.js");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/styles/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _material_ui_core_GridList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/GridList */ "./node_modules/@material-ui/core/GridList/index.js");
/* harmony import */ var _material_ui_core_GridList__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_GridList__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core_GridListTile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/GridListTile */ "./node_modules/@material-ui/core/GridListTile/index.js");
/* harmony import */ var _material_ui_core_GridListTile__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_GridListTile__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_GridListTileBar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/GridListTileBar */ "./node_modules/@material-ui/core/GridListTileBar/index.js");
/* harmony import */ var _material_ui_core_GridListTileBar__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_GridListTileBar__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "/Users/shakhor/Projects/Web/slyderz/components/Foods.js";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  query {\n    foods {\n      title\n      image {\n        url\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }










var styles = function styles(theme) {
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

var allFoodsQuery = Object(apollo_boost__WEBPACK_IMPORTED_MODULE_2__["gql"])(_templateObject());

var Foods = function Foods(_ref) {
  var classes = _ref.classes;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: classes.orderWrapper,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_3__["Query"], {
    query: allFoodsQuery,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        data = _ref2.data;
    if (loading) return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57
      },
      __self: this
    }, "Loading...");
    if (error) return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58
      },
      __self: this
    }, "Error :(");
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_GridList__WEBPACK_IMPORTED_MODULE_5___default.a, {
      className: classes.gridList,
      cols: 3,
      spacing: 16,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: this
    }, data.foods.map(function (food) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_GridListTile__WEBPACK_IMPORTED_MODULE_6___default.a, {
        key: food.title,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "/api/".concat(food.image.url),
        alt: food.title,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_GridListTileBar__WEBPACK_IMPORTED_MODULE_7___default.a, {
        title: food.title,
        classes: {
          root: classes.titleBar
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        },
        __self: this
      }));
    }));
  }));
};

Foods.propTypes = {
  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape().isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_4__["withStyles"])(styles)(Foods));

/***/ })

})
//# sourceMappingURL=index.js.3c845313a49d17bc2cac.hot-update.js.map