import { makeStyles, createStyles } from '../../../../components/shared/theme';

export default makeStyles(theme =>
  createStyles({
    appbar: {
      background: 'transparent',
      boxShadow: 'none',
      position: 'absolute',
      left: 0,
      top: 0
    },
    logo: {
      color: '#000',
      textDecoration: 'none',
      '& img': {
        height: 150
      }
    },
    linksSection: {
      color: '#000',
      display: 'flex',
      flex: 1,
      listStyle: 'none',
      paddingLeft: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
      '& a': {
        textDecoration: 'none',
        color: 'black'
      },
      '& li': {
        marginLeft: theme.spacing(3)
      }
    },
    // End of AppBar styles
    introText: {
      fontWeight: 550,
      textTransform: 'uppercase'
    },
    headerRoot: {
      position: 'relative',
      // height: '100vh',
      '& > div': {
        height: '100%'
      },
      '& .header-img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      },
      '& .header-content > div': {
        maxWidth: 'calc(100% - 2rem)',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        padding: theme.spacing(3)
      }
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
    },
    title: {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
      display: 'inline-block'
    },
    text: {
      fontSize: '1rem',
      '& br': {
        padding: theme.spacing(5, 0)
      }
    },
    whoWeAreImg: {
      margin: 'auto',
      maxWidth: 400,
      textAlign: 'center',
      '& img': {
        maxWidth: 400,
        width: '100%'
      }
    },
    forWhoSection: {
      marginTop: theme.spacing(3),
      '& ul': {
        padding: 0
      },
      '& ul li': {
        listStyle: 'none'
      },
      '& div': {
        margin: 'auto',
        paddingBottom: theme.spacing(2)
      }
    },
    // Newsletter section
    emailInput: {
      border: '1px solid #DDD',
      borderRadius: 4,
      width: '100%',
      '& .MuiInputBase-root': {
        padding: theme.spacing(1),
        width: '100%'
      }
    },
    emailInputBtn: {
      padding: theme.spacing(1),
      height: '100%',
      backgroundColor: theme.palette.primary.main,
      color: '#FFF'
    },
    emailInputBtnHover: {
      backgroundColor: `${theme.palette.primary.main}!important`
    },
    formControl: {
      width: '100%'
    },
    footer: {
      minHeight: 250,
      backgroundColor: '#1d1d1d',
      color: '#FFF',
      '& > div': {
        padding: theme.spacing(5),
        textAlign: 'center',
        '& ul': {
          display: 'flex',
          listStyle: 'none',
          justifyContent: 'space-between',
          maxWidth: 350,
          margin: 'auto',
          marginTop: theme.spacing(5),
          paddingLeft: 0,
          '& li': {
            maxWidth: 35
          },
          '& img': {
            width: '100%'
          }
        }
      }
    }
  })
);
