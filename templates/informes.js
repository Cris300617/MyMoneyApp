import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal
} from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Ionicons } from '@expo/vector-icons';

export default function Informes(){

  const [gastos, setGastos] = useState([]);
  const [gastosMes, setGastosMes] = useState([]);
  const [totalMes, setTotalMes] = useState(0);
  const [filtro, setFiltro] = useState('Todos');
  const [modalVisible, setModalVisible] = useState(false);

  const tipoGasto = [
    'Todos',
    'Regalos 🎁','Gaspy 🐶','Copete 🍻','Comida 🍝',
    'Casa 🏡','Hormiga 🤡','Ahorros 🚗','Ingreso 💰'
  ];

  const obtenerDatos = async () => {
    const { data, error } = await supabase
      .from('gastos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('ERROR:', error);
      return;
    }

    const ahora = new Date();

    const filtradosMes = data.filter((item) => {
      const fecha = new Date(item.created_at);
      return (
        fecha.getMonth() === ahora.getMonth() &&
        fecha.getFullYear() === ahora.getFullYear()
      );
    });

    setGastosMes(filtradosMes);
    setGastos(filtradosMes);

    const total = filtradosMes.reduce((acc, item) => {
      if (!item.tipo_gasto.includes('Ingreso')) {
        return acc + item.monto;
      }
      return acc;
    }, 0);

    setTotalMes(total);
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  useEffect(() => {
    if (filtro === 'Todos') {
      setGastos(gastosMes);
    } else {
      const filtrados = gastosMes.filter(
        (item) => item.tipo_gasto === filtro
      );
      setGastos(filtrados);
    }
  }, [filtro, gastosMes]);

  return(
    <View style={styles.container}>

      <Text style={styles.title}>📊 Historial de gastos</Text>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>💸 Total gastado este mes</Text>
        <Text style={styles.totalMonto}>
          ${totalMes.toLocaleString('es-CL')}
        </Text>
      </View>

      {/* 👇 BOTÓN DROPDOWN */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          Filtro: {filtro}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#6b7280" />
      </TouchableOpacity>

      {/* 👇 MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {tipoGasto.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => {
                  setFiltro(item);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const fecha = new Date(item.created_at);
          const esIngreso = item.tipo_gasto.includes('Ingreso');

          return (
            <View style={styles.card}>

              <Text style={[
                styles.tipo,
                esIngreso && styles.ingreso
              ]}>
                {item.tipo_gasto}
              </Text>

              <Text style={[
                styles.monto,
                esIngreso && styles.ingreso
              ]}>
                ${item.monto.toLocaleString('es-CL')}
              </Text>

              <Text style={styles.sueldo}>
                Restante: ${item.sueldo_actualizado.toLocaleString('es-CL')}
              </Text>

              {item.descripcion && item.descripcion.trim() !== '' && (
                <Text style={styles.descripcion}>
                  📝 {item.descripcion}
                </Text>
              )}

              <Text style={styles.fecha}>
                📅 {fecha.toLocaleDateString('es-CL', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </Text>

              <Text style={styles.hora}>
                ⏰ {fecha.toLocaleTimeString('es-CL', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Text>

            </View>
          );
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf4ff',
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1f1f1f',
  },

  totalCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 4,
  },

  totalLabel: {
    fontSize: 14,
    color: '#6b7280',
  },

  totalMonto: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ec4899',
    marginTop: 5,
  },

  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  dropdownText: {
    color: '#374151',
    fontWeight: '500',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 40,
  },

  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
  },

  modalItem: {
    padding: 12,
  },

  modalText: {
    fontSize: 16,
    color: '#1f1f1f',
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 2,
  },

  tipo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#a855f7',
  },

  ingreso: {
    color: '#22c55e',
  },

  monto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },

  sueldo: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 5,
  },

  descripcion: {
    marginTop: 6,
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
  },

  fecha: {
    marginTop: 8,
    fontSize: 13,
    color: '#6b7280',
  },

  hora: {
    fontSize: 13,
    color: '#9ca3af',
  },
});