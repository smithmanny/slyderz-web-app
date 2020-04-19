import { makeStyles, createStyles } from '../theme';

export default makeStyles(theme =>
  createStyles({
    title: {
      fontWeight: 500,
    },
    titleDivProps: {
      display: 'inline-block'
    },
    subTitle: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(5)
    }
  })
);
