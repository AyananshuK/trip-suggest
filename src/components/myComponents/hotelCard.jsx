import { getPlaceDetails, PHOTO_URL } from "@/service/textSearchGoogleMapsApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCard = ({hotel}) => {
    const [photo, setPhoto] = useState();
    
    useEffect(()=>{
        hotel && getPlacePhoto();
    }, [hotel]);

    const getPlacePhoto = async ()=>{
        const data = {
            textQuery: hotel.name,
        }
        const result = await getPlaceDetails(data).then(res => {
            const name = res.data.places[0].photos[0].name;
            const picUrl = PHOTO_URL.replace("{NAME}",name);
            setPhoto(picUrl);
        });
    };
  return (
    <div>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          hotel?.name +
          ", " +
          hotel?.address
        }
        target="_blank"
      >
        <div className="hover:scale-105 transition-all cursor-pointer">
          <img src={photo} alt="" className="h-[180px] w-full object-cover rounded-xl"/>
          <div className="my-2 flex flex-col gap=2">
            <h2 className="font-medium">{hotel.name}</h2>
            <h2 className="text-xs text-gray-500">📍 {hotel.address}</h2>
            <h2 className="text-sm">{hotel.price_range}</h2>
            <h2 className="text-sm">⭐{hotel.rating}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HotelCard;
