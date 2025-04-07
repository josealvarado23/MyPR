// App.js
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  Timestamp
} from 'firebase/firestore';
import './App.css';

// Firebase config from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyC-RBm6mApkEbQR232XDwy6VDvzvWi_Tnw",
  authDomain: "mypr-c005b.firebaseapp.com",
  projectId: "mypr-c005b",
  storageBucket: "mypr-c005b.firebasestorage.app",
  messagingSenderId: "882444292027",
  appId: "1:882444292027:web:45bb35200a8907785fbe9e",
  measurementId: "G-8J0RFXF98P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
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
      const querySnapshot = await getDocs(collection(db, 'exercises'));
      const fetchedRecords = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          date: data.date.toDate(),
        };
      });
      setRecords(fetchedRecords);
    };

    fetchData();
  }, []);

  const handleAddRecord = async () => {
    const newRecord = {
      exerciseName: form.exerciseName,
      weight: parseFloat(form.weight),
      reps: parseInt(form.reps),
      sets: parseInt(form.sets),
      date: Timestamp.now(),
    };

    await addDoc(collection(db, 'exercises'), newRecord);
    setRecords((prev) => [...prev, { ...newRecord, date: new Date() }]);
    setShowModal(false);
    setForm({ exerciseName: '', weight: '', reps: '', sets: '' });
  };

  return (
    <div className="App">
      <h1>MyPR</h1>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            <strong>{record.exerciseName}</strong> – Weight: {record.weight}, Date: {record.date.toLocaleDateString()}
          </li>
        ))}
      </ul>
      <button onClick={() => setShowModal(true)}>Add New Record</button>

      {showModal && (
        <div className="modal">
          <h2>Add New Record</h2>
          <input
            placeholder="Exercise Name"
            value={form.exerciseName}
            onChange={(e) => setForm({ ...form, exerciseName: e.target.value })}
          />
          <input
            placeholder="Weight"
            type="number"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />
          <input
            placeholder="Reps"
            type="number"
            value={form.reps}
            onChange={(e) => setForm({ ...form, reps: e.target.value })}
          />
          <input
            placeholder="Sets"
            type="number"
            value={form.sets}
            onChange={(e) => setForm({ ...form, sets: e.target.value })}
          />
          <button onClick={handleAddRecord}>Save</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
// App.css
/* App.css */