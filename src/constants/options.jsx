export const selectOptions = [
    {
        id:1,
        title: "Just me",
        desc: "A sole traveller in exploration",
        icon: "😎",
        people: "1"
    },
    {
        id:2,
        title: "Couple",
        desc: "Two travellers",
        icon: "🥂",
        people: "2"
    },
    {
        id:3,
        title: "Family",
        desc: "A group of fun and adventure",
        icon: "✈️",
        people: "3 to 5"
    },
    {
        id:4,
        title: "Friends",
        desc: "A bunch traveller in exploration",
        icon: "🫂",
        people: "5 to 10"
    }
]

export const budgetOptions = [
    
    {
        id:1,
        title: "Low",
        desc: "Save money",
        icon: "💵",
    },
    {
        id:2,
        title: "Moderate",
        desc: "Keep cost on the average side",
        icon: "💰",
    },
    {
        id:3,
        title: "Luxury",
        desc: "Don't worry about cost",
        icon: "💸",
    },
]

export const AI_PROMPT=`Generate Travel Plan for Location: {location}, for {totalDays} days for {traveller} people with a {budget} budget, Give me a Hotels options list with Hotel name, Hotel address, Price, Hotel image URL, geo coordinates, rating, descriptions and suggest itinerary with place name, place details, place image URL, geo coordinates, ticket pricing, time to travel each of the location for {totalDays} days with each day plan and best time to visit in JSON format.`
