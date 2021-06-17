import React from 'react';
import '../../styles/vinyles/Vinyles.scss';
import cover from '../../assets/cover.jpg';

const Vinyles = ({id, styles, handleClick}) => {
  return ( <>
    <div style={styles} className="vinyles" onClick={handleClick}>
      <span>{id}</span>
      <img src={cover} alt="cover-img" />
    </div>
  </> );
}
 
export default Vinyles;