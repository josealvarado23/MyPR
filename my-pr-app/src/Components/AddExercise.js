// Example: src/components/AddExercise.js
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const AddExercise = () => {
  const [exerciseName, setExerciseName] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "exercises"), {
        exerciseName,
        weight: parseFloat(weight),
        timestamp: serverTimestamp(),
      });
      // Clear the form or display success message
      setExerciseName("");
      setWeight("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Exercise Name"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button type="submit">Add Exercise</button>
    </form>
  );
};

export default AddExercise;
