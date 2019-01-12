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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ({

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(30);


/***/ }),

/***/ 30:
/***/ (function(module, exports) {

// import React from 'react';
// import { gql } from 'apollo-boost';
// import { Query } from 'react-apollo';
// import Grid from '@material-ui/core/Grid';
// import { withStyles } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/styles';
// import Typography from '@material-ui/core/Typography';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
// import Link from 'next/link';
// import Layout from '../components/Layout';
// const useStyles = theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   orderWrapper: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//   },
//   gridList: {
//     flexWrap: 'nowrap',
//     // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//     transform: 'translateZ(0)',
//   },
//   titleBar: {
//     background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//   },
//   section: {
//     paddingTop: theme.spacing.unit * 5,
//     paddingBottom: theme.spacing.unit * 5,
//   },
//   chefImage: {
//     height: '100%',
//   },
//   paper: {
//     height: 205,
//     marginBottom: theme.spacing.unit,
//   },
// });
// export const allFoodsQuery = gql`
//   query {
//     allFoods {
//       title
//       image {
//         url
//       }
//     }
//   }
// `;
// const tileData = [
//   {
//     img: '/static/food.jpg',
//     title: 'BBQ',
//   },
//   {
//     img: '/static/food.jpg',
//     title: 'Seafood',
//   },
//   {
//     img: '/static/food.jpg',
//     title: 'American',
//   },
// ];
// const cookData = [
//   {
//     img: '/static/food.jpg',
//     name: 'Shakhor Smith',
//     specialize: 'BBQ',
//     price: 50,
//   },
//   {
//     img: '/static/food.jpg',
//     name: 'Shamar Smith',
//     specialize: 'Seafood',
//     price: 50,
//   },
//   {
//     img: '/static/food.jpg',
//     name: 'Nicole Hollingsworth',
//     specialize: 'American',
//     price: 60,
//   },
//   {
//     img: '/static/food.jpg',
//     name: 'Johnathan Smith',
//     specialize: 'Chinese',
//     price: 70,
//   },
//   {
//     img: '/static/food.jpg',
//     name: 'Jayla Smth',
//     specialize: 'Burgers',
//     price: 20,
//   },
// ];
// const Chef = ({ classes }) => (
//   <Layout>
//     <Typography variant="h5" color="inherit" gutterBottom>
//       What would you like to eat?
//     </Typography>
//     <div className={classes.orderWrapper}>
//       <Query query={allFoodsQuery}>
//         {({ loading, error, data }) => {
//           if (loading) return <div>Loading...</div>;
//           if (error) return <div>Error :(</div>;
//           return (
//             <GridList className={classes.gridList} cols={3} spacing={16}>
//               {data.allFoods.map(food => (
//                 <GridListTile key={food.title}>
//                   <img src={food.image} alt={food.title} />
//                   <GridListTileBar
//                     title={food.title}
//                     classes={{
//                       root: classes.titleBar,
//                     }}
//                   />
//                 </GridListTile>
//               ))}
//             </GridList>
//           );
//         }}
//       </Query>
//     </div>
//     <section className={classes.section}>
//       <Typography variant="h5" color="inherit" gutterBottom>
//         Chefs near you
//       </Typography>
//       <div className={classes.orderWrapper}>
//         <Grid container spacing={32}>
//           {cookData.map(cook => (
//             <Grid item xs={12} md={3}>
//               <Link href="/chef">
//                 <Paper className={classes.paper} elevation={2}>
//                   <img
//                     src={cook.img}
//                     alt={cook.title}
//                     style={{
//                       height: '100%',
//                       width: '100%',
//                       objectFit: 'cover',
//                     }}
//                   />
//                 </Paper>
//                 <Typography variant="caption" color="primary" gutterBottom>
//                   {cook.specialize}
//                 </Typography>
//                 <Typography variant="subheading" color="inherit">
//                   {cook.name}
//                 </Typography>
//                 <Typography variant="caption" color="inherit" gutterBottom>
//                   ${cook.price} per person
//                 </Typography>
//               </Link>
//             </Grid>
//           ))}
//           <Grid item xs={12}>
//             <Button variant="contained" size="small" color="primary">
//               View All
//             </Button>
//           </Grid>
//         </Grid>
//       </div>
//     </section>
//   </Layout>
// );
// export default withStyles(useStyles)(Chef);

/***/ })

/******/ });