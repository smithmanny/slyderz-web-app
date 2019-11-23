import { makeStyles, createStyles } from '../../../components/shared/theme';

export default makeStyles(theme =>
  createStyles({
    iconButton: {
      padding: 10
    },
    exploreItem: {
      display: 'flex',
      '& span': {
        margin: `auto ${theme.spacing(2)}px`
      }
    },
    card: {
      background: 'transparent',
      boxShadow: 'none',
      maxWidth: 308
    },
    cardContent: {
      paddingLeft: 0,
      '& .name': {
        margin: theme.spacing(1, 1, 1, 0)
      }
    },
    cardMedia: {
      borderRadius: 10,
      height: 205
    }
  })
);
