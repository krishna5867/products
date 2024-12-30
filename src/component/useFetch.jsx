import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Error in: ${res.statusText}`);
            }
            const data = await res.json();
            setData(data)
            setLoading(false)
        } catch (error) {
            setLoading(false);
            setError(error.message || "Error in url");
        }

    }
    useEffect(() => {
        fetchData()
    }, [url])
    return { data, loading, error }
}

export default useFetch
