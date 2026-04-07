import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Informes(){

  const [gastos, setGastos] = useState([]);
  const [totalMes, setTotalMes] = useState(0);

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

  const gastosMes = data.filter((item) => {
    const fecha = new Date(item.created_at);

    return (
      fecha.getMonth() === ahora.getMonth() &&
      fecha.getFullYear() === ahora.getFullYear()
    );
  });

  setGastos(gastosMes);

  const total = gastosMes.reduce((acc, item) => {
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

  return(
    <View style={styles.container}>

      <Text style={styles.title}>📊 Historial de gastos</Text>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>💸 Total gastado este mes</Text>
        <Text style={styles.totalMonto}>
          ${totalMes.toLocaleString('es-CL')}
        </Text>
      </View>

      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const fecha = new Date(item.created_at);
          const esIngreso = item.tipo_gasto.includes('Ingreso');

          return (
            <View style={styles.card}>

              <Text
                style={[
                  styles.tipo,
                  esIngreso && styles.ingreso
                ]}
              >
                {item.tipo_gasto}
              </Text>

              <Text
                style={[
                  styles.monto,
                  esIngreso 
                ]}
              >
                ${item.monto.toLocaleString('es-CL')}
              </Text>

              <Text style={styles.sueldo}>
                Restante: ${item.sueldo_actualizado.toLocaleString('es-CL')}
              </Text>

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
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
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

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
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

  fecha: {
    marginBottom: 6,
    marginTop: 8,
    fontSize: 13,
    color: '#6b7280',
  },

  hora: {
    fontSize: 13,
    color: '#9ca3af',
  },
});