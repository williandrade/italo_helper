import { Rnd } from 'react-rnd';
import './Window.css';

function Window(props: any) {
  const style: any = {
    zIndex: 100,
    borderRadius: '10px',
    backgroundColor: 'white',
    overflow: 'hidden',
    WebkitBoxShadow: '-5px 10px 40px 10px rgba(0, 0, 0, 0.3)',
    MozBoxShadow: '-5px 10px 40px 10px rgba(0, 0, 0, 0.3)',
    boxShadow: '-5px 10px 40px 10px rgba(0, 0, 0, 0.3)',
  };

  return (
    <Rnd
      default={{
        width: 900,
        height: 600,
        x: window.innerWidth - 1000,
        y: 100,
      }}
      style={style}
      bounds="parent"
    >
      {/* <div className='window-control red'> </div>
      <div className='window-control yellow'> </div>
      <div className='window-control green'> </div> */}
      <div className='text-window'>{props.children}</div>
    </Rnd>
  );
}

export default Window;
