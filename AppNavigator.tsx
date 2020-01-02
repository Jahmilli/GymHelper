import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from './src/screens/login/LoginScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import CreateWorkout from "./src/screens/createWorkout/CreateWorkout";
import AddExerciseType from "./src/components/AddExerciseType/AddExerciseType";
import AddExercise from "./src/components/AddExercise/AddExercise";
import AddExerciseInfo from "./src/components/AddExerciseInfo/AddExerciseInfo";
import TemplateWorkout from "./src/components/TemplateWorkout/TemplateWorkout";
import SharedWorkouts from "./src/components/SharedWorkouts/SharedWorkouts";
import CreateNewUserWorkout from "./src/components/CreateNewUserWorkout/CreateNewUserWorkout";

const AppNavigation = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Home: {
      screen: HomeScreen
    },
    CreateWorkout: {
      screen: CreateWorkout
    },
    AddExerciseType: {
      screen: AddExerciseType
    },
    AddExercise: {
      screen: AddExercise
    },
    AddExerciseInfo: {
      screen: AddExerciseInfo
    },
    TemplateWorkout: {
      screen: TemplateWorkout
    },
    SharedWorkouts: {
      screen: SharedWorkouts
    },
    CreateNewUserWorkout: {
      screen: CreateNewUserWorkout
    }
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

// @ts-ignore
// HomeScreen.navigationOptions = {
//   title: 'Home'
// }

export default createAppContainer(AppNavigation);
