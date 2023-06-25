import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SchoolIcon from '@mui/icons-material/School';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import FeedIcon from '@mui/icons-material/Feed';
import ReportIcon from '@mui/icons-material/Report';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className='sidebar'>

      <div className='top'> 
          <span className='logo'> Mar-Isko </span>
        </div>
        <hr/>

      <div className='center'> 
          <ul>

          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className='icon' />
              <span> Dashboard </span>
            </li>
            </Link>

            <p className="title"> Web </p>
            <Link to='/faqs' style={{ textDecoration: "none" }}>
            <li>
              <LiveHelpIcon className='icon'/>
              <span> Accounts </span>
            </li>
            </Link>

            <Link to="/scholarships" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className='icon'/>
              <span> Scholarships </span>
            </li>
            </Link>

            <Link to='/about' style={{ textDecoration: "none" }}>
            <li>
              <InfoIcon className='icon'/>
              <span> Score Card </span>
            </li>
            </Link>

            <Link to="/contact" style={{ textDecoration: "none" }}>
            <li>
              <RecentActorsIcon className='icon'/>
              <span> Requirements </span>
            </li>
            </Link>
          


            <p className="title"> Informations </p>

            <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <AccountBoxIcon className='icon'/>
              <span> User Accounts</span>
            </li>
            </Link>

            <Link to="/Evaluation" style={{ textDecoration: "none" }}>
            <li>
              <ViewListIcon className='icon'/>
              <span> Evaluation </span>
            </li>
            </Link>
            <Link to="/applicants" style={{ textDecoration: "none" }}>
            <li>
              <ViewListIcon className='icon'/>
              <span> Applicants </span>
            </li>
            </Link>

            <Link to="/appointments" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthIcon className='icon'/>
              <span> Appointments </span>
            </li>
            </Link>

            <Link to="/scholars" style={{ textDecoration: "none" }}>
            <li>
              <HistoryEduIcon className='icon'/>
              <span> Scholars </span>
            </li>
            </Link>

            <p className="title"> Maintenance </p>

            <li>
              <AnnouncementIcon className='icon'/>
              <span> Announcement </span>
            </li>

            <Link to='/news' style={{ textDecoration: 'none'}}>
            <li>
              <FeedIcon className='icon'/>
              <span> News </span>
            </li> 
            </Link>
            
            <li>
    
              <ReportIcon className='icon'/>
              <span> Reports </span>
          
            </li>

<           Link to='/' style={{ textDecoration: "none"}}>
            <li>
              <LogoutIcon className='icon'/>
              <span> Logout </span>
            </li>
            </Link>

          </ul>
        </div>

      
    </div>
  )
}

export default Sidebar