const appbarStyles = theme => ({
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
  }
});

export default appbarStyles;
