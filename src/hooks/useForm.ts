import { useState, useEffect } from 'react';

type inputTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>


export const useForm = <FormType,ValidationsType extends object>(initialForm:FormType, formValidations:ValidationsType ) => {

    const [ formState, setFormState ] = useState<FormType>( initialForm );



    useEffect(() => {
        createValidators();
    }, [formState])
    


    const onInputChange = (e:inputTypes):void => {
        const {target} = e; 
        const { name, value } = target;

        setFormState({
            ...formState,
            [name]:value
        });
    }

    const onResetForm = ():void => {
        setFormState( initialForm );
    }
    

    const createValidators = () => {

        //const formCheckedValues = {} as ValidationsType;

        for (const formField of Object.keys(formValidations) as [keyof ValidationsType]) {
            // console.log(formValidations[formField]);
        }

    }


   
    return {
        formState,
        onInputChange,
        onResetForm,
    }
}