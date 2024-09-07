import React from 'react';
import { useNavigate } from 'react-router-dom';
const Button = (props) => {
  const { color1, color2, name,link } = props;
  const navigate = useNavigate();
  return (
   link?( <button 
    style={{
      backgroundImage: `linear-gradient(to top right, ${color1}, ${color2})`
    }}
    className="px-5 py-1.5 rounded-full text-white font-mono text-nowrap hover:scale-105"
    onClick={() => navigate(link)}
  >
    {name}
  </button>):(
     <button 
     style={{
       backgroundImage: `linear-gradient(to top right, ${color1}, ${color2})`
     }}
     className="px-5 py-1.5 rounded-full text-white font-mono text-nowrap hover:scale-105"
   >
     {name}
   </button>
  )
  );
}

export default Button;
