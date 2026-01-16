import React from 'react';
import clsx from 'clsx';

export default function Card({ children, className, style, padding = '24px', onClick }) {
    return (
        <div
            className={clsx('glass-card', className)}
            onClick={onClick}
            style={{
                padding: padding,
                cursor: onClick ? 'pointer' : 'default',
                ...style
            }}
        >
            {children}
        </div>
    );
}
