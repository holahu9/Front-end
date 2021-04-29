import React  from 'react'

const InforProfile = (props) => {
    return (
        <div className="conainerItemProfiles">
            <div className="containerUsername flex">
                <span>Name :</span>
                <span>{props.inforProfle?.name}</span>
            </div>
            <div className="containerPhone flex">
                <span>Phone :</span>
                <span>{props.inforProfle?.phone}</span>
            </div>
            <div className="containerImage flex">
                <span>Photo :</span>
                <img src={props.inforProfle?.image} alt="avatar" className="img-fluid" />
            </div>
            <div className="containerSalonName flex">
                <span>Salon Name :</span>
                <span>{props.inforProfle?.salon_name}</span>
            </div>
            <div className="containerWebsite flex">
                <span>Website :</span>
                <span>{props.inforProfle?.website}</span>
            </div>
            <div className=" flex" >
                <span>Average Star :</span>
                <span>{props.inforProfle?.star_rate}</span>
            </div>
            <div className="containerReviews flex" style={{
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px'
            }}>
                <span>Reviews :</span>
                <div>
                    <span>{props.inforProfle?.reviews_number}</span>
                </div>
            </div>
            <div className="containerAction">
                <div className="containerBtnReviews flex" style={{
                    border: 'inherit'
                }}>
                    <button onClick={props.handlerShow}>Update</button>
                </div>
                {/* <div className="containerBtnReviews flex" style={{
                    border: 'inherit'
                }}>
                    <button onClick={props.handlerDelete}>Delete</button>
                </div> */}
            </div>
        </div>
    )
}
export default React.memo(InforProfile)