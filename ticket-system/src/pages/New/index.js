import { useState, useEffect, useContext } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlusCircle } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth'
import { db } from '../../services/firebaseConnection'
import { collection, getDocs, getDoc, doc, addDoc, updateDoc } from 'firebase/firestore'

import './new.css'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const listRef = collection(db, 'customers')

export default function New() {
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()

    const [customers, setCustomers] = useState([])
    const [loadCustomer, setLoadCustomer] = useState(true)
    const [customerSelected, setCustomerSelected] = useState(0)

    const [note, setNote] = useState('')
    const [subject, setSubject] = useState('Support')
    const [status, setStatus] = useState('Open')

    const [idCustomer, setIdCustomer] = useState(false)

    useEffect(() => {
        async function loadCustomers() {
            const querySnapshot = await getDocs(listRef)
                .then((snapshot) => {
                    let list = []

                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            companyName: doc.data().companyName
                        })
                    })
                    if (snapshot.docs.size === 0) {
                        console.log('No companies found')
                        setCustomers([{ id: '1', companyName: 'Freelancer' }])
                        setLoadCustomer(false)
                        return
                    }

                    setCustomers(list)
                    setLoadCustomer(false)

                    if (id) {
                        loadId(list)
                    }
                })
                .catch((error) => {
                    console.log('An error occurred while searching the customer list ', error)
                    setLoadCustomer(false)
                    setCustomers([{ id: '1', companyName: 'Freelancer' }])
                })
        }

        loadCustomers()

    }, [id])

    async function loadId(list) {
        const docRef = doc(db, 'tickets', id)
        await getDoc(docRef)
            .then((snapshot) => {
                setSubject(snapshot.data().subject)
                setStatus(snapshot.data().status)
                setNote(snapshot.data().note)


                let index = list.findIndex(item => item.id === snapshot.data().clientID)
                setCustomerSelected(index)
                setIdCustomer(true)
            })
            .catch((error) => {
                console.log(error)
                setIdCustomer(false)
            })
    }

    function handleOptionChange(e) {
        setStatus(e.target.value)
    }

    function handleChangeSelect(e) {
        setSubject(e.target.value)
    }

    function handleChangeCustomer(e) {
        setCustomerSelected(e.target.value)
    }

    async function handleRegister(e) {
        e.preventDefault()

        // edit ticket
        if (idCustomer) {
            const docRef = doc(db, 'tickets', id)
            await updateDoc(docRef, {
                client: customers[customerSelected].companyName,
                clientID: customers[customerSelected].id,
                subject: subject,
                note: note,
                status: status,
                user: user.uid
            })
            .then(()=> {
                toast.info('Ticket updated successfully')
                setCustomerSelected(0)
                setNote('')
                navigate('/dashboard')
            })
            .catch((error)=> {
                toast.error('Oops, error updating the ticket')
                console.log(error)
            })
            return
        }

        // register ticket
        await addDoc(collection(db, 'tickets'), {
            created: new Date(),
            client: customers[customerSelected].companyName,
            clientID: customers[customerSelected].id,
            subject: subject,
            note: note,
            status: status,
            user: user.uid
        }).then(() => {
            toast.success('Ticket registered successfully')
            setNote('')
            setCustomerSelected(0)
        }).catch((error) => {
            toast.error('Uh-oh, we encountered an error when trying to register your ticket. Please try again later.')
            console.log(error)
        })

    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name={id ? 'Edit ticket' : 'New ticket'}>
                    <FiPlusCircle size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>

                        <label>Customers</label>
                        {

                            loadCustomer ? (
                                <input
                                    type='text'
                                    disabled={true}
                                    value='Loading...'
                                />
                            ) : (

                                <select value={customerSelected} onChange={handleChangeCustomer}>
                                    {
                                        customers.map((item, index) => {
                                            return (
                                                <option key={index} value={index}>
                                                    {item.companyName}
                                                </option>
                                            )
                                        })
                                    }
                                </select>

                            )

                        }

                        <label>Subject</label>
                        <select value={subject} onChange={handleChangeSelect}>
                            <option value='Support'>Support</option>
                            <option value='Technical visit'>Technical visit</option>
                            <option value='Financial'>Financial</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input
                                type='radio'
                                name='radio'
                                value='Open'
                                onChange={handleOptionChange}
                                checked={status === 'Open'}
                            />
                            <span>Open</span>

                            <input
                                type='radio'
                                name='radio'
                                value='Progress'
                                onChange={handleOptionChange}
                                checked={status === 'Progress'}
                            />
                            <span>In progress</span>

                            <input
                                type='radio'
                                name='radio'
                                value='Completed'
                                onChange={handleOptionChange}
                                checked={status === 'Completed'}
                            />
                            <span>Completed</span>
                        </div>

                        <label>Note</label>
                        <textarea
                            type='text'
                            placeholder='Problem description (optional)'
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />

                        <button type='submit'>Resgister</button>

                    </form>
                </div>
            </div>
        </div>
    )
}