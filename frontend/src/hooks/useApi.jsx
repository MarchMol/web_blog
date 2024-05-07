import { useState } from 'react';

const options = {
  'delete': {
    method: 'DELETE',
    requireAuth: true,
    requireBody: false,
  },
  'get': {
    method: 'GET',
    requireAuth: false,
    requireBody: false,
  },
  'post': {
    method: 'POST',
    requireAuth: true,
    requireBody: true,
  },
  'login': {
    method: 'POST',
    requireAuth: false,
    requireBody: true,
  },
}



const useApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBuilder = (type, body, token) => {
    var fetchOptions = {}
    fetchOptions.method = options[type].method
    if (options[type].requireBody) {
      fetchOptions.body = JSON.stringify(body)
    }
    if (options[type].requireAuth) {
      fetchOptions.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

    } else {
      fetchOptions.headers = {
        'Content-Type': 'application/json'
      }
    }
    console.log('FETCH OPTIONS', fetchOptions)
    return fetchOptions
  }

  const fetchData = async (type, url, body, token) => {
    setLoading(true);
    try {
      const response = await fetch(url, fetchBuilder(type, body, token));
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        if (type === 'delete' || type === 'post') {
          setLoading(false)
          return true
        } else {
          const result = await response.json();
          setData(result);
          setLoading(false);
          return result
        }
      }
    } catch (err) {
      setError(err);
      console.log(err)
      setLoading(false);
      return false
    }
  };

  return { data, loading, setLoading, error, fetchData, fetchBuilder };
}

export default useApi