import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Countdown from './Countdown';
import '../../css/app.css';

const Index = () => {
     const handleRegisterClick = () => {
        document.body.classList.add('loading');
        document.getElementById('btnone').classList.add('loading');
        axios.get('/check-cookie')
        .then(response => {
            document.body.classList.remove('loading');
            document.getElementById('btnone').classList.remove('loading');
            window.location.href = response.request.responseURL;
        })
        .catch(error => {
            document.body.classList.remove('loading');
            document.getElementById('btnone').classList.remove('loading');
        });
    };

    const [countdownValue, setCountdownValue] = useState('');

    const updateClosingTime = async () => {
        try {
            const response = await axios.put(`/api/closings/1`, {
                batas_waktu: '2024-7-14 23:59:59',
                tipe: 'Tutup',
            });
            alert('Data berhasil diupdate');
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            alert('Gagal mengupdate data');
        }
    };
    
    const fetchTipeBatas = async () => {
        try {
            const response = await axios.get('/api/tipe');
            const jenisTipe = new String(response.data.tipe);
            let tp = jenisTipe;
            if (countdownValue !== null || countdownValue !== '' || countdownValue !== undefined) {
                try {
                    if (tp == 'Buka' && countdownValue == '0d 0h 0m 0s') {
                        updateClosingTime();
                    }
                    if (tp == 'Tutup' && countdownValue == '0d 0h 0m 0s') {
                        document.getElementById('main').classList.add('hidden');
                        document.getElementById('main').classList.remove('block');
                        document.getElementById('close').classList.add('block');
                        document.getElementById('close').classList.remove('hidden');
                        document.getElementById('title-m').innerHTML = 'Pendaftaran Telah Ditutup';
                        document.getElementById('subtitle-m').innerHTML = 'Terima kasih atas partisipasinya. Sampai jumpa di kesempatan berikutnya!';
                    }else if (tp == 'Buka' && countdownValue !== '0d 0h 0m 0s'){
                        document.getElementById('main').classList.add('hidden');
                        document.getElementById('main').classList.remove('block');
                        document.getElementById('close').classList.add('block');
                        document.getElementById('close').classList.remove('hidden');
                        document.getElementById('title-m').innerHTML = 'Pendaftaran Segera Dibuka';
                        document.getElementById('subtitle-m').innerHTML = `Ayo segera daftar sebelum pendaftaran ditutup! Akan dibuka dalam ${countdownValue}`;
                    }else{
                        document.getElementById('main').classList.add('block');
                        document.getElementById('main').classList.remove('hidden');
                        document.getElementById('close').classList.add('hidden');
                        document.getElementById('close').classList.remove('block');
                    }
                } catch (error) {
                    
                } 
            }
        } catch (error) {
            
        }
    };

    fetchTipeBatas();


    const handleUpdateCountdown = (value) => {
        setCountdownValue(value);
    };

    const [isVisible, setIsVisible] = useState(true);

    const linkClick = ({ target }) => {
        const href = target.getAttribute('href') || target.getAttribute('data-href');
        if (href !== href.startsWith('mailto:')) {
            window.open(href, '_blank');
        }else if(href === href.startsWith('mailto:')){
            window.location.href = href;
        }
    };

    useEffect(() => {
 
        const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    

    const Card = ({ title, content, icon }) => {
        return (
          <div className="bg-gradient-to-r h-H+32 from-blue-500 to-blue-300 text-white rounded-lg p-7 shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-4">
                {icon}
              </div>
              <h2 className="text-xl font-bold">{title}</h2>
            </div>
            <p className='text-justify'>{content}</p>
          </div>
        );
      };

    return (
        <div className='w-max h-max p-0 m-0'>
            <div id='main' className='hidden'>
                <header className='w-screen h-[70px] bg-white fixed z-50 shadow-md shadow-slate-100'>
                    <div className='w-full h-full flex justify-between items-center p-4'>
                        <img src="img/syntax-community.png" alt="" className=' w-[140px] h-[53px] mr-auto'/>
                        <img src="img/alert-triangle.svg" className='mr-2.5' alt="" />
                        <h1 className='text-lg flex flex-row'>Pendaftaran akan ditutup dalam <span id='timer' className='ml-[6px] text-blue-600'><Countdown onUpdateCountdown={handleUpdateCountdown}></Countdown></span></h1>
                        <img src="img/alert-triangle.svg" className='ml-2.5' alt="" />
                        <div className='w-[140px] ml-auto'></div>
                    </div>
                </header>
                <section className='w-screen h-screen flex flex-col items-center bg-[url("img/background.jpg")] bg-no-repeat text-white'>
                    <div className='w-full h-full bg-black bg-opacity-[0.83] absolute z-0'/>
                    <div className='w-full h-2 mb-auto'></div>
                    <h1 className='text-3xl mb-2 p-4 animate-fadeIn font-["Inter"] z-10'>WELCOME TO SYNTAX COMMUNITY</h1>
                    <div onClick={handleRegisterClick} id='btnone' className='w-44 h-10 -mt-2.5 z-10 bg-blue-500 cursor-pointer animate-fadeIn hover:bg-blue-700 rounded-xl text-center justify-center items-center content-center transition duration-300 ease-in-out transform hover:scale-110'>
                        <i class="fa-solid fa-code"></i>
                        <span className='w-max h-max ml-[6px]'>Join Now</span>
                    </div>
                    <div className='w-full h-2 mt-auto'></div>
                    <div className={`fixed bottom-4 w-full flex justify-center ${isVisible ? 'block' : 'hidden'}`}>
                        <svg className="w-10 h-10 text-gray-500 mb-2 animate-bounce" fill="#FFFFFF" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 14a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4A1 1 0 0110 14z" clipRule="evenodd" />
                        </svg>
                    </div>
                </section>

                <section className='w-dvw h-dvh/2 flex flex-col bg-[#eeecec] justify-center items-center' id='about'>
                    <div className='w-dvw h-max flex flex-row justify-between'>
                        <div className='w-max h-full flex flex-col items-center justify-center'>
                            <img src="img/bubble.png" className='w-max h-52 ml-[58px] -mb-8' alt="" />
                            <img src="img/person.png" className='w-max h-80 ml-28 ' alt="" />
                        </div>
                        <div className='w-full h-full flex flex-col p-32 pt-24 justify-start text-justify items-center'>
                            <h1 className='text-2xl mb-14 font-["Sono"]'>TENTANG SYNTAX COMMUNITY</h1>
                            <p className='text-base font-["Nunito"]'>
                                Syntax Community adalah sebuah ekstrakurikuler pemrograman di SMK Telekomunikasi Telesandi Bekasi. Syntax Community memiliki tujuan untuk mengembangkan potensi siswa dalam bidang pemrograman. Dengan adanya Syntax Community, diharapkan siswa dapat mengembangkan kreativitas dan kemampuan dalam bidang pemrograman.
                                Ekstrakurikuler Syntax dimulai setelah pulang sekolah setiap hari:
                                <ul className='ml-5 mt-4'>
                                    1. Selasa   :   Pemrograman Desktop
                                    <br/>
                                    2. Rabu     :   Pemrograman Web
                                    <br/>
                                    3. Kamis    :   Pemrograman Mobile (Kelas 11)  &  UI/UX Design (Kelas 10)
                                </ul>
                                <br />
                                Ekstrakurikuler ini terbuka untuk seluruh warga SMK Telekomunikasi Telesandi baik dari kelas 10, 11, maupun kelas 12 untuk semua jurusan. Jika kamu tertarik, jangan ragu untuk mendaftar!
                            </p>
                        </div>
                    </div>
                </section>
                <section className='w-dvw h-max pb-8 bg-[#eeecec] flex items-center top-0'>
                    <div className='h-max grid grid-cols-1 sm:grid-cols-4 gap-6 p-6'>
                        <Card
                            title="Web Development"
                            content="Materi Web Development yang akan dipelajari adalah struktur dasar website dengan HTML, dihias dengan CSS, dan diberi fungsi dengan bahasa Javascript, PHP. Juga belajar membuat website dinamis dengan Framework Laravel, ReactJS, CanvaJS, dan TailwindCSS."
                            icon={<i className="fas fa-globe"></i>}
                        />
                        <Card
                            title="Mobile Development"
                            content="Materi Mobile Development yang akan dipelajari adalah struktur dasar Mobile dengan Framework Flutter dan Android Studio. Mempelajari cara membuat aplikasi sederhana dengan bahasa Dart dan Kotlin."
                            icon={<i className="fas fa-mobile-alt"></i>}
                        />
                        <Card
                            title="Programming Desktop"
                            content="Materi Programming Desktop yang akan dipelajari adalah cara membuat suatu aplikasi dengan aplikasi Visual Studio dan dapat terhubung langsung dengan database. Akan mempelajari juga cara menggunakan DevExpress."
                            icon={<i className="fas fa-desktop"></i>}
                        />
                        <Card
                            title="UI/UX Design"
                            content="Materi UI/UX Design yang akan dipelajari adalah cara membuat desain awal untuk sebuah program agar dapat membuat halaman program lebih menarik dan membuat program menjadi user friendly menggunakan Figma dan Adobe Photoshop."
                            icon={<i className="fas fa-paint-brush"></i>}
                        />
                    </div>
                </section>
                <section className='w-dvw h-dvh bg-white'>
                    <div className="container mx-auto p-6">
                        <h2 className="text-2xl font-bold text-center pt-12">Contact Us</h2>
                        <p className="text-center text-gray-600">contact list of this organization</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 pt-12"> 
                            <div className="flex items-center justify-center hover:bg-gray-100 rounded-xl" data-href="https://instagram.com/syntx.id" onClick={linkClick}>
                                <div className="text-center">
                                    <div className="text-blue-600 mb-2">
                                        <i class="fa-brands fa-instagram fa-2xl"></i>
                                    </div>
                                    <h3 className="text-lg font-semibold">INSTAGRAM</h3>
                                    <p>@syntx.id</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center hover:bg-gray-100 rounded-xl" data-href="mailto: mail@syntx.id" onClick={linkClick}>
                                <div className="p-6 rounded-lg text-center">
                                    <div className="text-blue-600 mb-2">
                                        <i class="fa-regular fa-envelope fa-2xl"></i>
                                    </div>
                                    <h3 className="text-lg font-semibold">EMAIL</h3>
                                    <p>mail@syntx.id</p>
                                </div>
                            </div>
                        </div>
                        <iframe className='w-full h-[400px] p-10' frameborder="0" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3966.0889597771616!2d107.05755972760282!3d-6.252008638323654!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x67353d6d07e61501!2sSyntax+Telesandi!5e0!3m2!1sen!2sid!4v1563367695720!5m2!1sen!2sid"></iframe>
                        
                    </div>
                </section>
            </div>
            <div id="close" className='block'>
                <div className="w-dvw flex items-center justify-center h-screen bg-gray-100">
                    <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 transform transition-transform duration-500 hover:scale-105">
                        <img src="https://syntx.id/images/sfav.png" alt="" className='w-20 ml-auto mr-auto mb-4' />
                        <h2 id='title-m' className="text-3xl font-bold text-gray-800 mb-4 text-center p-1"></h2>
                        <p id='subtitle-m' className="text-gray-600 text-center mb-8 p-2"></p>
                        <div className="p-8">
                            <div className="flex justify-center">
                                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline justify-center items-center" data-href="https://instagram.com/x.dapzz" onClick={linkClick}>
                                    <i class="fa-brands fa-instagram fa-lg mr-3"></i>
                                    Follow Instagram
                                </button>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-purple-600 to-indigo-600 h-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;