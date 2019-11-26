import { makeStyles, createStyles } from '../../../components/shared/theme';

export default makeStyles(theme =>
  createStyles({
    dialog: {
      margin: theme.spacing(1)
    },
    dialogContent: {
      padding: 0,
      '&:first-child': {
        paddingTop: 0
      },
      '& img': {
        objectFit: 'cover'
      }
    },
    content: {
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1)
      },
      padding: theme.spacing(2)
    },
    instructions: {
      padding: theme.spacing(2)
    },
    title: {
      fontWeight: 'bold'
    }
  })
);
