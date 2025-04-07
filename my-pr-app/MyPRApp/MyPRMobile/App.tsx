// App.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function App() {
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    exerciseName: '',
    weight: '',
    reps: '',
    sets: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore().collection('exercises').get();
      const fetched = snapshot.docs.map(doc => {
        const data = doc.data();
        return { ...data, date: data.date.toDate(), id: doc.id };
      });
      setRecords(fetched);
    };
    fetchData();
  }, []);

  const handleAddRecord = async () => {
    const newRecord = {
      exerciseName: form.exerciseName,
      weight: parseFloat(form.weight),
      reps: parseInt(form.reps),
      sets: parseInt(form.sets),
      date: new Date(),
    };

    const docRef = await firestore().collection('exercises').add({
      ...newRecord,
      date: firestore.Timestamp.fromDate(newRecord.date),
    });

    setRecords(prev => [...prev, { ...newRecord, id: docRef.id }]);
    setShowModal(false);
    setForm({ exerciseName: '', weight: '', reps: '', sets: '' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>MyPR</Text>
      <FlatList
        data={records}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.exerciseName}</Text>
            <Text style={styles.subItem}>Weight: {item.weight}, Date: {item.date.toLocaleDateString()}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add New Record</Text>

          {['Exercise Name', 'Weight', 'Reps', 'Sets'].map((label, i) => {
            const keys = ['exerciseName', 'weight', 'reps', 'sets'];
            return (
              <TextInput
                key={label}
                placeholder={label}
                keyboardType={label === 'Exercise Name' ? 'default' : 'numeric'}
                style={styles.input}
                value={form[keys[i]]}
                onChangeText={text => setForm({ ...form, [keys[i]]: text })}
              />
            );
          })}

          <View style={styles.modalButtons}>
            <Button title="Cancel" onPress={() => setShowModal(false)} />
            <Button title="Save" onPress={handleAddRecord} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', margin: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#ddd' },
  itemText: { fontSize: 18, fontWeight: '500' },
  subItem: { fontSize: 14, color: 'gray' },
  fab: {
    backgroundColor: '#6200ee',
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: { fontSize: 30, color: '#fff' },
  modalView: {
    backgroundColor: '#fff',
    margin: 30,
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: { fontSize: 20, marginBottom: 15, textAlign: 'center' },
  input: {
    borderBottomWidth: 1,
    borderColor: '#aaa',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
