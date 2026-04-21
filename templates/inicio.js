import { StyleSheet, Text, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function Inicio() {

  const insultos = [
    "Andate a la ctm",
    "Ahorra chuchetumare que nos vamo a brasil",
    "Ahorra cuchetumare que nos vamos a PR",
    "Pobre de tu madre que te tenga que soportar aún",
    "Te gustan puros aweonaos",
    "Como tan aweona xdios",
    "Oh no!! una mujer que busca algo serio en estos tiempos de locoos",
    "te amo hija del ñato",
  ];

  const [insultoActual, setInsultoActual] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const navigation = useNavigation();

  const Registrar = () => {
    navigation.navigate('Registrar');
  };

  const Informes = () => {
    navigation.navigate('Informes');
  };

  const generarInsulto = () => {
    const randomIndex = Math.floor(Math.random() * insultos.length);
    const nuevoInsulto = insultos[randomIndex];

    setInsultoActual(nuevoInsulto);

    // limpiar timeout anterior si existe
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      setInsultoActual('');
    }, 5000);

    setTimeoutId(id);
  };

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

        <TouchableOpacity style={styles.card} onPress={generarInsulto}>
          <Ionicons name="hand-left-outline" size={28} color="#48d3ec" />
          <Text style={styles.card_text}>
            Ser Insultada
          </Text>
        </TouchableOpacity>

        {/* 👇 INSULTO BONITO */}
        {insultoActual !== '' && (
          <View style={styles.insultoCard}>
            <Text style={styles.insultoEmoji}>💀</Text>
            <Text style={styles.insultoTexto}>
              {insultoActual}
            </Text>
          </View>
        )}

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
  },

  insultoCard: {
    marginTop: 30,
    backgroundColor: '#fee2e2',
    padding: 20,
    borderRadius: 20,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',

    shadowColor: '#ef4444',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  insultoEmoji: {
    fontSize: 30,
    marginBottom: 10,
  },

  insultoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b91c1c',
    textAlign: 'center',
    lineHeight: 26,
  },
});