import React, { useEffect, useState } from 'react'
const fetchBranches = async (repository) => {
    const branchesUrl = repository.branches_url.split('{')[0] // remove {/branch} part
    return fetch(branchesUrl)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Connection problem.')
            }
            return res.json()
        })
        .catch((error) => {
            return ({ error: error })
        })
}
const BranchesList = (props) => {
    const { repository } = props
    const [isLoadingBranches, setIsLoadingBranches] = useState(true)
    const [error, setError] = useState(null)
    const [branches, setBranches] = useState([])
    useEffect(() => {
        fetchBranches(repository).then((branches) => {
            if (!branches.error) {
                setBranches(branches)
                if (error) setError(null)
            }
            else {
                setError(branches.error)
            }
            setIsLoadingBranches(false)
        })
    }, [])
    if (isLoadingBranches) return <span>Loading. . .</span>
    if (error) return <div className="error">Error: {error.message}</div>
    if (!branches || !branches.length) return <span>No branches found.</span>
    return (
        <div className='branches-list'>

            {branches.map((branch, Id) => {
                return (
                    <div key={`branch${Id}`} className='branch-bar'>
                        <span className='branch-name'>{branch.name}</span>
                        <span className='commit-sha'>{`(${branch.commit && branch.commit.sha})`}</span>
                    </div>)
            })}
        </div>
    )
}

const RepoBar = (props) => {
    const { repository } = props
    return (
        <div className='repo-bar'>
            <div className='repo-bar-left'>
                <h2 className='repo-name'>{repository.name}</h2>
                <span className='repo-id'>{`(id: ${repository.id})`}</span>
            </div>
            <div className='repo-bar-right'>
                <BranchesList repository={repository} />
            </div>
        </div>)
}
const RepoList = (props) => {
    const { repositories, isLoading, error } = props
    if (isLoading) return (<div> Loading. . .</div>)
    if (error) return (<div className="error">  Error: {error.message}  </div>)
    if (!repositories || !repositories.length) return <div>No public repositories found.</div>

    return (
        <div className='repo-list'>
            <div className='repo-list-header'>
                <span className='repo-list-header-left'>Repository</span>
                <span className='repo-list-header-right'>Branches</span>
            </div>
            {repositories.map((repository, Id) => {
                if (!repository.fork) return (<RepoBar key={'repo' + Id} repository={repository} />)
            })}
        </div>
    )
}
export default RepoList