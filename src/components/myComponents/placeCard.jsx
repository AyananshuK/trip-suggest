import { getPlaceDetails, PHOTO_URL } from '@/service/textSearchGoogleMapsApi';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const PlaceCard = ({place, location}) => {
    const [photo, setPhoto] = useState();
        
    useEffect(()=>{
        place && getPlacePhoto();
    }, [place]);

    const getPlacePhoto = async ()=>{
        const data = {
            textQuery: place.name,
        }
        const result = await getPlaceDetails(data).then(res => {
            const name = res.data.places[0].photos[0].name;
            const picUrl = PHOTO_URL.replace("{NAME}",name);
            setPhoto(picUrl);
        });
    };
  return (
    <div>
        <Link to={"https://www.google.com/maps/search/?api=1&query="+place?.name+", "+location} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex hover:scale-105 transition-all md:hover:shadow-md gap-5'>
                <img src={photo} alt="" className='w-[130px] h-[130px] rounded-xl object-cover'/>
                <div>
                    <h2 className='font-bold text-lg'>{place.name}</h2>
                    <p className='text-sm text-gray-400'>{place.details}</p>
                    <p className='mt-2 font-semibold'>⌚{place.time_to_travel}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default PlaceCard