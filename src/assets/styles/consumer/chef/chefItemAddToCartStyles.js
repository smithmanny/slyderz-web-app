import { makeStyles, createStyles } from '../../../../components/shared/theme';

export default makeStyles(theme =>
  createStyles({
    button: {
      border: 0,
      height: '50px',
      width: '100%'
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
  })
);
