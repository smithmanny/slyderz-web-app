import { makeStyles, createStyles } from '../../../shared/theme';

export default makeStyles(theme =>
  createStyles({
    divider: {
      marginBottom: theme.spacing(1)
    },
    heading: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2)
    },
    section: {
      margin: theme.spacing(4, 0)
    },
    title: {
      fontWeight: 'bold',
      marginRight: 'auto'
    },
    modalTitle: {
      marginTop: theme.spacing(2)
    }
  })
);
