import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import UserTripCard from '@/components/myComponents/userTripCard';

const MyTrips = () => {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));
    
    const getUserTrips = async ()=>{
        if(!user){
            navigate("/");
            return;
        }else{
            const q = query(collection(db, "trip suggest"), where("userEmail", "==", user?.email));
            const querySnapshot = await getDocs(q);
            setUserTrips([]);
            const trips = [];
            querySnapshot.forEach((doc) => {
                trips.push(doc.data());
            });
            setUserTrips(trips);
        }
    }
    
    useEffect(()=>{
        getUserTrips();
    },[])


  return (
    <div className='container mx-auto'>
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
                {userTrips.length>0 ? userTrips.map((trip, index)=>(
                    <UserTripCard trip={trip} />
                )) : [1,2,3,4,5,6].map((item,index)=>(
                    <div key={index} className='h-[180px] w-full bg-slate-200 animate-pulse rounded-xl'>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default MyTrips