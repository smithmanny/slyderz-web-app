import { makeStyles, createStyles } from '../../../../components/shared/theme';

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
      padding: theme.spacing(2)
    },
    instructions: {
      padding: theme.spacing(2)
    },
    image: {
      width: '100%',
      height: '300px'
    },
    title: {
      fontWeight: 'bold'
    }
  })
);
