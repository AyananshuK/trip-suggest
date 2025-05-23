import { getPlaceDetails, PHOTO_URL } from "@/service/textSearchGoogleMapsApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserTripCard = ({ trip }) => {
  const [photo, setPhoto] = useState();

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelectedOptions?.location?.label,
    };
    const result = await getPlaceDetails(data).then((res) => {
      const name = res.data.places[0].photos[1].name;
      const picUrl = PHOTO_URL.replace("{NAME}", name);
      setPhoto(picUrl);
    });
  };

  return (
    <Link to={`/view-trip/${trip.id}`}>
        <div className="hover:scale-105 transition-all">
        <img src={photo} alt="" className="object-cover rounded-xl h-[180px] w-full" />
        <div className="mt-3">
            <h2 className="font-bold text-lg">
            {trip.userSelectedOptions.location.label}
            </h2>
            <h2>
            {trip.userSelectedOptions.numberOfDays} days trip with {trip.tripData.budget} budget
            </h2>
        </div>
        </div>
    </Link>
  );
};

export default UserTripCard;
