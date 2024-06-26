import { useState, useEffect } from 'react';
import Header from "../component/Header";
import UserStats from "../component/UserStats";
import AddItemData from "../component/AddItemData";
import TableData from "../component/TableData";
import "../styles/Home.css";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch('https://placify-backend.vercel.app/api/posts/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };


  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const token = localStorage.getItem('jwt');

  return (
    <div className="homeContainer">
      <Header />
      <UserStats />
      <AddItemData data={data} fetchData={fetchData} />
      <TableData data={data} fetchData={fetchData} />
    </div>
  )
}

export default Home