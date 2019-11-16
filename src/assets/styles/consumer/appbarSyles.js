const appbarStyles = theme => ({
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
    display: 'inline-block',
    color: 'black',
    marginLeft: 'auto'
  },
  toolbar: {
    padding: 0
  },
  name: {
    marginLeft: theme.spacing(1),
    fontWeight: '550'
  }
});

export default appbarStyles;
