import React from 'react';

const Logo = ({ size = 48, className = "" }) => {
    return (
        <div
            className={`logo-wrapper ${className}`}
            style={{
                width: size,
                height: size,
                borderRadius: '10px',
                overflow: 'hidden',
                flexShrink: 0,
                background: '#f9ece3',
                boxShadow: '0 0 0 1.5px rgba(212,175,55,0.35), 0 4px 18px rgba(0,0,0,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'box-shadow 0.3s ease',
            }}
        >
            <img
                src="/DWlogo.png"
                alt="Dinesh Wadhwani Logo"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                }}
            />
        </div>
    );
};

export default Logo;
