import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import TripInfo from "@/components/myComponents/tripInfo";
import Hotels from "@/components/myComponents/hotels";
import PlacesToVisit from "@/components/myComponents/placesToVisit";
import Footer from "@/components/myComponents/footer";

const ViewTrip = () => {
  const {tripId} = useParams();
  const [trip, setTrip] = useState({});

  useEffect(()=>{
    {tripId && getTripData()}
  },[tripId]); 

  const getTripData = async ()=>{
    const docref = doc(db, "trip suggest", tripId);
    const docDetails = await getDoc(docref);
    if(docDetails.exists()){
        // console.log("Document", docDetails.data());
        setTrip(docDetails.data());
        // console.log(trip)
    }else{
        toast("No trip found");
    }
  }


  return (
    <div className="container mx-auto">
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            <TripInfo trip={trip}/>
            <Hotels trip={trip}/>
            <PlacesToVisit trip={trip}/>
            <Footer trip={trip}/>
        </div>
    </div>
  );
};

export default ViewTrip;
