const landingPageStyles = theme => ({
  appbar: {
    background: 'transparent',
    boxShadow: 'none',
    position: 'absolute',
    left: 0,
    top: 0
  },
  logo: {
    flex: 1,
    '& div': {
      display: 'inline-block',
      '& a': {
        color: '#000',
        textDecoration: 'none'
      }
    }
  },
  linksSection: {
    color: '#000',
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
  },
  // End of AppBar styles
  introText: {
    fontWeight: 550,
    textTransform: 'uppercase'
  },
  headerRoot: {
    position: 'relative',
    height: '100vh',
    '& > div': {
      height: '100%'
    },
    '& .header-img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    '& .header-content > div': {
      maxWidth: 'calc(100% - 2rem)',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      padding: theme.spacing(3)
    }
  },
  exploreItem: {
    display: 'flex',
    '& span': {
      margin: `auto ${theme.spacing(2)}px`
    }
  },
  card: {
    background: 'transparent',
    boxShadow: 'none',
    maxWidth: 308
  },
  cardContent: {
    paddingLeft: 0,
    '& .name': {
      margin: theme.spacing(1, 1, 1, 0)
    }
  },
  cardMedia: {
    borderRadius: 10,
    height: 205
  },
  title: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    display: 'inline-block'
  },
  text: {
    fontSize: '1rem',
    '& br': {
      padding: theme.spacing(5, 0)
    }
  },
  forWhoSection: {
    marginTop: theme.spacing(3),
    '& ul': {
      padding: 0
    },
    '& ul li': {
      listStyle: 'none'
    },
    '& div': {
      margin: 'auto',
      paddingBottom: theme.spacing(2)
    }
  },
  footer: {
    minHeight: 250,
    backgroundColor: '#1d1d1d',
    color: '#FFF',
    '& > div': {
      padding: theme.spacing(5),
      textAlign: 'center'
    }
  }
});

export default landingPageStyles;
