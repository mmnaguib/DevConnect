import Button from "devextreme-react/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <Link to="/login">سجل الان</Link>
      <h1>Welcome to Your Professional Community</h1>
      <Button style={{ margin: "10px" }}>Continue with Google</Button>
      <Button style={{ margin: "10px" }}>Continue with Microsoft</Button>
      <Button style={{ margin: "10px" }}>Sign in with Email</Button>
      <p>
        New here? <a href="/register">Join now</a>
      </p>
    </div>
  );
};

export default LandingPage;
