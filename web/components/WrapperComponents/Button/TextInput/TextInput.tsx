import classnames from 'classnames';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FieldElement } from 'react-hook-form';
import styles from './TextInput.module.scss';

type TextInputProps = {
    type?: string;
    label: string;
    name: string;
    ref?: FieldElement;
};

const TextInput: React.FC<
    TextInputProps & React.Attributes & React.HTMLAttributes<{}>
> = (props) => {
    const {
        type = 'text',
        label,
        ref,
        name,
        key,
        children,
        className,
        ...other
    } = props;
    const [classNames, setClassnames] = useState<string>('');
    const [text, setText] = useState<string>('');
    // const [doHover, setHover] = useState(false);
    const [focused, setFocus] = useState(false);
    // const inputRef = useRef<HTMLInputElement>();

    useEffect(() => {
        const newClasses = formatClassNames(className);
        console.log(newClasses);
        setClassnames(newClasses);
    }, []);

    const inputTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setText(text);
    };

    const onFocus = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    return (
        <fieldset className={styles.fieldset}>
            <label
                htmlFor="#input"
                className={classnames({
                    [styles.label]: true,
                    [styles.hover]: focused || text !== '',
                })}
            >
                {label}
            </label>
            <input
                key={key}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={inputTextChange}
                // ref={inputRef}
                id="input"
                className={classNames}
                // value={text !== '' ? text : ''}
                name={name}
                ref={ref}
                type={type}
                {...other}
            />
        </fieldset>
    );

    function formatClassNames(classNames: string): string {
        const btnClasses = {
            [styles.base]: true,
        };
        const btnClassesStr = classnames(btnClasses);
        return `${classNames ? classNames : ''} ${btnClassesStr}`;
    }
};

export default TextInput;
