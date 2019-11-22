export default theme => ({
  orderContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
    '& .dishName': {
      flex: 1,
      paddingLeft: theme.spacing(2)
    }
  }
});
