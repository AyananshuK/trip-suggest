import React from "react";
import PlaceCard from "./placeCard";

const PlacesToVisit = ({ trip }) => {
  return (
    <div className="container mx-auto">
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index} className="mt-3">
            <h2 className="font-medium text-lg">{item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">

            {item.places?.map((place, index) => (
                <div key={index} className="my-3">
                <h2 className="font-medium text-sm text-orange-600">{place.best_time_to_visit}</h2>
                 <PlaceCard place={place} location={trip?.tripData?.location}/>
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
