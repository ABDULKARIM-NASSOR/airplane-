import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import '../App.css';
const  Services = ()=>{
    return(
        <>
        <div className="cards">
            <div className="one">
              <h2>Hotel</h2>
       <a href='#'><FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/></a> 
            </div>
            <div className="two">
              <h2>Car Rental</h2>
            <a href='#'><FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/></a>  
            </div>
            <div className="three">
              <h2>Travel Guide</h2>
<a href='#'><FontAwesomeIcon icon={faArrowRight} className="arrow-icon"/></a>  
            </div>
        </div>
        </>
    )
} 

export default Services;