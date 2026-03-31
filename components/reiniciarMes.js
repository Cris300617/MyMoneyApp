import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function ReiniciarMes({ onReset }) {

  const [mostrarInput, setMostrarInput] = useState(false);
  const [nuevoSueldo, setNuevoSueldo] = useState('');

  const handleReiniciar = () => {
    Alert.alert(
      '⚠️ Reiniciar mes',
      'Esto eliminará TODOS los gastos. ¿Seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí, reiniciar', onPress: () => setMostrarInput(true) }
      ]
    );
  };

  const confirmarReset = async () => {
    const sueldoNumero = parseInt(nuevoSueldo);

    if (!sueldoNumero || sueldoNumero <= 0) {
      Alert.alert('Error', 'Ingresa un sueldo válido');
      return;
    }

    // 🔥 BORRAR TODO
    const { error: errorDelete } = await supabase
      .from('gastos')
      .delete()
      .neq('id', 0); // elimina todo

    if (errorDelete) {
      Alert.alert('Error', 'No se pudo reiniciar');
      return;
    }

    // 🔥 INSERTAR NUEVO "INICIO"
    const { error: errorInsert } = await supabase
      .from('gastos')
      .insert([
        {
          tipo_gasto: 'Inicio 💰',
          monto: 0,
          sueldo_actualizado: sueldoNumero
        }
      ]);

    if (errorInsert) {
      Alert.alert('Error', 'No se pudo guardar el nuevo sueldo');
      return;
    }

    setNuevoSueldo('');
    setMostrarInput(false);

    // 🔥 actualizar en pantalla
    onReset(sueldoNumero);

    Alert.alert('✅ Listo', 'Mes reiniciado correctamente');
  };

  return (
    <View style={{ marginTop: 30 }}>

      {!mostrarInput ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#ef4444',
            padding: 15,
            borderRadius: 20,
            alignItems: 'center'
          }}
          onPress={handleReiniciar}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>
            🔄 Reiniciar mes
          </Text>
        </TouchableOpacity>
      ) : (
        <View>

          <Text style={{ marginBottom: 10 }}>
            Ingresa tu nuevo sueldo 💸
          </Text>

          <TextInput
            placeholder="Ej: 1500000"
            keyboardType="numeric"
            value={nuevoSueldo}
            onChangeText={setNuevoSueldo}
            style={{
              backgroundColor: '#fff',
              padding: 12,
              borderRadius: 15,
              marginBottom: 10
            }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#22c55e',
              padding: 15,
              borderRadius: 15,
              alignItems: 'center'
            }}
            onPress={confirmarReset}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>
              Confirmar nuevo mes
            </Text>
          </TouchableOpacity>

        </View>
      )}

    </View>
  );
}