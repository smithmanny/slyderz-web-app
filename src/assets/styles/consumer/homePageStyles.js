const homePageStyles = theme => ({
  headerRoot: {
    position: 'relative',
    height: '100vh',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  },
  headerContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    padding: theme.spacing(2),
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 700
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
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
  }
});

export default homePageStyles;
