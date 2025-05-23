import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AI_PROMPT, budgetOptions, selectOptions } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/aiModel";
import Logo from "@/assets/logo3.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [openLoginBox, setOpenLoginBox] = useState(false);
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (key, val) => {
    setFormData({
      ...formData,
      [key]: val,
    });
  };

  useEffect(() => {
    // console.log(formData)
  }, [formData]);

  const getUserProfile = async (tokenInfo) => {
    await axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenLoginBox(false);
        onGenerateTrip();
      })
      .catch((err) => console.log(err));
  };

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (err) => console.log(err),
  });

  const onGenerateTrip = async () => {
    if (
      formData?.numberOfDays > 15 ||
      formData?.numberOfDays < 1 ||
      !formData?.location ||
      !formData?.numberOfDays ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Enter all and valid values");
      return;
    }

    const user = localStorage.getItem("user");
    if (!user) {
      setOpenLoginBox(true);
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.numberOfDays)
      .replace("{traveller}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.numberOfDays);
    // console.log(FINAL_PROMPT)

    try {
      const result = await chatSession.sendMessage({ message: FINAL_PROMPT });
      // console.log(result.text);
      setLoading(false);
      saveResponses(result.text);
    } catch (error) {
      toast(error);
    }
  };

  const saveResponses = async (tripData) => {
    setLoading(true);
    const docID = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));
    await setDoc(doc(db, "trip suggest", docID), {
      userSelectedOptions: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docID
    });
    setLoading(false);
    navigate(`/view-trip/${docID}`);
  };

  return (
    <div className="container mx-auto">
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic details and rest leave on us, Yooo!
        </p>
        <div className="mt-15 flex flex-col gap-10">
          <div>
            <h2 className="text-xl my-3 font-medium">
              Where you want to travel?{" "}
            </h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_MAP_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (p) => {
                  setPlace(p);
                  handleInputChange("location", p);
                },
              }}
            />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">How many days?</h2>
            <Input
              type={"number"}
              placeholder={"1...15"}
              onWheel={(e) => e.target.blur()}
              onChange={(e) =>
                handleInputChange("numberOfDays", e.target.value)
              }
            />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {budgetOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                    formData?.budget == item.title && "shadow-lg border-black"
                  }`}
                  onClick={() => handleInputChange("budget", item.title)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              With whom you want to travel?
            </h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {selectOptions.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                    formData?.traveller == item.people &&
                    "shadow-lg border-black"
                  }`}
                  onClick={() => handleInputChange("traveller", item.people)}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-10">
          <Button onClick={onGenerateTrip} disabled={loading}>{loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin"/> : "Generate Trip"}</Button>
        </div>
      </div>

      <Dialog open={openLoginBox}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col justify-center items-center">
                <img className="w-18 mb-3" src={Logo} alt="" />
                <h2 className="text-lg font-semibold">Sign in with Google</h2>
                <p>Sign in with the google authentication securely</p>

                <Button disabled={loading} className="w-full mt-5" onClick={login}>
                  <FcGoogle className="w-7 h-7"/> Sign in
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
