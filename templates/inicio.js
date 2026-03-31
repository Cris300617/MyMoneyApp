import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {

  const navigation = useNavigation();

  const Registrar = () => {
    navigation.navigate('Registrar')
  }
  const Informes = () => {
    navigation.navigate('Informes')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>

      <Text style={styles.title}>Bienvenida 💖</Text>
      <Text style={styles.sub_title}>
        ¿Qué deseas hacer el día de hoy?
      </Text>

      <TouchableOpacity style={styles.card} onPress={Registrar}>
        <Ionicons name="cash-outline" size={28} color="#a855f7" />
        <Text style={styles.card_text}>
          Registrar nuevo gasto
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={Informes}>
        <Ionicons name="document-text-outline" size={28} color="#ec4899" />
        <Text style={styles.card_text}>
          Ver historial de gastos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Ionicons name="hand-left-outline" size={28} color="#48d3ec" />
        <Text style={styles.card_text}>
          Ser Insultada
        </Text>
      </TouchableOpacity>

      

    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fdf4ff', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f1f1f',
    marginBottom: 10,
    textAlign: 'center',
  },

  sub_title: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 30,
    textAlign: 'center',
  },

  card: {
    maxWidth: 300,
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 20,
    marginVertical: 10,
    
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    elevation: 4,
  },

  card_text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  }
});