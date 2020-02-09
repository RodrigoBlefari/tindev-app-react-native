import {createSwitchNavigator, createAppContainer} from 'react-navigation'

import Login from './pages/login'
import Main from './pages/Main'

// create our app's navigation stack
const RootStack  = createSwitchNavigator(
    {
        Login,
        Main
    },
  )

const App = createAppContainer(RootStack);
export default App;
