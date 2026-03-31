import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Inicio from './templates/inicio'
import Registrar from './templates/registrar';
import Informes from './templates/informes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">

        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Registrar" component={Registrar} />
        <Stack.Screen name="Informes" component={Informes} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});