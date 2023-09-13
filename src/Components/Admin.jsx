import React, { useEffect, useState } from 'react';
import './CSS/Admin.css';
import { getDocs, collection, db, doc, updateDoc, deleteDoc } from "../firebase";
import Swal from 'sweetalert2';

export default function Admin() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const userDataArray = [];
      querySnapshot.forEach((doc) => {
        userDataArray.push({ id: doc.id, ...doc.data() });
      });
      setUserData(userDataArray);
    }
    fetchData();
  }, []);

  const handleEditCountry = async (userId) => {
    const { value: updatedCountry } = await Swal.fire({
      title: 'Edit Country',
      input: 'text',
      inputValue: userData.find((user) => user.id === userId).Country,
      showCancelButton: true,
    });

    if (updatedCountry) {
      try {
        const userDocRef = doc(db, "Users", userId);
        await updateDoc(userDocRef, { Country: updatedCountry });
        // Refresh user data after the update
        const updatedUserData = userData.map((user) => {
          if (user.id === userId) {
            return { ...user, Country: updatedCountry };
          } else {
            return user;
          }
        });
        setUserData(updatedUserData);
        Swal.fire('Updated!', 'User data has been updated.', 'success');
      } catch (error) {
        console.error("Error updating user data:", error);
        Swal.fire('Error!', 'An error occurred while updating user data.', 'error');
      }
    }
  };

  const handleEditName = async (userId) => {
    const { value: updatedName } = await Swal.fire({
      title: 'Edit Name',
      input: 'text',
      inputValue: userData.find((user) => user.id === userId).Name,
      showCancelButton: true,
    });

    if (updatedName) {
      try {
        const userDocRef = doc(db, "Users", userId);
        await updateDoc(userDocRef, { Name: updatedName });
        // Refresh user data after the update
        const updatedUserData = userData.map((user) => {
          if (user.id === userId) {
            return { ...user, Name: updatedName };
          } else {
            return user;
          }
        });
        setUserData(updatedUserData);
        Swal.fire('Updated!', 'Name has been updated.', 'success');
      } catch (error) {
        console.error("Error updating name:", error);
        Swal.fire('Error!', 'An error occurred while updating name.', 'error');
      }
    }
  };

  const handleEditFatherName = async (userId) => {
    const { value: updatedFatherName } = await Swal.fire({
      title: "Edit Father's Name",
      input: 'text',
      inputValue: userData.find((user) => user.id === userId).Father_Name,
      showCancelButton: true,
    });

    if (updatedFatherName) {
      try {
        const userDocRef = doc(db, "Users", userId);
        await updateDoc(userDocRef, { Father_Name: updatedFatherName });
        // Refresh user data after the update
        const updatedUserData = userData.map((user) => {
          if (user.id === userId) {
            return { ...user, Father_Name: updatedFatherName };
          } else {
            return user;
          }
        });
        setUserData(updatedUserData);
        Swal.fire('Updated!', "Father's Name has been updated.", 'success');
      } catch (error) {
        console.error("Error updating Father's Name:", error);
        Swal.fire('Error!', 'An error occurred while updating Father Name.', 'error');
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Delete User',
      text: 'Are you sure you want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (isConfirmed) {
      try {
        const userDocRef = doc(db, "Users", userId);
        await deleteDoc(userDocRef);
        // Remove the deleted user from the user data list
        const updatedUserData = userData.filter((user) => user.id !== userId);
        setUserData(updatedUserData);
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire('Error!', 'An error occurred while deleting the user.', 'error');
      }
    }
  };

  return (
    <div className="user-container">
      <h2>User List</h2>
      <div className="user-list">
        {userData.map((user) => (
          <div className="user-card" key={user.id}>
            <p>Name: {user.Name}</p>
            <p>Father Name: {user.Father_Name}</p>
            <p>Country: {user.Country}</p>
            <p>Email: {user.Email}</p>
            <div id='show'>
            <button onClick={() => handleEditName(user.id)}>Edit Name</button>
            <button onClick={() => handleEditFatherName(user.id)}>Edit Father's Name</button>
            <button onClick={() => handleEditCountry(user.id)}>Edit Country</button>
            </div>
            <button onClick={() => handleDeleteUser(user.id)} id='del'>Delete</button>
          </div>
        ))}
      </div>
      <p id='user-count'>Total Users: {userData.length}</p>
    </div>
  );
}
