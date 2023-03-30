import React from 'react';
import './button.scss';

interface ButtonProps {
    color?: string;
    onClick?: (e: React.FormEvent) => void;
    active?: boolean;
    children?: React.ReactNode;
    isSecondary?: string;
}

const Button: React.FC<ButtonProps> = ({
    color,
    onClick,
    active,
    children,
    isSecondary,
}) => {
    return (
        <button
            className={`button${active ? ' active' : ''} ${isSecondary ? 'secondary' : null}`}
            onClick={onClick}
            style={{ backgroundColor: color }} // using the color prop to set the background color
        >
            {children}
        </button>
    );
};

export default Button;
