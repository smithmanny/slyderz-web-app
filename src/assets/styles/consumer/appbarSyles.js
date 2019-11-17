const appbarStyles = theme => ({
  checkoutBtn: {
    borderRadius: 0,
    color: 'white',
    marginTop: theme.spacing(2),
    width: '100%'
  },
  orderTotal: {
    position: 'absolute',
    right: 0,
    marginRight: theme.spacing(1)
  },
  iconButton: {
    color: '#000'
  },
  profile: {
    display: 'flex',
    alignItems: 'center'
  },
  root: {
    position: 'relative',
    background: 'transparent',
    boxShadow: 'none',
    padding: 0,
    marginTop: theme.spacing(2)
  },
  logo: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '& h5': {
      fontWeight: '700'
    }
  },
  linksSection: {
    position: 'relative',
    display: 'inline-block',
    color: 'black',
    marginLeft: 'auto'
  },
  toolbar: {
    padding: 0
  },
  modal: {
    position: 'absolute',
    padding: theme.spacing(2),
    borderRadius: 0,
    right: 0,
    width: '325px',
    '& .chef': {
      fontWeight: '500'
    }
  },
  name: {
    marginLeft: theme.spacing(1),
    fontWeight: '550'
  },
  orderContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
    '& .dishName': {
      flex: 1,
      paddingLeft: theme.spacing(2)
    }
  }
});

export default appbarStyles;
