import React from 'react';

interface SvgIconProps {
    icon: React.ReactNode;
    size?: number;
    color?: string;
    hoverColor?: string;
    style?: React.CSSProperties;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
    icon,
    size = 24,
    color = 'currentColor',
    hoverColor,
    style,
    ...props
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const styles: React.CSSProperties = {
        width: size,
        height: size,
        color: isHovered && hoverColor ? hoverColor : color,
        transition: 'fill 0.3s ease',
        display: 'inline',
        ...style,
    };

    return (
        <svg
            style={styles}
            onMouseEnter={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
            {...props}
        >
            {icon}
        </svg>
    );
};
