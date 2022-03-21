import Grid from 'app/core/components/shared/Grid'
import MenuLayout from 'app/dashboard/components/menu/MenuLayout'

const SectionContainer = (props) => {
  const { currentView, setCurrentView } = props;
  return (
    <MenuLayout
      currentView={currentView}
      goBackHome={() => setCurrentView('HOME')}
    >
      Section Container
    </MenuLayout>
  )
}

export default SectionContainer