import { useState, useEffect } from 'react';
import Header from "../component/Header";
import UserStats from "../component/UserStats";
import AddItemData from "../component/AddItemData";
import TableData from "../component/TableData";
import "../styles/Home.module.css";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch('https://placify-backend-m4tnx14ua-itz-arnav.vercel.app/api/posts/', {
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

  console.log('Fetching token', token);
  return (
    <>
    <Header />
    <UserStats />
    <AddItemData fetchData={fetchData}/>
    <TableData data={data} fetchData={fetchData} />
    </>
  )
}

export default Home