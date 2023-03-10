import React from 'react';

import './button.scss';

interface ButtonProps {
    color: string;
    onClick: (e: React.FormEvent) => void;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ color, onClick, children }) => {
    return (
        <button style={{ backgroundColor: color }} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
