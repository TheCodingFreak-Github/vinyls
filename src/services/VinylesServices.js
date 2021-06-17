export const randomId = () => {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

export const randomColor = () => {
  return (0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}