import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import Button from 'app/core/components/shared/Button'
import Grid from 'app/core/components/shared/Grid'

const MenuLayout = (props) => {
  const { currentView, setCurrentView, goBackHome } = props;
  let buttonTitle: String

  switch (currentView) {
    case 'HOME':
      buttonTitle = 'Add Section'
      break;
    case 'SECTION':
      buttonTitle = 'Add Dish'
      break;
    case 'DISH':
      buttonTitle = 'Update/Create Dish'
      break;
    default:
      buttonTitle = 'Add Section'
  }
  return (
    <Grid container spacing={2}>
      {currentView === 'SECTION' && (
        <Grid item xs={2}>
          <IconButton
            aria-label="back"
            disableRipple
            onClick={goBackHome}
            size="large">
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        </Grid>
      )}
      {currentView !== 'DISH' && (
        <Grid item xs={currentView === 'SECTION' ? 10 : 12} justifyContent='flex-end' sx={{ display: 'flex' }}>
          <Button onClick={setCurrentView}>{buttonTitle}</Button>
        </Grid>
      )}
      <Grid item container xs={12}>
        {props.children}
      </Grid>
    </Grid>
  )
}

export default MenuLayout