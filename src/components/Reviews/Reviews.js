import { useState, useContext } from "react";
//import './App.css';
import { FaStar } from "react-icons/fa";
import { AuthContext } from './../../context/AuthContext';
import { createReview } from '../../api/reviews'
//import Profile from "./Profile"
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};



function Reviews() {
  const { userData, token } = useContext(AuthContext);
  const [currentValue, setCurrentValue] = useState(1);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [txt, setText] = useState('')
  const stars = Array(5).fill(0)
  console.log(userData,token)
  // handle mouse
  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }




  /// handle comment

  const handlerCreateReviews = (e) => {
    e.preventDefault();
    console.log(typeof currentValue)
    if (token) {
      createReview(userData._id, currentValue,txt,token).then((result) => {
        console.log(result)
      }).catch((e)=>{
        console.log(e.response)
      })
    }

  }



  return (
    <form onSubmit={handlerCreateReviews} class="login1">
      <div style={styles.container}>
        <h2>  Review </h2>
        <div style={styles.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                style={{
                  marginRight: 10,
                  cursor: "pointer"
                }}
              />
            )
          })}
        </div>
        <textarea
          placeholder="What's your experience?"
          style={styles.textarea}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <button
          style={styles.button}
          onClick={handlerCreateReviews}
        >
          Submit
      </button>

      </div>

    </form>


  );
};


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
    minHeight: 100,
    width: 300
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,


  }
};

export default Reviews