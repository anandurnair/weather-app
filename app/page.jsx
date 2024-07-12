"use client";
import Image from "next/image";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";

export default function Home() {
  const apiKey = "ceaa83dd37822a9a84db3ca8c504926e";

  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState();
  const handleSearch = async () => {
    if (location.trim() === "") {
      alert("Invalid Location");
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}&units=metric`
      );
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <main className="w-full min-h-full h-auto  bg flex items-center px-20 overflow-x-hidden overflow-y-hidden ">
      <div className="-w-full md:w-3/6 h-screen  flex  flex-col gap-y-1 p-5 justify-center items-center">
        <img
          src={"/images/home-cloud.webp"}
          width={350}
          height={350}
          className="-mt-40"
        />
        <h2
          className="text-5xl text-slate-100 drop-shadow-md font-extrabold mb-10 -mt-10
        "
        >
          {" "}
          Weather App
        </h2>
        <h2  className="px-28 text-center  text-slate-100 drop-shadow-md font-semibold 
        ">
          Welcome to the Weather App, your ultimate companion for staying
          updated on the latest weather conditions. 
     
        </h2>
      </div>
      <div className="w-full md:w-3/6 h-full flex flex-col justify-center p-20 gap-y-4  rounded-lg">
        <div className="flex gap-5">
          <Input
            type="text"
            color=""
            variant="faded"
            className="w-full bg   rounded-lg shadow-md h-10"
            onKeyDown={handleKeyPress}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter a location"
          />
          <Button
            variant="solid"
            color=""
            className="bg-white shadow-lg"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
        {weather && (
          <div className="w-full h-auto p-5 flex justify-center items-center bg-slate-50 shadow-lg rounded-lg">
            <>
              <div className="w-full h-full flex flex-col justify-center  items-center">
                <img
                  src={`/images/${weather?.weather[0]?.main}.png`}
                  className="w-52"
                  alt=""
                />
                <p>{weather?.weather[0]?.main}</p>
                <h2 className="text-3xl">{weather?.main?.temp} c</h2>
                <h2>Feel like {weather?.main?.feels_like}</h2>
                <h2>
                  {weather?.name} , {weather?.sys?.country}
                </h2>
                <div className="w-full flex gap-2 my-5 justify-evenly h-auto">
                  <Cards
                    title="Humidity"
                    value={`${weather?.main?.humidity}%`}
                    img="/images/humidity.webp"
                  />
                  <Cards
                    title="Wind"
                    value={`${weather?.wind?.speed} m/s`}
                    img="/images/wind.png"
                  />

                  <Cards
                    title="Pressure"
                    value={`${weather?.main?.pressure} hpa`}
                    img="/images/Pressure.png"
                  />
                </div>
              </div>
              <p></p>
            </>
          </div>
        )}
      </div>
    </main>
  );
}

const Cards = ({ title, value, img }) => {
  return (
    <Card className="bg-slate-50">
      <CardBody className="flex flex-col min-w-50 w-auto px-8  gap-2 py-4 justify-center items-center">
        <Image src={img} width={40} height={40} />
        <p className="text-2xl">{value}</p>
        <h2>{title}</h2>
      </CardBody>
    </Card>
  );
};
