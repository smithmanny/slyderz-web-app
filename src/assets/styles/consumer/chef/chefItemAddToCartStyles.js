const chefItemAddToCart = theme => ({
  button: {
    height: '50px',
    width: '100%',
    paddingLeft: theme.spacing(10)
  },
  container: {
    padding: theme.spacing(2)
  },
  price: {
    marginLeft: 'auto'
  },
  quantity: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

export default chefItemAddToCart;
