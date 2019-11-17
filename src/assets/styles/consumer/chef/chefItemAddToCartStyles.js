const chefItemAddToCart = theme => ({
  button: {
    border: 0,
    height: '50px',
    width: '100%'
  },
  container: {
    padding: theme.spacing(2)
  },
  price: {
    position: 'absolute',
    right: 0,
    marginRight: theme.spacing(2)
  },
  quantity: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

export default chefItemAddToCart;
