const appbarStyles = theme => ({
  root: {
    background: 'transparent',
    boxShadow: 'none'
  },
  logo: {
    flex: 1,
    '& div': {
      display: 'inline-block',
      '& a': {
        color: 'white',
        textDecoration: 'none'
      }
    }
  },
  linksSection: {
    color: 'white',
    textAlign: 'right',
    '& ul': {
      display: 'flex',
      flex: 1,
      listStyle: 'none',
      paddingLeft: 0,
      justifyContent: 'flex-end',
      '& li': {
        marginLeft: theme.spacing(2)
      }
    }
  }
});

export default appbarStyles;
