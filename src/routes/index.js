import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from '../screens/Welcome'
import Login from '../screens/Login'

const Stack = createNativeStackNavigator()

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
            />

                <Stack.Screen
                name="Login"
                component={Login}
            />
        </Stack.Navigator>
    )
}