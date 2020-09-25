import React, { useState } from 'react'
import RepoList from './RepoList'
import UserInput from './UserInput'
import './App.css'

const fetchRepositories = async (userName) => {
    return fetch(`https://api.github.com/users/${userName}/repos`)
        .then((res) => {
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error('User not found.')
                }
                throw new Error('Connection problem.')
            }
            return res.json()
        })
        .catch((error) => {
            return ({ error: error })
        })
}

const App = () => {
    const [repositories, setRepositories] = useState([])
    const [userName, setUserName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateRepositories = async (userName) => {
        setIsLoading(true)
        const repositories = await fetchRepositories(userName)
        if (!repositories.error) {
            setRepositories(repositories)
            error && setError(null)
        }
        else {
            setError(repositories.error)
        }
        setIsLoading(false)
    }
    return (
        <div className='app'>
            <UserInput value={userName} onChange={setUserName} onSubmit={updateRepositories} />
            <RepoList repositories={repositories} isLoading={isLoading} error={error} />
        </div>)
}
export default App