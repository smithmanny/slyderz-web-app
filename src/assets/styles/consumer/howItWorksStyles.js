const howItWorksStyles = theme => ({
  container: {
    padding: theme.spacing(5, 0),
    backgroundColor: '#FFFAF5'
  },
  titleWrapper: {
    textAlign: 'center',
    marginBottom: theme.spacing(5)
  },
  title: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    display: 'inline-block',
    fontWeight: 500
  },
  text: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(2)
  },
  // Info Section
  infoImages: {
    '& div': {
      maxWidth: 302,
      marginBottom: theme.spacing(4)
    },
    '& div img': {
      width: '100%',
      marginBottom: theme.spacing(1)
    }
  },
  infoImage: {
    height: 250,
    '& img': {
      objectFit: 'cover',
      width: '100%',
      height: '100%'
    }
  }
});

export default howItWorksStyles;
