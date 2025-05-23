import {IoIosSend} from "react-icons/io"
import { Button } from "../ui/button"
import { getPlaceDetails, PHOTO_URL } from "@/service/textSearchGoogleMapsApi"
import { useEffect, useState } from "react"


const TripInfo = ({trip}) => {
    const [photo, setPhoto] = useState();

    useEffect(()=>{
        trip && getPlacePhoto();
    }, [trip]);

    const getPlacePhoto = async ()=>{
        const data = {
            textQuery: trip?.userSelectedOptions?.location?.label,
        }
        const result = await getPlaceDetails(data).then(res => {
            const name = res.data.places[0].photos[1].name;
            const picUrl = PHOTO_URL.replace("{NAME}",name);
            setPhoto(picUrl)
        });
    };

  return (
    <div>
        <img src={photo} alt="" className='h-[300px] w-full object-cover rounded-xl'/>
        
        <div className="flex justify-between items-center">
            <div className='flex flex-col my-5 gap-2'>
                <h2 className='font-bold text-2xl'>
                    {trip?.userSelectedOptions?.location?.label}
                </h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                        📅{trip?.userSelectedOptions?.numberOfDays} Days
                    </h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                        💰{trip?.userSelectedOptions?.budget} Budget 
                    </h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                        😎No. of traveller: {trip?.userSelectedOptions?.traveller}
                    </h2>
                </div>
            </div>
            <Button><IoIosSend /></Button>
        </div>
    </div>
  )
}

export default TripInfo