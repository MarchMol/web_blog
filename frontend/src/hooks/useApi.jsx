import { useState } from 'react'

const options = {
  delete: {
    method: 'DELETE',
    requireAuth: true,
    requireBody: false
  },
  get: {
    method: 'GET',
    requireAuth: false,
    requireBody: false
  },
  post: {
    method: 'POST',
    requireAuth: true,
    requireBody: true
  },
  login: {
    method: 'POST',
    requireAuth: false,
    requireBody: true
  }
}

const useApi = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getError = () => {
    return error
  }

  const fetchBuilder = (type, body, token) => {
    const fetchOptions = {}
    fetchOptions.method = options[type].method
    if (options[type].requireBody) {
      fetchOptions.body = JSON.stringify(body)
    }
    if (options[type].requireAuth) {
      fetchOptions.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    } else {
      fetchOptions.headers = {
        'Content-Type': 'application/json'
      }
    }
    return fetchOptions
  }

  const fetchData = async (type, url, body, token) => {
    setLoading(true)
    try {
      const response = await fetch(url, fetchBuilder(type, body, token))
      if (!response.ok) {
        if (type === 'login') {
          const result = await response.json()
          if (!result.success) {
            setLoading(false)
            return false
          } else {
            throw new Error(response.status)
          }
        }
        throw new Error(response.status)
      } else {
        if (type === 'delete' || type === 'post') {
          setLoading(false)
          setError(null)
          return true
        } else {
          const result = await response.json()
          setData(result)
          setLoading(false)
          setError(null)
          return result
        }
      }
    } catch (err) {
      setError(err)
      setLoading(false)
      return false
    }
  }

  return { data, loading, setLoading, error, fetchData, fetchBuilder, getError }
}

export default useApi