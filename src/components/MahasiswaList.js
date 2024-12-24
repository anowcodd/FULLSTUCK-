import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MahasiswaList.css'; // Import file CSS untuk styling

const MahasiswaList = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);  // State untuk loading

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/mahasiswa')
      .then(response => {
        setMahasiswa(response.data);
        setLoading(false);  // Set loading ke false setelah data berhasil diambil
      })
      .catch(error => {
        console.error(error);
        setLoading(false);  // Set loading ke false meskipun terjadi error
      });
  }, []);

  return (
    <div className="container">
      <h2 className="title">Daftar Mahasiswa</h2>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <table className="mahasiswa-table">
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Fakultas</th>
              <th>Prodi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((mhs) => (
              <tr key={mhs.id}>
                <td>{mhs.nim}</td>
                <td>{mhs.nama}</td>
                <td>{mhs.fakultas}</td>
                <td>{mhs.prodi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MahasiswaList;
