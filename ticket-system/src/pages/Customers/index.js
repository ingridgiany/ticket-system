import { useState } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiUser } from 'react-icons/fi'

import { db } from '../../services/firebaseConnection'
import { addDoc, collection } from 'firebase/firestore'

import { toast } from 'react-toastify'

export default function Customers() {
    const [name, setName] = useState('')
    const [businessID, setBusinessID] = useState('')
    const [address, setAddress] = useState('')

    async function handleRegister(e) {
        e.preventDefault()

        if (name !== '' && businessID !== '' && address !== '') {
            await addDoc(collection(db, 'customers'), {
                companyName: name,
                businessID: businessID,
                address: address
            }).then(() => {
                setName('')
                setBusinessID('')
                setAddress('')
                toast.success('Registration successful')
            }).catch((error)=> {
                console.log(error)
                toast.error('Error during registration')
            })

        }else {
            toast.error('Please fill in all fields')
        }
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name='Customers'>
                    <FiUser size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Name</label>
                        <input
                            type='text'
                            placeholder='Company name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Identification Number</label>
                        <input
                            type='text'
                            placeholder='Business company identification number'
                            value={businessID}
                            onChange={(e) => setBusinessID(e.target.value)}
                        />

                        <label>Address</label>
                        <input
                            type='text'
                            placeholder='Company address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <button type='submit'>
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}