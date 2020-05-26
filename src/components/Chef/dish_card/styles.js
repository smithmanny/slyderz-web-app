import { makeStyles } from '../../shared/theme';

export default makeStyles(theme => ({
    content: {
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column'
    },
    chefDish: {
      padding: theme.spacing(2)
    },
    description: {
      margin: 'auto 0'
    },
    dishPhoto: {
      width: '100%',
      height: '100%',
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
  })
);
