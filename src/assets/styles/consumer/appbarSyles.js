const appbarStyles = theme => ({
  logo: {
    flex: 1
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
