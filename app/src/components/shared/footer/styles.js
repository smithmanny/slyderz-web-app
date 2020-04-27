import { makeStyles, createStyles } from '../theme';

export default makeStyles(theme =>
  createStyles({
    button: {
      padding: theme.spacing(2)
    },
    divider: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    emailAddress: {
      flex: 1,
      margin: theme.spacing(0, 2, 0, 0)
    },
    form: {
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'flex-end'
      },
    },
    footer: {
      backgroundColor: theme.palette.primary.dark,
      padding: theme.spacing(6, 0)
    },
    newsletterPaper: {
      maxWidth: '365px',
      padding: theme.spacing(3)
    },
    signup: {
      display: 'flex',
      alignItems: 'center'
    },
    socialContainer: {
      '& span': {
        marginLeft: 'auto'
      },
      '& h6': {
        fontSize: '16px'
      },
      alignItems: 'center',
      display: 'flex',
      color: 'white',
      marginTop: theme.spacing(2)
    },
    socialList: {
      '& li': {
        '& svg': {
          fontSize: '32px',
        },
        marginRight: theme.spacing(3)
      },
      display: 'flex',
      color: 'rgba(255, 255, 255, 0.2)',
      listStyle: 'none',
    },
    table: {
      '& th': {
        textTransform: 'uppercase',
        '& h6': {
          fontSize: '14px',
        }
      },
      '& tr': {
        display: 'flex',
        fontWeight: 500,
        marginBottom: theme.spacing(2),
        justifyContent: 'space-between',
      },
      color: 'white',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(4),
      width: '100%'
    },
    text: {
      marginBottom: theme.spacing(3)
    }
  })
);
