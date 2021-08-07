import { ValidationError } from 'yup'


interface Erros{
    [key: string]: string,
}

export default function getValidateErrors(error:ValidationError):Erros{

    const validateErrors: Erros = {};

    error.inner.forEach( error => {

       if(error.path){
           validateErrors[error.path] = error.message;
       }
    })
    

    return validateErrors;
}