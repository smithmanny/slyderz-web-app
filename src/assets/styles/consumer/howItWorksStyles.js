const howItWorksStyles = theme => ({
  // How It Works Section
  hiwTitle: {
    marginBottom: theme.spacing(2)
  },
  // Info Section
  infoImages: {
    '& div': {
      maxWidth: 302
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
