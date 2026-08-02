import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faChartLine, 
  faClipboardList, 
  faHeart 
} from '@fortawesome/free-solid-svg-icons'
import '../../assets/styles/Sider.css'
import logo from '../../assets/images/logo.png'

const studentMenuItems = [
  {
    id: 1,
    title: 'ダッシュボード',
    path: '/student',
    icon: faChartLine
  },
  {
    id: 2,
    title: '模擬試験',
    path: '/student/bai-thi-luyen-tap',
    icon: faClipboardList
  },
  {
    id: 3,
    title: '本試験',
    path: '/student/bai-thi',
    icon: faClipboardList
  },
  {
    id:4,
    title: '模擬試験履歴',
    path: '/student/lich-su-luyen-tap',
    icon: faClipboardList
  },
  {
    id:5,
    title: '本試験履歴',
    path: '/student/lich-su-thi',
    icon: faClipboardList
  },

  {
    id: 5,
    title: 'お気に入り試験',
    path: '/student/de-thi-yeu-thich',
    icon: faHeart
  },
]

const Sider = () => {
  const location = useLocation()

  return (
    <aside className="sider">
      <div className="sider-content">
        <div className="sider-logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="logo-text">Quiz</span>
        </div>

        <nav className="sider-menu">
          {studentMenuItems.map((item) => (
            <Link 
              key={item.id} 
              to={item.path} 
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="menu-icon">
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <span className="menu-text">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sider;