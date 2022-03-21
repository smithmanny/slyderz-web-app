import Grid from 'app/core/components/shared/Grid'
import MenuLayout from 'app/dashboard/components/menu/MenuLayout'

const DishContainer = (props) => {
  const { currentView, setCurrentView } = props;
  return (
    <MenuLayout currentView={currentView}>
      Dish Container
    </MenuLayout>
  )
}

export default DishContainer