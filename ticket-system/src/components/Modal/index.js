import './modal.css'
import { FiX } from 'react-icons/fi'

export default function Modal({ content, close }) {
    return (
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}>
                    <FiX size={25} color='#fff' />
                    Close
                </button>

                <main>
                    <h2>Ticket Details</h2>

                    <div className='row'>
                        <span>
                            Client: <i>{content.client}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Subject: <i>{content.subject}</i>
                        </span>
                        <span>
                            Registered in: <i>{content.createdFormat}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Status:
                            <i className='status-badge' style={{color: '#fff', backgroundColor: content.status === 'Open' ? '#5cb85c' : '#999'}}>
                                {content.status}
                            </i>
                        </span>
                    </div>

                    {
                        content.note !== '' && (
                            <>
                                <h3>Note:</h3>
                                <p>
                                    {content.note}
                                </p>
                            </>
                        )
                    }


                </main>
            </div>
        </div>
    )
}