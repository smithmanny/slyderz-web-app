const chefDetailStyles = theme => ({
  header: {
    width: '100%',
    height: 400,
    objectFit: 'cover',
    marginBottom: theme.spacing(2)
  },
  leftSection: {
    '& .title': {
      fontSize: 32,
      fontWeight: 800,
      color: theme.palette.content.main
    },
    '& .city': {
      fontSize: 16
    },
    '& .summary': {
      marginTop: theme.spacing(3)
    }
  }
});

export default chefDetailStyles;
