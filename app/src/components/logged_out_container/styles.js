import { makeStyles, createStyles } from '../shared/theme';

export default makeStyles(theme =>
  createStyles({
    addressPaper: {
      display: 'flex',
      marginTop: theme.spacing(6),
      maxWidth: '600px',
      padding: theme.spacing(3)
    },
    addressPaperFooter: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    becomeAChef: {
      color: theme.palette.primary.main,
      fontSize: '20px',
      fontWeight: 500,
      textAlign: 'center',
      marginBottom: theme.spacing(2)
    },
    becomeAChefButton: {
      [theme.breakpoints.up('md')]: {
        marginTop: 0
      },
      textAlign: 'center',
      marginTop: theme.spacing(2)
    },
    becomeAChefContainer: {
      padding: theme.spacing(6, 0)
    },
    becomeAChefSubText: {
      fontSize: '18px',
      textAlign: 'center',
      marginBottom: 0
    },
    container: {
      backgroundColor: 'rgba(234, 113, 105, 0.81)',
    },
    foodSafety: {
      margin: theme.spacing(2, 0)
    },
    foodSafetyContainer: {
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(10)
      },
      backgroundColor: 'rgba(234, 113, 105, 0.3)',
      marginTop: theme.spacing(10),
      padding: theme.spacing(6, 0)
    },
    foodSafetyContent: {
      fontSize: '20px',
      color: theme.palette.text.secondary,
      margin: theme.spacing('auto', 0)
    },
    foodSafetyContentContainer: {
      [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(20)
      },
    },
    foodSafetyPic: {
      [theme.breakpoints.up('md')]: {
        height: '630px',
        width: '460px',
      },
      maxWidth: '460px',
      maxHeight: '630px',
      borderRadius: '32px 0',
      imageRendering: '-webkit-optimize-contrast',
      width: '100%'
    },
    headerSection: {
      '@media only screen and (min-width: 858px)': {
        height: '600px'
      },
      height: 'auto',
      paddingTop: theme.spacing(15),
      position: 'relative'
    },
    headerSectionContent: {
      '@media only screen and (min-width: 858px)': {
        maxWidth: '450px'
      },
      maxWidth: '400px'
    },
    howSlyderzWorks: {
      '@media only screen and (min-width: 858px)': {
        '& span > h6': {
          marginBottom: theme.spacing(8),
        },
        marginTop: theme.spacing(40),
        textAlign: 'center'
      },
      marginTop: theme.spacing(6)
    },
    howSlyderzWorksCard: {
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'column',
        '& svg': {
          marginBottom: theme.spacing(3)
        }
      },
      '& h5': {
        fontWeight: 500,
        marginBottom: theme.spacing(1)
      },
      '& h6': {
        color: theme.palette.text.secondary
      },
      '& svg': {
        height: '76px',
        marginRight: theme.spacing(2),
        width: '87px',
      },
      alignItems: 'center',
      display: 'flex',
    },
    howSlyderzWorksCardText: {
      [theme.breakpoints.up('sm')]: {
        textAlign: 'center'
      },
      flex: 1
    },
    personalChef: {
      '@media only screen and (min-width: 858px)': {
        position: 'absolute',
        height: '630px',
        right: theme.spacing(2),
        top: theme.spacing(10),
        width: '460px'
      },
      borderRadius: '32px 0',
      height: 'auto',
      margin: theme.spacing(4, 0),
      width: '100%',
      maxWidth: '460px',
      maxHeight: '630px',
      imageRendering: '-webkit-optimize-contrast'
    },
    readyToOrderContainer: {
      backgroundColor: 'rgba(234, 113, 105, 0.81)',
      padding: theme.spacing(6, 0)
    },
    section: {
      // marginTop: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
    userAddress: {
      flex: 1,
      margin: theme.spacing(0, 2, 0, 0)
    },
  })
);
