import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate()

  function handleClick(){
    navigate('/saved-events')

  }




  return (
    <footer>
      <button onClick={handleClick}>My Events</button>
    </footer>
  );
};

export default Footer;
