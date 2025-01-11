// FireworksComponent.jsx
import React, { useRef, useEffect } from 'react';
import { Fireworks } from '@fireworks-js/react';

const FireworksComponent = () => {
    const ref = useRef(null);

    useEffect(() => {
        ref.current.start();
    }, []);

    return (
        <Fireworks
            ref={ref}
            options={{
                rocketsPoint: {
                    min: 10,
                    max: 90,
                },
                speed: 1, // Reduced speed
                delay: {
                    min: 100,
                    max: 200,
                },
                acceleration: 1.05,
                friction: 0.98,
                gravity: 1.5,
                particles: 50,
                trace: 1,
                explosion: 1,
                autoresize: true,
                brightness: {
                    min: 50,
                    max: 80,
                },
                decay: {
                    min: 0.015,
                    max: 0.03,
                },
                mouse: {
                    click: true,
                    move: false,
                    max: 1,
                },
            }}
            style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                position: 'fixed',
                background: '#000',
                pointerEvents: 'none',
            }}
        />
    );
};

export default FireworksComponent;
