import { makeStyles, createStyles } from '../../../components/shared/theme';

export default makeStyles(theme =>
  createStyles({
    close: {
      marginBottom: theme.spacing(2)
    },
    checkoutBtn: {
      borderRadius: 0,
      color: 'white',
      marginTop: theme.spacing(2),
      width: '100%'
    },
    orderTotal: {
      marginLeft: 'auto'
    },
    iconButton: {
      color: '#000'
    },
    profile: {
      display: 'flex',
      alignItems: 'center'
    },
    root: {
      position: 'relative',
      background: 'transparent',
      boxShadow: 'none',
      padding: 0,
      marginTop: theme.spacing(2)
    },
    logo: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '& h5': {
        fontWeight: '700'
      }
    },
    linksSection: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    toolbar: {
      padding: theme.spacing(0, 1)
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
    name: {
      marginLeft: theme.spacing(1),
      fontWeight: '550'
    }
  })
);
