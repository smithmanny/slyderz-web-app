import { makeStyles, createStyles } from '../../../components/shared/theme';

export default makeStyles(theme =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(4)
    },
    formContent: {
      maxWidth: '500px'
    },
    logo: {
      maxWidth: '250px'
    },
    signup: {
      textDecoration: 'none',
      color: theme.palette.secondary.main
    },
    submit: {
      margin: theme.spacing(1, 0)
    },
    welcome: {
      paddingBottom: theme.spacing(2)
    }
  })
);
