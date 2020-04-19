import { makeStyles, createStyles } from '../theme';

export default makeStyles(theme =>
  createStyles({
    title: {
      fontWeight: 500,
      marginBottom: theme.spacing(2)
    },
    titleDivProps: {
      display: 'inline-block'
    },
    subTitle: {
      marginBottom: theme.spacing(5)
    }
  })
);
