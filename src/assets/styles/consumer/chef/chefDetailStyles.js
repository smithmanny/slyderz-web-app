import { makeStyles, createStyles } from '../../../../components/shared/theme';

export default makeStyles(theme =>
  createStyles({
    header: {
      height: '400px',
      marginTop: theme.spacing(2),
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    },
    container: {
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        width: '100%'
      },
      border: '1px solid rgba(167, 167, 167, 0.32)',
      padding: theme.spacing(2),
      '& .title': {
        fontSize: 32,
        fontWeight: 800,
        marginLeft: theme.spacing(1),
        color: theme.palette.content.main
      },
      '& .city': {
        fontSize: 16
      },
      '& .summary': {
        marginTop: theme.spacing(4)
      },
      '& .bigAvatar': {
        margin: 0,
        width: 60,
        height: 60
      }
    },
    meta: {
      alignItems: 'center',
      display: 'flex'
    },
    metaWrapper: {
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: theme.spacing(2)
    },
    sectionTitle: {
      display: 'flex',
      justifyContent: 'center',
      '& .btn': {
        margin: theme.spacing(4, 2)
      }
    }
  })
);
