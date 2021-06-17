import React, { useEffect, useState } from 'react';
import VinylesBox from '../components/vinylesBox/VinylesBox';
import { randomColor, randomId } from '../services/VinylesServices';
import "../styles/home/Home.scss";

const Home = (props) => {

  const [data, setData] = useState([]);
  
  // size is width and height of a square and the perspective value
  const size = 160;
  // gap is the spacing between two vinyles
  const gap = 6;

  // Count event wheel
  let count = 0;

  const handleWheel = (e) => {
    // Get all vinyles div in an array (HTML collection)
    const vinylesElement = document.getElementsByClassName("vinyles");
    
    // Get last item position in data
    const lastItem = data.length - 1;

    // Get current item position in data
    const currentItem = data.length - 3;

    // Update count
    count = count +1;

    // Count limit
    const limit = 6;

    if(count >= limit){
      // Add a new className to deleted item
      vinylesElement[lastItem].classList.add('animEnd');
      // Wait 300ms
      setTimeout(() => {
        const arrayTmp = [];
        for (let i = 0; i < data.length; i++) {
          if(i === 0){
            // New items
            arrayTmp.push({
              id: randomId(),
              tZ: gap*i, 
              perpective: size, 
              tY: gap*i,
              style :{
                width: size+"px", 
                height: size+"px", 
                backgroundColor: '#'+ randomColor(), 
                transform: "perspective("+size+"px) translateZ("+gap*i+"px) translateY("+gap*i+"px)", 
                zIndex: i+1, 
                marginLeft: -(size/2)+"px"
              }, 
            });
          }else{
            arrayTmp.push({
              id: data[i - 1].id,
              tZ: gap*i, 
              perpective: size, 
              tY: gap*i,
              style :{
                width: size+"px", 
                height: size+"px", 
                backgroundColor: data[i - 1].style.backgroundColor, 
                transform: "perspective("+size+"px) translateZ("+gap*i+"px) translateY("+gap*i+"px)", 
                zIndex: i+1, 
                marginLeft: -(size/2)+"px"
              }, 
            });
          }
          // Reset margin-top
          vinylesElement[i].style.marginTop = "0";
        }

        // Set new data 
        setData(arrayTmp);

        vinylesElement[currentItem].style.marginTop = "-50px";

        // Reset count
        count = 0;
      }, 300);
    }else{
      // Update vinyles style
      for (let i = 0; i < data.length; i++) {
        vinylesElement[i].style.transitionDelay = "0s";
        // Add transition delay
        if(i >= 0 && i < currentItem){
          if(i > 0 && i < 17){
            vinylesElement[i].style.transitionDelay = "0."+Math.floor(Math.random() * 2) + 1+"s";
          }
        }
        if(count >= 3){
          vinylesElement[i].style.transform = "perspective("+data[i].perpective+"px) translateZ("+(data[i].tZ + ((data[i].tZ/80)*count))+"px) translateY("+(data[i].tY + ((data[i].tZ/80)*count))+"px) rotateX(-2deg) ";
        }else{
          vinylesElement[i].style.transform = "perspective("+data[i].perpective+"px) translateZ("+(data[i].tZ + ((data[i].tZ/200)*count))+"px) translateY("+(data[i].tY + ((data[i].tZ/200)*count))+"px) rotateX(0deg)";
        }
      }

      // Wait 700ms
      setTimeout(() => {
        // Reset style
        for (let i = 0; i < data.length; i++) {
          vinylesElement[i].style.transform = "perspective("+data[i].perpective+"px) translateZ("+data[i].tZ+"px) translateY("+(data[i].tY)+"px)";
        }
        // Reset count
        count = 0;
      }, 400);
    }
  }

  const initData = () => {

    const arrayTmp = [];

    for (let i = 0; i < 20; i++) {
      arrayTmp.push({
        id: randomId(),
        tZ: gap*i, 
        tY: gap*i,
        perpective: size,
        style :{
          width: size+"px", 
          height: size+"px", 
          backgroundColor: '#'+randomColor(), 
          transform: "perspective("+size+"px) translateZ("+gap*i+"px) translateY("+gap*i+"px) rotateX(-1.5deg)", 
          zIndex: i+1, 
          marginLeft: -(size/2)+"px"
        }, 
      });
    }
    setData(arrayTmp);
  }
  
  useEffect(() => {
    initData();
  }, [])

  return ( <>
    <div className="home" onWheel={handleWheel}>
      <VinylesBox data={data} />
    </div>
  </> );
}
 
export default Home;