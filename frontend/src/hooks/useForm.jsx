import { useState, useContext, createContext } from "react"
import { object, string, number, date, ValidationError } from 'yup';

const useForm = (localSchema, initialValues = {}) =>{
    const [schema, setSchema] = useState(localSchema)
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState('')

    const setValue = (name, value) =>{
        console.log('Value set', name,value)
        setValues((old) => ({...old, [name]:value}))
    }

    const clear = () => {
        setValues({})
    }

    const validate = async () => {
        try {
            await schema.validate(values, {abortEarly: true})
            console.log('valid Form')
            return true
        } catch(e) {
            console.log('invalid Form')
            setErrors({generalError: e.toString()})
            console.log(errors)
            return false
        }
    }
    return {values, setValue, validate, clear, errors}
}

export default useForm