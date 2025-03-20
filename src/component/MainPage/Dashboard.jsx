import React, { useState, useRef, useEffect } from 'react'
import { TbClick } from "react-icons/tb"
import { FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import TableComponent from './TableComponent'
import styles from "../../styles/MainPage/Dashboard.module.css"

const Dashboard = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [filterValue, setFilterValue] = useState("all")
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const accountBtnRef = useRef(null)
  const chartData = [
    { name: 'Wed', value: 210 },
    { name: 'Thu', value: 260 },
    { name: 'Fri', value: 300 },
    { name: 'Sat', value: 150 },
    { name: 'Sun', value: 230 },
    { name: 'Mon', value: 280 },
    { name: 'Tue', value: 180 }
  ]
  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev)
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !accountBtnRef.current.contains(event.target)
      ) {
        setDropdownVisible(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  const DEFAULT_BAR_COLOR = "#5641f4"
  const HOVER_BAR_COLOR = "#6d59f9"
  const CustomBar = (props) => {
    const { x, y, width, height, index, fill } = props
    const fillColor = index === hoveredBarIndex ? HOVER_BAR_COLOR : fill
    return <rect x={x} y={y} width={width} height={height} fill={fillColor} />
  }
  const CustomTooltip = ({ active, payload, coordinate }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={styles.customTooltip}
          style={{
            background: 'linear-gradient(to top, #1a1a1a, #1f1f1f)',
            padding: '8px',
            borderRadius: '4px',
            color: '#fff',
            position: 'absolute',
            left: coordinate.x,
            top: coordinate.y + 10,
            pointerEvents: 'none'
          }}
        >
          <p style={{ margin: 0 }}>{payload[0].value}</p>
        </div>
      )
    }
    return null
  }
  const renderXAxisTick = ({ x, y, payload }) => {
    const fill = payload.value === "Tue" ? "#fff" : "#888"
    return (
      <text x={x} y={y + 16} textAnchor="middle" fill={fill}>
        {payload.value}
      </text>
    )
  }
  const handleLogout = () => {
    logout()
    navigate("/login")
  }
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Dashboard</h2>
        <div ref={accountBtnRef} className={styles.accountButton} onClick={toggleDropdown}>
          {user ? user.charAt(0).toUpperCase() : '?'}
        </div>
        {dropdownVisible && (
          <div className={styles.dropdown} ref={dropdownRef}>
            <ul>
              <li>
                <FaUser className={styles.dropdownIcon} />
                <span>Profile</span>
              </li>
              <li onClick={handleLogout}>
                <FaSignOutAlt className={styles.dropdownIcon} />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className={styles.statsSection}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <TbClick className={styles.cardIcon} />
              <span className={styles.cardLabel}>
                Today's <span className={styles.hideOnMobile}>Interactions</span>
              </span>
            </div>
            <div className={styles.cardValueWrapper}>
              <h3 className={styles.cardValue}>300</h3>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <TbClick className={styles.cardIcon} />
              <span className={styles.cardLabel}>
                This Week's <span className={styles.hideOnMobile}>Interactions</span>
              </span>
            </div>
            <div className={styles.cardValueWrapper}>
              <h3 className={styles.cardValue}>1500</h3>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <TbClick className={styles.cardIcon} />
              <span className={styles.cardLabel}>
                This Month's <span className={styles.hideOnMobile}>Interactions</span>
              </span>
            </div>
            <div className={styles.cardValueWrapper}>
              <h3 className={styles.cardValue}>6200</h3>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <TbClick className={styles.cardIcon} />
              <span className={styles.cardLabel}>
                This Year's <span className={styles.hideOnMobile}>Interactions</span>
              </span>
            </div>
            <div className={styles.cardValueWrapper}>
              <h3 className={styles.cardValue}>75434</h3>
            </div>
          </div>
        </div>
        <div className={styles.chart}>
          <ResponsiveContainer width="96%" height="96%" className={styles.barContainer}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={renderXAxisTick} tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="value"
                fill={DEFAULT_BAR_COLOR}
                onMouseEnter={(data, index) => setHoveredBarIndex(index)}
                onMouseLeave={() => setHoveredBarIndex(null)}
                shape={(props) => <CustomBar {...props} activeIndex={hoveredBarIndex} />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={styles.tableSection}>
        <div className={styles.dataHeader}>
          <span className={styles.dataTitle}>Recent Items</span>
          <div className={styles.dataControls}>
            <div className={styles.searchBox}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filterBox}>
              <select
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <IoIosArrowDown className={styles.filterIcon} />
            </div>
          </div>
        </div>
        <TableComponent className={styles.table} />
      </div>
    </div>
  )
}

export default Dashboard