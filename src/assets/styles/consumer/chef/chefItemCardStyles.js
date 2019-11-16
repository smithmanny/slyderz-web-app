const ChefItemCardStyles = theme => ({
  card: {
    border: '1px solid rgba(0, 0, 0, 0.13)',
    height: '165px',
    position: 'relative',
    '& span': {
      position: 'relative'
    },
    '& img': {
      float: 'right',
      width: '175px',
      height: '100%',
      objectFit: 'cover'
    }
  },
  content: {
    padding: theme.spacing(0.5, 1),
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  description: {
    margin: 'auto 0'
  },
  title: {
    fontWeight: 'bold'
  },
  price: {
    justifyContent: 'flex-end'
  },
  link: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%'
  }
});

export default ChefItemCardStyles;
