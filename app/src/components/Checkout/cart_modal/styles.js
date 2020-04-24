import { makeStyles, createStyles } from '../../shared/theme';

export default makeStyles(theme =>
  createStyles({
    close: {
      marginBottom: theme.spacing(2)
    },
    orderTotal: {
      marginLeft: 'auto'
    },
    modal: {
      position: 'absolute',
      padding: theme.spacing(2),
      borderRadius: 0,
      right: theme.spacing(1),
      top: theme.spacing(8),
      zIndex: 999,
      maxWidth: '325px',
      width: '100%',
      '& a': {
        textDecoration: 'none'
      },
      '& .chef': {
        fontWeight: '500'
      }
    },
  })
);
