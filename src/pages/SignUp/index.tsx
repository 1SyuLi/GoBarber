import React, { useCallback, useRef } from 'react';
import Logo from '../../assets/logo.svg';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidateErrors from '../../utils/getValidateErrors'

import { Container, Content, Background } from './styles'

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    console.log(formRef);
    

    
    

    const handleSubmit = useCallback(async (data: object) => {

        try {
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                nome: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().min(6, 'No minimo 6 digitos')
            })


            await schema.validate(data, {
                abortEarly: false,
            });
            
           
        } catch (error) {

           console.log(error)
           const eerros = getValidateErrors(error);
           formRef.current?.setErrors(eerros);
            
        }


    }, []);
    


    return(
    <Container>
        <Background />

        <Content>
            <img src={Logo} alt="Logo" />

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu Cadastro</h1>
                <Input name="nome" icon={FiUser} placeholder="Nome"/>

                <Input name="email" icon={FiMail} placeholder="E-mail"/>

                <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

                <Button type="submit">Cadastrar</Button>

            </Form>

            <a href="#">
                <FiArrowLeft />
                Voltar para Login
            </a>

        </Content>

    </Container>
    )
}

export default SignUp;