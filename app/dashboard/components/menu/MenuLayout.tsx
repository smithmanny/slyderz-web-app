import IconButton from "@mui/material/IconButton";

import ArrowBackIcon from 'app/core/components/icons/ArrowBackIcon'
import Button from 'app/core/components/shared/Button'
import Grid from 'app/core/components/shared/Grid'
import Typography from 'app/core/components/shared/Typography'

const MenuLayout = (props) => {
  const { currentView, buttonFunc, goBackHome, selectedSectionName } = props;
  let buttonTitle: String

  switch (currentView) {
    case 'HOME':
      buttonTitle = 'Add Section'
      break;
    case 'SECTION':
      buttonTitle = 'Add Dish'
      break;
    case 'DISH':
      buttonTitle = ''
      break;
    default:
      buttonTitle = 'Add Section'
  }
  return (
    <Grid container spacing={2}>
      {(currentView === 'SECTION' || currentView === 'DISH') && (
        <Grid item xs={2}>
          <IconButton
            aria-label="back"
            disableRipple
            onClick={goBackHome}
            size="large">
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </Grid>
      )}
      {currentView !== 'DISH' && (
        <Grid item xs={currentView === 'SECTION' ? 10 : 12} justifyContent='flex-end' sx={{ display: 'flex' }}>
          <Button onClick={buttonFunc}>{buttonTitle}</Button>
        </Grid>
      )}
      {currentView === 'SECTION' && (
        <Grid item xs={12}>
          <Typography>Section: {selectedSectionName}</Typography>
        </Grid>
      )}
      <Grid item container xs={12} spacing={2}>
        {props.children}
      </Grid>
    </Grid>
  )
}

export default MenuLayout