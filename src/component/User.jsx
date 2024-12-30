import React from 'react'
import useFetch from './hooks/useFetch'

const User = () => {
    const url = 'https://jsonplaceholder.typicode.com/users'
    const { data, loading, error } = useFetch(url)

    if (loading) {
        return <h2>Loading ...</h2>
    }

    if (error) {
        return <h2>Error</h2>
    }
    return (
        <div>
            {data.length > 0 && data.map((item) => (
                <div className='p-2 m-2 border'>
                    {item.name}
                    {item.username}
                </div>
            ))}

        </div>
    )
}


export default User
