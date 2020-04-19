import { makeStyles, createStyles } from '../shared/theme';

export default makeStyles(theme =>
  createStyles({
    addressPaper: {
      display: 'flex',
      marginTop: theme.spacing(6),
      padding: theme.spacing(3)
    },
    container: {
      backgroundColor: theme.palette.primary.light
    },
    section: {
      height: '600px',
      paddingTop: theme.spacing(15)
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    userAddress: {
      flex: 1,
      margin: theme.spacing(0, 2, 0, 0)
    }
  })
);
