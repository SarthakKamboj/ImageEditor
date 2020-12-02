import React, { useEffect, useState } from 'react';
import styles from './Button.module.scss';
import classnames from 'classnames';

type ButtonProps = {
    type: 'button' | 'submit' | 'reset';
    variant: 'primary' | 'secondary' | 'text';
    size?: 'sm' | 'md' | 'lg';
};

const Button: React.FC<
    React.Attributes & React.HTMLAttributes<{}> & ButtonProps
> = (props) => {
    const {
        key,
        type = 'submit',
        variant = 'primary',
        size = 'md',
        children,
        className,
        ...other
    } = props;
    const [classNames, setClassnames] = useState<string>();

    useEffect(() => {
        console.log(size);
        const newClasses = formatClassNames(className);
        console.log(newClasses);
        setClassnames(newClasses);
    }, []);

    return (
        <button key={key} className={classNames} type={type} {...other}>
            {children}
        </button>
    );

    function formatClassNames(classNames: string): string {
        const btnClasses = {
            [styles.base]: true,
            [styles.primary]: variant === 'primary',
            [styles.secondary]: variant === 'secondary',
            [styles.text]: variant === 'text',
            [styles.sm]: size === 'sm',
            [styles.md]: size === 'md',
            [styles.lg]: size === 'lg',
        };
        const btnClassesStr = classnames(btnClasses);
        return `${classNames ? classNames : ''} ${btnClassesStr}`;
    }
};

export default Button;
