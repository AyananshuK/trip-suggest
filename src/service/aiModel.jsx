// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
});
const config = {
  temperature: 1,
  maxOutputTokens: 8192,
  topP: 0.95,
  topK: 64,
  responseMimeType: "application/json",
};
const model = "gemini-2.0-flash";
const history = [
  {
    role: "user",
    parts: [
      {
        text: `Generate Travel Plan for Location: Darjeeling, West Bengal, India, for 3 days for 2 people with a Cheap budget, Give me a Hotels options list with Hotel name, Hotel address, Price, Hotel image URL, geo coordinates, rating, descriptions and suggest itinerary with place name, place details, place image URL, geo coordinates, ticket pricing, time to travel each of the location for 3 days with each day plan and best time to visit in JSON format.`,
      },
    ],
  },
  {
    role: "model",
    parts: [
      {
        text: `Okay, here's a JSON format travel plan for Darjeeling, West Bengal, India, for 3 days for 2 people on a budget. I've included hotel options, a detailed itinerary, and other relevant information.  Keep in mind that prices are estimates and can vary based on season and availability.  Also, image URLs are placeholders, as it's impossible to guarantee consistent, current links for specific hotels over time.  I recommend verifying these details closer to your travel date.

\`\`\`json
{
  "location": "Darjeeling, West Bengal, India",
  "duration": "3 Days",
  "budget": "Cheap",
  "travelers": 2,
  "best_time_to_visit": "October to December (clear skies, pleasant weather), March to May (flowering season)",
  "hotels": [
    {
      "name": "Hotel Sonam Delek",
      "address": "Dr. Zakir Hussain Road, Darjeeling, West Bengal 734101, India",
      "price_range": "₹800 - ₹1500 per night",
      "image_url": "https://example.com/hotel_sonam_delek.jpg",
      "geo_coordinates": {
        "latitude": 27.0400,
        "longitude": 88.2660
      },
      "rating": 3.8,
      "description": "Budget-friendly hotel with basic amenities, clean rooms, and a convenient location near the market. Offers views of the city. Can book online or directly through the hotel."
    },
    {
      "name": "Dekeling Hotel",
      "address": "Hawkins Rd, Chauk Bazaar, Darjeeling, West Bengal 734101, India",
      "price_range": "₹1000 - ₹2000 per night",
      "image_url": "https://example.com/dekeling_hotel.jpg",
      "geo_coordinates": {
        "latitude": 27.0415,
        "longitude": 88.2650
      },
      "rating": 4.0,
      "description": "A simple but comfortable hotel offering decent rooms at reasonable prices. Popular among budget travelers.  Near main bazaar."
    },
    {
      "name": "Hotel Seven Seventeen",
      "address": "Robertson Road, Near Chowrasta, Darjeeling, West Bengal 734101",
      "price_range": "₹1200 - ₹2500 per night",
      "image_url": "https://example.com/hotel_seven_seventeen.jpg",
      "geo_coordinates": {
        "latitude": 27.0430,
        "longitude": 88.2635
      },
      "rating": 4.2,
      "description": "Offers clean rooms and good service. Relatively close to Chowrasta. Often requires advance booking especially during peak season."
    }
  ],
  "itinerary": [
    {
      "day": "day1",
      "theme": "Sunrise and Local Exploration",
      "places": [
        {
          "name": "Tiger Hill",
          "details": "Famous for its panoramic view of Mount Everest and Kanchenjunga at sunrise.  Book a jeep in advance as it gets very crowded.",
          "image_url": "https://example.com/tiger_hill.jpg",
          "geo_coordinates": {
            "latitude": 27.0600,
            "longitude": 88.3000
          },
          "ticket_pricing": "₹150-₹200 per person (entry fee). Jeep costs ₹800-₹1200 (shared).",
          "time_to_travel": "45 mins - 1 hour (early morning) from hotel",
          "best_time_to_visit": "Early morning (around 4 AM to catch the sunrise)"
        },
        {
          "name": "Ghoom Monastery",
          "details": "One of the oldest Tibetan Buddhist monasteries in Darjeeling.  Admire the Maitreya Buddha statue.",
          "image_url": "https://example.com/ghoom_monastery.jpg",
          "geo_coordinates": {
            "latitude": 27.0350,
            "longitude": 88.2680
          },
          "ticket_pricing": "Free entry, donations welcome.",
          "time_to_travel": "15-20 mins from tiger hill",
          "best_time_to_visit": "Anytime during the day, but mornings are peaceful."
        },
        {
          "name": "Batasia Loop",
          "details": "A spiral railway track offering a 360-degree view of Darjeeling. A war memorial is also located here.",
          "image_url": "https://example.com/batasia_loop.jpg",
          "geo_coordinates": {
            "latitude": 27.0390,
            "longitude": 88.2550
          },
          "ticket_pricing": "₹15 per person.",
          "time_to_travel": "5-10 mins from ghoom monastery",
          "best_time_to_visit": "During the day, especially when the toy train passes through."
        },
        {
          "name": "Chowrasta",
          "details": "The heart of Darjeeling, a vibrant public square where locals and tourists gather. Shop for souvenirs and enjoy the atmosphere.",
          "image_url": "https://example.com/chowrasta.jpg",
          "geo_coordinates": {
            "latitude": 27.0420,
            "longitude": 88.2640
          },
          "ticket_pricing": "Free entry.",
          "time_to_travel": "15-20 mins from batasia loop",
          "best_time_to_visit": "Anytime, but evenings are lively."
        }
      ]
    },
    {
      "day": "day2",
      "theme": "Tea Gardens and Himalayan Wildlife",
      "places": [
        {
          "name": "Happy Valley Tea Estate",
          "details": "The oldest tea estate in Darjeeling.  Take a tour to learn about tea processing and sample different varieties.",
          "image_url": "https://example.com/happy_valley_tea_estate.jpg",
          "geo_coordinates": {
            "latitude": 27.0460,
            "longitude": 88.2480
          },
          "ticket_pricing": "₹50-₹100 per person (tour).",
          "time_to_travel": "20-30 mins from chowrasta",
          "best_time_to_visit": "During the day when the factory is operational (check timings)."
        },
        {
          "name": "Padmaja Naidu Himalayan Zoological Park",
          "details": "Home to endangered Himalayan species like the red panda, snow leopard, and Tibetan wolf.",
          "image_url": "https://example.com/padmaja_naidu_zoo.jpg",
          "geo_coordinates": {
            "latitude": 27.0550,
            "longitude": 88.2530
          },
          "ticket_pricing": "₹100 per person for Indians, ₹300 for foreigners.",
          "time_to_travel": "15-20 mins from happy valley tea estate",
          "best_time_to_visit": "During the day. Arrive early to avoid crowds."
        },
        {
          "name": "Himalayan Mountaineering Institute",
          "details": "Learn about mountaineering history and see equipment used by famous climbers.  Located within the zoo complex.",
          "image_url": "https://example.com/hmi.jpg",
          "geo_coordinates": {
            "latitude": 27.0550,
            "longitude": 88.2530
          },
          "ticket_pricing": "₹60 per person.",
          "time_to_travel": "Inside the zoo premises.",
          "best_time_to_visit": "During the day.  Allow 1-2 hours."
        },
         {
          "name": "Japanese Temple and Peace Pagoda",
          "details": "A Japanese Buddhist temple with a serene atmosphere.  Offers stunning views of the surrounding hills.",
          "image_url": "https://example.com/peace_pagoda.jpg",
          "geo_coordinates": {
            "latitude": 27.0320,
            "longitude": 88.2570
          },
          "ticket_pricing": "Free entry.",
          "time_to_travel": "20-30 mins from HMI",
          "best_time_to_visit": "Anytime during the day.  Good for sunset views."
        }
      ]
    },
    {
      "day": "day3";
      "theme": "Toy Train and Departure",
      "places": [
        {
          "name": "Darjeeling Himalayan Railway (Toy Train)",
          "details": "A UNESCO World Heritage Site. Take a joyride on the iconic narrow-gauge railway.",
          "image_url": "https://example.com/toy_train.jpg",
          "geo_coordinates": {
            "latitude": 27.0420,
            "longitude": 88.2640
          },
          "ticket_pricing": "₹800-₹1600 per person (depending on the class and route).",
          "time_to_travel": "Depends on the hotel's location, but usually within 15-20 minutes to the station from hotel",
          "best_time_to_visit": "Plan the journey in the morning or afternoon based on train schedule."
        },
        {
          "name": "Local Market Shopping",
          "details": "Explore the local markets near Chowk Bazaar. Buy souvenirs, tea, woollens, and local handicrafts.",
          "image_url": "https://example.com/darjeeling_market.jpg",
          "geo_coordinates": {
            "latitude": 27.0420,
            "longitude": 88.2640
          },
          "ticket_pricing": "Free entry. Cost depends on the purchases.",
          "time_to_travel": "5-10 mins walk from Toy Train station",
          "best_time_to_visit": "Afternoon to Evening"
        }
      ]
    }
  ],
  "notes": [
    "Transportation:  Consider using shared jeeps or local buses for cheaper travel.  Walking is a good option within Darjeeling town.",
    "Food:  Enjoy local food at budget-friendly restaurants and stalls. Try momos, thukpa, and other Tibetan dishes.",
    "Bargaining:  Bargain while shopping in the local markets.",
    "Altitude Sickness: Darjeeling is at a high altitude.  Take it easy on the first day and stay hydrated.",
    "Permits: Certain areas may require permits, check before planning your visit to those areas.",
    "Weather: Carry warm clothes even during summer as the weather can change quickly.",
    "Verify Information:  Always confirm prices, timings, and availability with official sources or local operators before your trip. Things can change quickly.",
    "Booking: Book hotels and transportation in advance, especially during peak season."
  ]
}
\`\`\`
`,
      },
    ],
  },
];

export const chatSession = ai.chats.create({model,config,history});
