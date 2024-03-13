// App.js
// import React from 'react';
// import { StatusBar } from 'react-native';
// import AppNavigator from './src/routes/index'; // Importe o AppNavigator

// export default function App() {
//   return (
//     <>
//       <StatusBar backgroundColor={"#EEE7D0"} barStyle={"light-content"}/>
//       <AppNavigator />
//     </>
//   );
// }


// App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/routes/index'; // Importe o AppNavigator
import { AuthProvider } from './src/context/authContext'; // Importe o AuthProvider

export default function App() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor={"#EEE7D0"} barStyle={"light-content"}/>
        <AppNavigator />
    </AuthProvider>
  );
}