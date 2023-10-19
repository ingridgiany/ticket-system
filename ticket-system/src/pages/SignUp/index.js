import { useState, useContext } from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/auth'

export default function SignUp(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signUp, loadingAuth } = useContext(AuthContext)

    async function handleSubmit(e){
        e.preventDefault()
        
        if(name !== '' && email !== '' && password !== ''){
            await signUp(name, email, password)
        }else {
            alert('Fields cannot be empty')
        }

    }

    return(
        <div className='container-center'>
           <div className='login'>
            <div className='login-area'>
                <img src={logo} alt='system logo'/>
            </div>

            <form onSubmit={handleSubmit}>
                <h1>New account</h1>
                <input 
                type='text' 
                name='name'
                autoComplete='off'
                placeholder='name'
                value={name}
                onChange={(e)=> setName(e.target.value)}
                />
                <input 
                type='text' 
                name='email'
                autoComplete='username'
                placeholder='name@email.com'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
                <input 
                type='password' 
                name='off'
                autoComplete='current-password'
                placeholder='******'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />

                <button type='submit'>
                    {loadingAuth ? 'Loading...' : 'Enter'}
                </button>
            </form>
            <Link to='/'>Already have an account? Sign In</Link>
           </div>
        </div>
    )
}