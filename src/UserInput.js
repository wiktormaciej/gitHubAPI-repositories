import React from 'react'

const UserInput = (props) => {
    const { value, onSubmit, onChange } = props
    const handleOnChange = (e) => {
        e.preventDefault()
        onChange(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(value)
    }
    return (
        <div className='user-input'>
            <form className='user-input-form' onSubmit={handleSubmit}>
                <input className='user-input-field' required placeholder={"GitHub username"} type='text' value={value} onChange={handleOnChange} />
                <input className='user-input-submit' type='submit' value='>' />
            </form>
        </div>
    )
}
export default UserInput