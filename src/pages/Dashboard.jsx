import React from 'react'
import { Appbar, Balance, Users } from '../assets/RequiredCompo'
import axios from 'axios'
import { useState,useEffect } from 'react';
const Dashboard = () => {
  const [balance ,setBalance]=useState("");
  const [firstname,setFirstname]=useState("");
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        
        console.log("API Response:", response.data); 
        const { balance, firstName } = response.data;
        const roundedBalance=parseFloat(balance).toFixed(2);// Log the entire response
        setBalance(roundedBalance);
        setFirstname(firstName) // Check if balance is correctly assigned
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
  
    fetchBalance();
  }, []);
  return (
    <div>
      <Appbar firstName={firstname|| "User"} />
      <Balance value={balance} />
      <Users />
    </div>
  )
}

export default Dashboard
