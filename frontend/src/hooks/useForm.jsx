import { useState } from 'react'

const useForm = (localSchema, initialValues = {}) => {
  const [schema] = useState(localSchema)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState('')

  const setValue = (name, value) => {
    setValues((old) => ({ ...old, [name]: value }))
  }

  const clear = () => {
    setValues({})
  }

  const validate = async () => {
    try {
      await schema.validate(values, { abortEarly: true })
      return true
    } catch (e) {
      setErrors({ generalError: e.toString() })
      return false
    }
  }
  return { values, setValue, validate, clear, errors }
}

export default useForm
