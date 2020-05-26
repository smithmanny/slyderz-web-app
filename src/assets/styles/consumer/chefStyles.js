import { makeStyles } from '../../../components/shared/theme';

export default makeStyles(theme => ({
    chefAvatar: {
      [theme.breakpoints.up('md')]: {
        position: 'relative',
        left: 'auto',
        top: 'auto',
        transform: 'inherit'
      },
      height: `${theme.spacing(10)}px !important`,
      position: 'absolute',
      top: 0,
      transform: 'translate(-50%, -50%)',
      left: '50%',
      width: `${theme.spacing(10)}px !important`,
    },
    chefAvatarContainer: {
      [theme.breakpoints.up('md')]: {
        height: 'auto'
      },
      height: theme.spacing(8)
    },
    chefIntro: {
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3)
      },
      height: '100%',
      textAlign: 'center',
      padding: theme.spacing(2),
      position: 'relative',
    },
    chefMainDish: {
      height: '100%',
      width: '100%',
    },
    chefName: {
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(0),
        textAlign: 'left',
      },
    },
    chefRating: {
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start'
      },
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1, 0),
    },
    chefRatingContainer: {
      display: 'flex',
      margin: theme.spacing(1, 0 , 1, 4.5)
    },
  })
);
