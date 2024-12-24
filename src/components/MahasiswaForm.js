import React, { useState } from 'react';
import axios from 'axios';
import './MahasiswaForm.css';  // Import file CSS

const MahasiswaForm = () => {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [tanggal_lahir, setTanggalLahir] = useState('');
  const [fakultas, setFakultas] = useState('');
  const [prodi, setProdi] = useState('');
  const [loading, setLoading] = useState(false);  // Untuk loading status
  const [error, setError] = useState(''); // Untuk menampilkan pesan error

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi input
    if (!nim || !nama || !alamat || !tanggal_lahir || !fakultas || !prodi) {
      setError('Semua kolom harus diisi!');
      return;
    }

    const mahasiswa = { nim, nama, alamat, tanggal_lahir, fakultas, prodi };

    setLoading(true);  // Set loading menjadi true saat request sedang diproses

    axios.post('http://127.0.0.1:8000/api/mahasiswa', mahasiswa)
      .then(response => {
        alert('Mahasiswa berhasil ditambahkan!');
        setLoading(false);  // Set loading kembali ke false setelah berhasil
        // Reset form setelah berhasil
        setNim('');
        setNama('');
        setAlamat('');
        setTanggalLahir('');
        setFakultas('');
        setProdi('');
        setError(''); // Reset error message
      })
      .catch(error => {
        console.error(error);
        setError('Terjadi kesalahan, silakan coba lagi.');
        setLoading(false);  // Set loading kembali ke false jika error
      });
  };

  return (
    <div className="form-container">
      <h2>Tambah Mahasiswa</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert">{error}</div>}
        
        <label htmlFor="nim">NIM</label>
        <input
          type="text"
          id="nim"
          placeholder="NIM"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
        />
        
        <label htmlFor="nama">Nama</label>
        <input
          type="text"
          id="nama"
          placeholder="Nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        <label htmlFor="alamat">Alamat</label>
        <input
          type="text"
          id="alamat"
          placeholder="Alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
        />
        
        <label htmlFor="tanggal_lahir">Tanggal Lahir</label>
        <input
          type="date"
          id="tanggal_lahir"
          value={tanggal_lahir}
          onChange={(e) => setTanggalLahir(e.target.value)}
        />
        
        <label htmlFor="fakultas">Fakultas</label>
        <input
          type="text"
          id="fakultas"
          placeholder="Fakultas"
          value={fakultas}
          onChange={(e) => setFakultas(e.target.value)}
        />
        
        <label htmlFor="prodi">Prodi</label>
        <input
          type="text"
          id="prodi"
          placeholder="Prodi"
          value={prodi}
          onChange={(e) => setProdi(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Tambah Mahasiswa'}
        </button>
      </form>
    </div>
  );
};

export default MahasiswaForm;
