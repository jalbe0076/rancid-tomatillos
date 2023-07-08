import exitBanner from '../../images/old-school-return-banner.png'

const ExitMovie = ({viewAll}) => {
  return <img className='main-title' src={exitBanner} alt='old school theater banner with the title rancid tomatillos' onClick={viewAll}/>
};

export default ExitMovie;