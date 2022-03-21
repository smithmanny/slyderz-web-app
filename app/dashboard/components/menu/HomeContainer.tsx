import Card, { CardContent } from 'app/core/components/shared/Card'
import Box from 'app/core/components/shared/Box'
import Grid from 'app/core/components/shared/Grid'
import Typography from 'app/core/components/shared/Typography'
import MenuLayout from 'app/dashboard/components/menu/MenuLayout'

const HomeContainer = (props) => {
  const { currentView, setCurrentView } = props;
  return (
    <MenuLayout
      currentView={currentView}
      setCurrentView={() => setCurrentView('SECTION')}
    >
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography>Entres</Typography>
                <Typography>$25</Typography>
              </Box>

              Buttons
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </MenuLayout>
  )
}

export default HomeContainer