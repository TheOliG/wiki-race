import DALE_LOGO from '../../images/DALE_LOGO.jpg' 


function HomePage() {
  return (
    <div className="HomePage">
      <div className='text-center'>
        <h1 className="display-1">Race Wikipedia With Wiki Run!</h1>
        <img
          alt=""
          src={DALE_LOGO}
          className="img-fluid rounded"
          style={{"maxHeight": "65vh"}}
        />
      </div>
      </div>
      
  );
}

export default HomePage;
