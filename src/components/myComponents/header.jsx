import React, { useEffect, useState } from "react";
import Logo from "@/assets/logo1.png";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openLoginBox, setOpenLoginBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (res) => getUserProfile(res),
    onError: (err) => console.log(err),
  });

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
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container w-full flex justify-between items-center mx-auto md:px-24 px-2">
        <div className="Logo w-15">
          <img src={Logo} alt="Logo" />
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <a href="/create-trip">
                <Button variant={"outline"} className={"rounded-full"}>
                  Create Trip
                </Button>
              </a>
              <a href="/my-trips">
                <Button variant={"outline"} className={"rounded-full"}>
                  My Trips
                </Button>
              </a>

              <Popover>
                <PopoverTrigger>
                  <img
                    src={user?.picture}
                    alt=""
                    className="h-[35px] w-[35px] rounded-full cursor-pointer"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <h2 className="cursor-pointer" onClick={()=>{
                    googleLogout();
                    localStorage.clear();
                    window.location.href="/";
                  }}>Logout</h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={()=>setOpenLoginBox(true)}>Sign In</Button>
          )}
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
    </>
  );
};

export default Header;
