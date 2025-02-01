
import './globals.css';
import Signinbutton from "./components/signinbutton";


export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        Home
        <div className="py-8 flex flex-col items-center">
          <Signinbutton className="signin-button"> 
            Get Started
          </Signinbutton>
        </div>
      </div>
  );
}
