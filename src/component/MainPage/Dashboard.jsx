import React, { useState, useRef, useEffect } from 'react'
import { TbClick } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import TableComponent from './TableComponent'
import css from "../../styles/MainPage/Dashboard.module.css"

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const dropdownRef = useRef(null)
  const accountButtonRef = useRef(null)

  // Updated data for a 7-day week (Wed to Tue) with clicks between 150 - 300
  const data = [
    { name: 'Wed', uv: 210 },
    { name: 'Thu', uv: 260 },
    { name: 'Fri', uv: 300 },
    { name: 'Sat', uv: 150 },
    { name: 'Sun', uv: 230 },
    { name: 'Mon', uv: 280 },
    { name: 'Tue', uv: 180 },
  ];

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !accountButtonRef.current.contains(event.target)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Default and hover colors
  const defaultBarColor = "#5641f4";
  const hoverBarColor = "#6d59f9";

  // Custom Bar component to change color on hover
  const CustomBar = (props) => {
    const { x, y, width, height, index, fill } = props;
    const fillColor = index === activeIndex ? hoverBarColor : fill;
    return <rect x={x} y={y} width={width} height={height} fill={fillColor} />;
  };

  // Custom Tooltip that shows only the value with a matching card background,
  // positioned below the mouse pointer using the coordinate prop.
  const CustomTooltip = ({ active, payload, coordinate }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={css.customTooltip}
          style={{
            background: 'linear-gradient(to top, #1a1a1a, #1f1f1f)',
            padding: '8px',
            borderRadius: '4px',
            color: '#fff',
            position: 'absolute',
            left: coordinate.x,
            top: coordinate.y + 10, // 10px offset below the pointer
            pointerEvents: 'none'
          }}
        >
          <p style={{ margin: 0 }}>{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tick renderer for XAxis: highlight "Tue" with color #fff, others #888.
  const renderCustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    const fill = payload.value === "Tue" ? "#fff" : "#888";
    return (
      <text x={x} y={y + 16} textAnchor="middle" fill={fill}>
        {payload.value}
      </text>
    );
  };

  return (
    <div className={css.dashboardContainer}>
      <div className={css.headerComponent}>
        <h2 className={css.pageTitle}>Dashboard</h2>
        {/* Account button */}
        <div
          ref={accountButtonRef}
          className={css.accountButton}
          onClick={handleToggleDropdown}
        >
          T
        </div>
        {/* Dropdown menu */}
        {showDropdown && (
          <div className={css.dropdownMenu} ref={dropdownRef}>
            <ul>
              <li>Profile</li>
              <li>Logout</li>
            </ul>
          </div>
        )}
      </div>

      <div className={css.statsSection}>
        <div className={css.cardSection}>
          {/* Card 1 */}
          <div className={css.card}>
            <div className={css.topLeftCardDetails}>
              <TbClick className={css.cardIcon} />
              <span className={css.cardInfo}>Today's Interactions</span>
            </div>
            <div className={css.cardValueContainer}>
              <h3 className={css.cardValue}>300</h3>
            </div>
          </div>
          {/* Card 2 */}
          <div className={css.card}>
            <div className={css.topLeftCardDetails}>
              <TbClick className={css.cardIcon} />
              <span className={css.cardInfo}>This Week's Interactions</span>
            </div>
            <div className={css.cardValueContainer}>
              <h3 className={css.cardValue}>1500</h3>
            </div>
          </div>
          {/* Card 3 */}
          <div className={css.card}>
            <div className={css.topLeftCardDetails}>
              <TbClick className={css.cardIcon} />
              <span className={css.cardInfo}>This Month's Interactions</span>
            </div>
            <div className={css.cardValueContainer}>
              <h3 className={css.cardValue}>6200</h3>
            </div>
          </div>
          {/* Card 4 */}
          <div className={css.card}>
            <div className={css.topLeftCardDetails}>
              <TbClick className={css.cardIcon} />
              <span className={css.cardInfo}>This Years's Interactions</span>
            </div>
            <div className={css.cardValueContainer}>
              <h3 className={css.cardValue}>75434</h3>
            </div>
          </div>
        </div>

        <div className={css.chartSection}>
          <ResponsiveContainer width="96%" height="96%" className={css.barContainer}>
            <BarChart data={data}>
              <XAxis dataKey="name" tick={renderCustomXAxisTick} tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="uv"
                fill={defaultBarColor}
                onMouseEnter={(data, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                shape={(props) => <CustomBar {...props} activeIndex={activeIndex} />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data Info Section */}
      <div className={css.dataTableSection}>
        <div className={css.dataInfoSection}>
          {/* Left side title */}
          <span className={css.dataInfoTitle}>Recent Items</span>
          {/* Right side search and filter */}
          <div className={css.dataInfoRightSection}>
            {/* Search with icon and text field */}
            <div className={css.searchSection}>
              <FaSearch className={css.searchIcon} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={css.searchInput}
              />
            </div>
            {/* Filter dropdown */}
            <div className={css.filterItemSection}>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className={css.filterDropdown}
              >
                <option value="all" className={css.filterOption}>All</option>
                <option value="active" className={css.filterOption}>Active</option>
                <option value="inactive" className={css.filterOption}>Inactive</option>
              </select>
              <IoIosArrowDown className={css.dropdownIcon} />
            </div>
          </div>
        </div>

        <TableComponent className={css.tableComponent} />
      </div>

    </div>
  )
}

export default Dashboard
