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
      margin: theme.spacing(1, 0)
    },
    dishPhoto: {
      borderRadius: theme.spacing(1),
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
    title: {
      fontWeight: 500
    },
    price: {
      '& span': {
        color: theme.palette.text.secondary
      },
      fontWeight: 400,
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
