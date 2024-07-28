// import logo from './logo.svg';
import './App.css';
import Main from './components/Main'
// import { Weather } from './components/Weather';
import { useState, useEffect } from 'react';
import UsersSection from './components/UsersSection';
import axios from 'axios';





const App = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get('https://ksitijassign4-production.up.railway.app/api/locations');
        setLocations(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchLocations();
    console.log(locations)
  }, []);

  // const [users, displayUsers] = useState([]);
  // useEffect(() => {
    // const addUser = async () => {
    //   try {
    //     const resp = await axios.post('http://localhost:3000/api/users')
    //     displayUsers(resp.data)
    //     console.log(resp.data);

    //     // if (resp) {
    //     // }
    //   } catch (error) {
    //     // resp.json(error.message)
    //   }
    // }
    // fetchUsers();
  // }, [])


    // function App() {
      return (
        <>
        <Main/>
        {/* <Weather/> */}
        <UsersSection locations={locations} setLocations={setLocations} />
        
 </ >)}
//     </>
//   );
// }

export default App;
