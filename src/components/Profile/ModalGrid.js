import React, { useContext, useState } from 'react';
import "./Style.css";
import Modal from 'react-bootstrap/Modal'
import { uploadImage } from '../../api/upload'
import { postUpdateProfile } from '../../api/profile'
import { toast } from 'react-toastify';
const ModalGrid = (props) => {
    const { inforProfle, token ,show} = props
    const [numberPhone, setPhone] = React.useState(null)
    const [salonName, setSallonName] = React.useState(null)
    const [name, setname] = React.useState(null)
    const [urlPhoto, setUrlPhoto] = React.useState(null);
    const onFileChange = (event) => {
        uploadImage(event.target.files[0]).then((result) => {
            if (result?.status === 200) setUrlPhoto(result?.data?.path)
        }).catch((e) => {
            console.log(e.response)
        })
    }
    React.useEffect(() => {
        (() => {
            if(inforProfle){
                setPhone(inforProfle?.phone)
                setSallonName(inforProfle?.salon_name)
                setname(inforProfle?.name)
                setUrlPhoto(inforProfle?.image)
            }
        })()
    }, [inforProfle,show])
    const handlerUpdateProfile = (e) => {
        e.preventDefault();
        if (numberPhone.length < 5) return toast.error('phone length must be at least 5 characters long');
        try {
            console.log(inforProfle._id, name, numberPhone, urlPhoto, salonName, token)
            postUpdateProfile(inforProfle._id, name, numberPhone, urlPhoto, salonName, token).then((result) => {
                if (result?.data?.status === "success") toast.success('Update success');
                window.location.reload()
            }).catch((e) => {
                toast.error('Update Fail');
            })
        } catch (error) {

        }
    }
    return (
        <Modal
            show={show} onHide={props.handleClose}
            size="lg"
            className="containerModalReviews"
            aria-labelledby="contained-modal-title-vcenter"
            styles={{ zIndex: 9999999999999 }}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Update Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handlerUpdateProfile}>
                    <div className="conainerCreateInforProfile" style={{ width: '100%' }}>
                        <div className="flex">
                            <span>Name</span>
                            <input
                                type="text"
                                placeholder="name"
                                onChange={(e) => setname(e.target.value)}
                                value={name}
                                required
                            />
                        </div>
                        <div className="containerPhone flex">
                            <span>Phone:</span>
                            <input
                                type="text"
                                placeholder="Number Phone"
                                onChange={(e) => setPhone(e.target.value)}
                                value={numberPhone}
                                required
                            />
                        </div>
                        <div className="flex">
                            <span>Salon Name</span>
                            <input
                                type="text"
                                placeholder="Salon Name"
                                onChange={(e) => setSallonName(e.target.value)}
                                value={salonName}
                                required
                            />
                        </div>
                        <div className="profile-img" >
                            <span>Photo</span>
                            <img src={urlPhoto} alt="avatar" />
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
              <input type="file" name="file" onChange={onFileChange} />
                            </div>
                        </div>
                        <div className="btnSubmit">
                            <input type="submit" className="profile-edit-btn profile-edit-btn-update" name="btnAddMore" defaultValue="Edit Profile" />
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <buton variant="secondary" onClick={props.handleClose}>
                    Close
          </buton>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalGrid

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        display: "flex",
        flexDirection: "row",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",

    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
    }
};
