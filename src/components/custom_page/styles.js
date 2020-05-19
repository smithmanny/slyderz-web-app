import { makeStyles, createStyles } from '../shared/theme';

export default makeStyles(theme =>
  createStyles({
   header: {
     backgroundColor: theme.palette.error.light,
     height: '450px',
     position: 'relative'
   },
   title: {
     color: theme.palette.white.main,
     display: 'flex',
     alignItems: 'center',
     height: '100%',
     justifyContent: 'center',
     textTransform: 'uppercase'
   }
  })
);
