import React, { useEffect, useState } from 'react';
import './healthCheck.css';

function HealthCheck() {
    const [isHealthy, setIsHealthy] = useState(true); // Initial assumption is that the API is healthy
    const [error, setError] = useState(null);

    const checkHealth = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/health');
            if (!response.ok) {
                setIsHealthy(false);
                setError('Server is not healthy. There might be problems in saving or retrieving data.'); // Set an error message
            } else {
                setIsHealthy(true);
                setError(null); // Clear any previous error message
            }
        } catch (error) {
            setIsHealthy(false);
            setError('Server is not reachable. No save or retrieve operations will work.'); // Set an error message
        }
    };

    useEffect(() => {
        // Initially, check the health status
        checkHealth();

        // Set up a timer to check the health status every 5 seconds
        const healthCheckInterval = setInterval(checkHealth, 5000);

        return () => {
            // Clean up the interval when the component unmounts
            clearInterval(healthCheckInterval);
        };
    }, []);

    return (
        <>
        { !isHealthy && 
            (<div className="health-check">
                <p>{error}</p>
            </div>)
        }
        </>
    );
}

export default HealthCheck;