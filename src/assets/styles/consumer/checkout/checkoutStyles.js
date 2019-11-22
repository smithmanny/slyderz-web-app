export default theme => ({
  container: {
    marginTop: theme.spacing(4)
  },
  checkoutItem: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1.5, 0),
    '& svg': {
      fontSize: '25px'
    },
    '& h6': {
      marginLeft: theme.spacing(1)
    }
  },
  leftContainer: {
    [theme.breakpoints.down('md')]: {
      margin: 'auto'
    },
    maxWidth: '750px'
  },
  rightContainer: {
    [theme.breakpoints.down('md')]: {
      margin: 'auto'
    },
    maxWidth: '500px',
    marginLeft: 'auto'
  },
  totalContainer: {
    margin: theme.spacing(2, 0),
    '& span': {
      display: 'flex',
      margin: theme.spacing(1, 0),
      '&:last-child': {
        '& .title': {
          fontWeight: '530',
          fontSize: '1rem'
        },
        '& .price': {
          fontWeight: '530',
          fontSize: '1rem'
        }
      },
      '& .title': {
        flex: 1,
        fontSize: '.9rem'
      },
      '& .price': {
        fontSize: '.9rem'
      }
    }
  }
});