import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

const Register = () => {
    const [nis, setNis] = useState('');
    const [email, setEmail] = useState('');
    const [alasan, setAlasan] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [kelas, setKelas] = useState('');
    const [nama, setNama] = useState('');
    const [errors, setErrors] = useState({ noTelpon: '', email: '', alasan: '', nis: ''});


    const handleNisChange = (e) => {
        const newNis = e.target.value;
        setNis(newNis);

        fetch(`/api/students/${newNis}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.exists) {
                    setKelas(data.kelas);
                    setNama(data.nama);
                }else{
                    setKelas('');
                    setNama('');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation');
            });
    };

    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    function isValidPhoneNumber(phoneNumber) {
        const phonePattern = /^\+[0-9]{10,15}$/;
        return phonePattern.test(phoneNumber);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nama == '' && kelas == '') {
            setErrors({nis: 'NIS tidak ditemukan'});
        } else if (isValidEmail(email) == false) {
            setErrors({email: 'Email tidak valid'});
        } else if (isValidPhoneNumber(noTelp) == false) {
            setErrors({noTelp: 'No. Telepon harus valid dan menggunakan format internasional, contoh: +62 81234567890'});
        } else {
            Inertia.post('/register', { nis, email, nama, alasan, kelas, noTelp });
        }
    };

    return (
        <div className='w-dvw h-screen flex justify-center items-center bg-[url("img/background_splash.jpg")] bg-no-repeat bg-cover'>
            <div className='w-full h-full bg-black bg-opacity-[0.75] absolute z-0'></div>
            <div class="form-container z-10">
                <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>FORM PENDAFTARAN EKSTRAKURIKULER SYNTAX<br/>SMK TELEKOMUNIKASI TELESANDI BEKASI</h2>
                <div className='w-full h-0.5 bg-gray-400 mb-10'></div>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-row mt-4 mb-3.5'>
                        <div class="w-full relative">
                            <label className='form-label block'>Email:</label>
                            <div class="relative w-full pr-10">
                                <span class="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </span>
                                <input className='input-field block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm' type="email" placeholder='Contoh: budi@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            {errors.email && (
                                <div className="mt-1 ml-2 text-red-500 text-sm">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div class="w-full relative">
                            <label className='form-label block'>NIS:</label>
                            <div class="relative w-full">
                                <span class="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
                                </span>
                                <input className='input-field block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm' placeholder='Contoh: 012345678' type="text" value={nis} onChange={handleNisChange} required />
                                
                            </div>
                            {errors.nis && (
                                <div className="mt-1 ml-2 text-red-500 text-sm">
                                    {errors.nis}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-row mt-4 mb-3.5'>
                        <div className="w-full relative">
                            <label className='form-label block mr-6'>Nama:</label>
                            <div class="relative w-full pr-10">
                                <span class="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </span>
                                <input className='input-field block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm' placeholder='Otomatis akan terisi dengan NIS' type="text" value={nama} readOnly />
                            </div>
                        </div>
                        <div className='w-full relative'>
                            <label className='form-label block mr-6'>Kelas:</label>
                            <div class="relative w-full">
                                <span class="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </span>
                                <input className='input-field block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm' placeholder='Otomatis akan terisi dengan NIS' type="text" value={kelas} readOnly />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row mt-4 mb-3.5'>
                        <div className='w-full relative'>
                            <label className='form-label block mr-6'>No. Telepon:</label>
                            <div class="relative w-full pr-10">
                                <span class="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </span>
                                <input className='input-field block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm' placeholder='Contoh: +62 81234567890' type="text" value={noTelp} onChange={(e) => setNoTelp(e.target.value)} required />
                            </div>
                            {errors.noTelp && (
                                <div className="mt-1 ml-2 text-red-500 text-sm">
                                    {errors.noTelp}
                                </div>
                            )}
                        </div>
                        <div className='w-full relative'>
                            <label className='form-label block mr-6'>Alasan Masuk:</label>
                            <div class="relative w-full">
                                <span class="input-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                </span>
                                <input className='input-field block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm' placeholder='Contoh: Ingin belajar pemrograman' value={alasan} onChange={(e) => setAlasan(e.target.value)} required />
                            </div>
                            {errors.alasan && (
                                <div className="mt-1 ml-2 text-red-500 text-sm">
                                    {errors.alasan}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='w-full h-max flex justify-center items-center content-center mt-10 mb-4'>
                        <button type='submit' className="w-full/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-110 p-10">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;