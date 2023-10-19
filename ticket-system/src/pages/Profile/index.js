import { useContext, useState } from "react"

import Header from "../../components/Header"
import Title from "../../components/Title"

import { FiSettings, FiUpload } from "react-icons/fi"
import avatar from '../../assets/avatar.png'
import { AuthContext } from "../../contexts/auth"

import { db, storage } from '../../services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import './profile.css'
import { toast } from "react-toastify"

export default function Profile() {
    const { user, storageUser, setUser, logout } = useContext(AuthContext)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)

    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)

    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
            } else {
                alert(`Upload an image of type PNG or JPEG`)
                setImageAvatar(null)
                return
            }
        }
    }

    async function handleUpload() {
        const currentUid = user.uid

        const updateRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)

        const uploadTask = uploadBytes(updateRef, imageAvatar)
            .then((snapshot) => {

                getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                    let urlFoto = downloadURL

                    const docRef = doc(db, 'users', user.uid)
                    await updateDoc(docRef, {
                        avatarUrl: urlFoto,
                        name: name,
                    }).then(() => {

                        let data = {
                            ...user,
                            name: name,
                            avatarUrl: urlFoto
                        }

                        setUser(data)
                        storageUser(data)
                        toast.success('Updated successfully')
                    })
                })
            })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (imageAvatar === null && name !== '') {
            // update name only
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                name: name,
            }).then(() => {
                let data = {
                    ...user,
                    name: name,
                }

                setUser(data)
                storageUser(data)
                toast.success('Updated successfully')
            })
        } else if (name !== '' && imageAvatar !== null) {
            // update name and image
            handleUpload()
        }
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name='My account'>
                    <FiSettings size={25} />
                </Title>

                <div className="container">

                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#fff" size={25} />
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /> <br />
                            {avatarUrl === null ? (
                                <img src={avatar} alt="profile photo" width={250} height={250} />
                            ) : (
                                <img src={avatarUrl} alt="profile photo" width={250} height={250} />
                            )}
                        </label>

                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                        <label>Email</label>
                        <input type="text" value={email} disabled={true} />

                        <button type="submit">Save</button>
                    </form>
                </div>

                <div className="container">
                    <button className="logout-bnt" onClick={() => logout()}>Logout</button>
                </div>

            </div>

        </div>
    )
}