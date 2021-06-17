import React from 'react';
import '../../styles/vinylesBox/VinylesBox.scss';
import Vinyles from '../vinyles/Vinyles';

const VinylesBox = ({data}) => {

  // Get current item position in data
  const currentItem = data.length - 3;

  const handleClick = (e) => {
    const el = e.currentTarget;
    
    if(el.style.marginTop === "-50px"){
      el.style.marginTop = "-200px";
    }else{
      el.style.marginTop = "-50px";
    }
  }

  return ( <>
    <div className="vinyles-box" >
      {
        data.map((item, index) =>
          <Vinyles key={item.id} id={item.id} styles={item.style} 
          handleClick={(index === currentItem) ? handleClick : undefined} />
        )
      }
    </div>
  </> );
}
 
export default VinylesBox;