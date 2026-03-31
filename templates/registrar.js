import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Registrar() {

  const [sueldo, setSueldo] = useState(0);

  const tipoGasto = [
    'Regalos 🎁','Gaspi 🐶','Copete 🍻','Comida 🍝',
    'Casa 🏡','Hormiga 🤡','Marakas 🤑','Ahorros 🚗'
  ];

  const [selected, setSelected] = useState(null);
  const [monto, setMonto] = useState('');
  const [montoExtra, setMontoExtra] = useState('');

  useEffect(() => {
    obtenerUltimoSueldo();
  }, []);

  const obtenerUltimoSueldo = async () => {
    const { data } = await supabase
      .from('gastos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      setSueldo(data[0].sueldo_actualizado);
    }
  };

  const handleGuardar = async () => {
    const montoNumero = parseInt(monto);

    if (!montoNumero || !selected) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    if (montoNumero > sueldo) {
      Alert.alert('Error', 'No tienes suficiente dinero 💀');
      return;
    }

    const nuevoSueldo = sueldo - montoNumero;

    const { error } = await supabase.from('gastos').insert([
      {
        tipo_gasto: selected,
        monto: montoNumero,
        sueldo_actualizado: nuevoSueldo
      }
    ]);

    if (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo guardar');
      return;
    }

    setSueldo(nuevoSueldo);
    setMonto('');
    setSelected(null);
  };

  const handleSumarDinero = async () => {
    const montoNumero = parseInt(montoExtra);

    if (!montoNumero || montoNumero <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido');
      return;
    }

    const nuevoSueldo = sueldo + montoNumero;

    const { error } = await supabase.from('gastos').insert([
      {
        tipo_gasto: 'Ingreso 💰',
        monto: montoNumero,
        sueldo_actualizado: nuevoSueldo
      }
    ]);

    if (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo agregar dinero');
      return;
    }

    setSueldo(nuevoSueldo);
    setMontoExtra('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.container}>

            <View style={styles.sueldoCard}>
              <Text style={styles.sueldoLabel}>💸 Dinero restante</Text>
              <Text style={styles.sueldo}>
                ${sueldo.toLocaleString('es-CL')}
              </Text>
            </View>

            <Text style={styles.label}>Agregar dinero 💰</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="add-circle-outline" size={20} color="#22c55e" />
              <TextInput
                style={styles.input}
                placeholder="Ej: 200000"
                keyboardType="numeric"
                value={montoExtra}
                onChangeText={setMontoExtra}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#22c55e' }]}
              onPress={handleSumarDinero}
            >
              <Text style={styles.buttonText}>Sumar dinero</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Registrar gasto</Text>

            <Text style={styles.label}>
              ¿Qué tipo de gasto fue?
            </Text>

            <View style={styles.optionsContainer}>
              {tipoGasto.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    selected === item && styles.optionSelected
                  ]}
                  onPress={() => setSelected(item)}
                >
                  <Text style={[
                    styles.optionText,
                    selected === item && styles.optionTextSelected
                  ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>
              ¿Cuánto gastaste?
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons name="cash-outline" size={20} color="#a855f7" />
              <TextInput
                style={styles.input}
                placeholder="Ej: 50000"
                keyboardType="numeric"
                value={monto}
                onChangeText={setMonto}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleGuardar}
            >
              <Text style={styles.buttonText}>Guardar gasto</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf4ff',
    padding: 20,
  },

  sueldoCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  sueldoLabel: {
    fontSize: 14,
    color: '#6b7280',
  },

  sueldo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#a855f7',
    marginTop: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f1f1f',
    marginBottom: 10,
    marginTop: 20
  },

  label: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 10,
    marginTop: 10,
  },

  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  option: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  optionSelected: {
    backgroundColor: '#f0abfc',
    borderColor: '#d946ef',
  },

  optionText: {
    color: '#374151',
    fontWeight: '500',
  },

  optionTextSelected: {
    color: '#ffffff',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 5,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },

  button: {
    marginTop: 20,
    backgroundColor: '#a855f7',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  }
});