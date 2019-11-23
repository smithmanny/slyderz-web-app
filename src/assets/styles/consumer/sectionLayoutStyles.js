import { makeStyles, createStyles } from '../../../components/shared/theme';

export default makeStyles(theme =>
  createStyles({
    root: {
      marginBottom: theme.spacing(10),
      marginTop: theme.spacing(10)
    },
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
