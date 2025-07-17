import { useState, useEffect } from 'react';

const useDynamicPhoneNumber = () => {
    const [phoneNumber, setPhoneNumber] = useState("(833) 588-0606"); // Default number

    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                const response = await fetch('https://api-dni.dialics.com/api/d793d326-3627-4663-b01a-639d82d8932d/number?browser=Chrome&referrer_url=localhost:3000&ip=49.43.241.0&device=Desktop');
                const data = await response.json();
                if (data.success && data.payload.replaced_formatted_number) {
                    setPhoneNumber(data.payload.replaced_formatted_number);
                }
            } catch (error) {
                console.error('Error fetching phone number:', error);
            }
        };

        fetchPhoneNumber();
    }, []);

    const getCleanPhoneNumber = () => {
        return phoneNumber.replace(/\D/g, '');
    };

    return {
        phoneNumber,
        getCleanPhoneNumber
    };
};

export default useDynamicPhoneNumber; 