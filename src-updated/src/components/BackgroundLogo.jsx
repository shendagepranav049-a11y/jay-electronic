import "./BackgroundLogo.css";
import logo from "../assets/je-logo.png";

function BackgroundLogo({ position = "right" }) {
  return (
    <div className={`background-logo background-logo-${position}`}>
      <img src={logo} alt="" />
    </div>
  );
}

export default BackgroundLogo;