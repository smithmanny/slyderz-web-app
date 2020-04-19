import { makeStyles, createStyles } from '../shared/theme';

export default makeStyles(theme =>
  createStyles({
    addressPaper: {
      display: 'flex',
      marginTop: theme.spacing(6),
      padding: theme.spacing(3)
    },
    container: {
      backgroundColor: theme.palette.primary.light,
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
      marginTop: theme.spacing(20)
    },
    personalChef: {
      '@media only screen and (min-width: 858px)': {
        position: 'absolute',
        height: '530px',
        maxWidth: '363px',
        right: theme.spacing(2),
        top: theme.spacing(10),
      },
      borderRadius: '32px 0',
      height: '330px',
      margin: theme.spacing(4, 0),
      width: '100%',
      imageRendering: '-webkit-optimize-contrast'
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
    }
  })
);
