import { makeStyles, createStyles } from '../../../../components/shared/theme';

export default makeStyles(theme =>
  createStyles({
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
