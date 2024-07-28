import React, { useState } from 'react'
import axios from 'axios';
// import {Link} from 'react-router-dom'

 function UsersSection({ locations,setLocations }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const res = await axios.post('https://ksitijassign4-production.up.railway.app/api/users', {
                    username,
                    password,
                });
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                setError('Data Found');
                alert('Login Successful');
            } catch (error) {
                console.log(username,password);
                console.log(error)
                setError('Invalid Credentials');          
                setTimeout(() => {
                setError('');          
                }, 2000);
            }

            // axios.post("http://localhost:3000/register",{
            //     username,
            //     password
            // })
            // .then(result=>console.log(result))
            // .catch(err=>console.log(err))
        //     // setUserName('');
        //     // setPassword('');
    };

    const deleteLocation = async (id) => {
        try {
          await axios.delete(`https://ksitijassign4-production.up.railway.app/api/locations/${id}`);
          setLocations(locations.filter(location => location._id !== id));
          console.log('Location deleted');
        } catch (error) {
          console.error('Error deleting location:', error.message);
        }
      };

      const checkUser=async()=>{
        try {
            const check=await axios.post('https://ksitijassign4-production.up.railway.app/api/users',{
                username,password
            })
            console.log(check.data)
            setError('Valid User') 
        } catch (error) {
            console.log('chala jaa')
            setError('Invalid Credentials');          
                setTimeout(() => {
                setError('');          
                }, 2000);
        }
      }
    return (

        <>

            <div id='user' className='d-flex flex-column '>
                <a href='/register' >Link</a>
                <form onSubmit={handleSubmit} className='input' id='loginform'>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input value={username} onChange={(e) => setUserName(e.target.value)} type="text" className="form-control searchbar"  />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    
                    <button onClick={checkUser}  className="btn btn-outline-light borders mx-1 my-2" >Login</button>
                    <button type='submit' className="btn btn-outline-light borders mx-1 my-2" >SignUp</button>
                    {/* <Link to='/register' className='btn '>SignUp</Link> */}
                    {error && <p className='fs-5'>{error}</p>}

                </form>
                <div className='my-5 border scrollbar' >
                    <p className='fs-1 text-center my-0'>Saved Locations</p>
                    <div id="savedlocation " className='d-flex justify-content-center border align-items-center'>
                        {locations.map((location,index) => {
                            return (
                               <div id={`l${index}`} key={location._id} className="saved border mx-2 text-center">
                                    <button onClick={()=>deleteLocation(location._id)}><div className="close ">X</div></button>
                                    <p className='fs-3 font-weight-bold'>{location.cityname}</p>
                                    <p className='fs-1 my-0'>{location.temp}&deg;c</p>
                                    <p className='fs-6 my-0'>humidity:{location.humidity}</p>
                                    <p className='fs-6 my-0'>{location.wind} km/h</p>
                                    <p className='fs-4 mt-1'>{location.condition}</p>
                                </div>
                            );
                        })}

                        {/* <div className="saved border mx-2 text-center">
                <p className='fs-3 font-weight-bold'>City</p>
                <p className='fs-1 my-0'>32&deg;c</p>
                <p className='fs-6 my-0'>Humidity</p>
                <p className='fs-6 my-0'>Wind km/h</p>
                <p className='fs-4 mt-1'>Weather</p>
            </div> */}
                    </div>
                </div>

            </div>

        </>

    );
}
export default UsersSection;