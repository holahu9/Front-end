import React from 'react'

const FormCreateProfile = (props) => {
    const { handlerCreateProfile,
        userData,
        onFileChange,
        setPhone,
        numberPhone,
        setSallonName,
        salonName,
        setAddrWebsite,
        addrWebsite,
        urlPhoto } = props
    return (
        <form onSubmit={handlerCreateProfile}>
            <div className="conainerCreateInforProfile">
                <h3 className="title">  Welcome Back!  </h3>
                <h5 className="title"> Hello {userData?.name ? userData?.name : ''}   </h5>
                {/* <div className="containerRating">
          <span className="proile-rating">Rating : <span>8/10</span></span>
        </div> */}
                <div className="containerUserName">
                    <span>Name</span>
                    <span>{userData?.name ? userData?.name : ''}</span>
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
                <div className="flex">
                    <span>Website</span>
                    <input
                        type="text"
                        placeholder="Website"
                        onChange={(e) => setAddrWebsite(e.target.value)}
                        value={addrWebsite}
                        required
                    />
                </div>
                <div className="profile-img" >
                    <span>Photo</span>
                    <img src={urlPhoto} alt="avatar" />
                    <div className="file btn btn-lg btn-primary">
                        Change Photo
              <input type="file" name="file" onChange={onFileChange} required />
                    </div>
                </div>
                <div className="btnSubmit">
                    <input type="submit" className="profile-edit-btn" name="btnAddMore" defaultValue="Edit Profile" />
                </div>
            </div>
        </form>
    )
}
export default React.memo(FormCreateProfile)