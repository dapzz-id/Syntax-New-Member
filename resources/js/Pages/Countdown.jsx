import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countdown = ({ onUpdateCountdown }) => {
    const [timeLeft, setTimeLeft] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBatasWaktu = async () => {
            try {
                const response = await axios.get('/api/batas-waktu');
                const batasWaktu = new Date(response.data.batas_waktu);
                updateTimeLeft(batasWaktu);
                setInterval(() => updateTimeLeft(batasWaktu), 1000);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching batas_waktu:', error);
            }
        };

        fetchBatasWaktu();
    }, []);

    const updateTimeLeft = (batasWaktu) => {
        const now = new Date();
        const difference = batasWaktu - now;

        if (difference <= 0) {
            setTimeLeft({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            });
            if (onUpdateCountdown) {
                onUpdateCountdown('0d 0h 0m 0s'); // Panggil callback dengan nilai default saat selesai
            }
        } else {
            const timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
            setTimeLeft(timeLeft);
            if (onUpdateCountdown) {
                onUpdateCountdown(`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`); // Panggil callback dengan nilai yang dihitung
            }
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div>
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
        </div>
    );
};

export default Countdown;