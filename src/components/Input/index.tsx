import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'

import { Container, Eerror} from './styles'

import ToolTip from '../ToolTip'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon:Icon, ...rest }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const { fieldName, defaultValue, error, registerField } = useField(name);

    const [isFocused, setFocused] = useState(false)
    const [isFilled, setFilled] = useState(false)

    const HandleInputBlur = useCallback(() => {
        setFocused(false);

       if( inputRef.current?.value){
           setFilled(true);
       } else{
           setFilled(false);
       }

    }, []);

    const HandleInputFocus = useCallback(() => {
        setFocused(true)
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        })
    }, [fieldName, registerField]);


    return(
        <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
            {Icon && <Icon size={20}/>}
            <input 
            onFocus={HandleInputFocus} 
            onBlur={HandleInputBlur} 
            defaultValue={defaultValue} 
            ref={inputRef} 
            {...rest}/>

            {error && (
                <Eerror title={error}>
                    <FiAlertCircle color="crimson" size={20}/>
                </Eerror>
            )}
        </Container>
    )
}

export default Input;