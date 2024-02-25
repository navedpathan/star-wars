import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function ResidentDetailsPage() {
  const [resident, setResident] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(false);
  const { residentId } = useParams();

  useEffect(() => {
    const fetchResident = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://swapi.dev/api/people/${residentId}`
        );
        setResident(response.data);

        const homeworldResponse = await axios.get(response.data.homeworld);
        setHomeworld(homeworldResponse.data.name);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching resident data:", error);
        setLoading(false);
      }
    };

    fetchResident();
  }, [residentId]);

  const navigateToResident = (direction) => {
    const currentResidentId = parseInt(residentId);
    if (direction === "next") {
      window.location.href = `/resident/${currentResidentId < 83 ? currentResidentId + 1 : 1}`;
    } else if (direction === "previous") {
      window.location.href = `/resident/${currentResidentId > 1 ? currentResidentId - 1 : 83}`;
    }
  };

  if (loading) {
    return (
      <div className="text-center text-5xl font-semibold my-40">
          <BeatLoader color={"white"} loading={loading} size={50} />
      </div>
    );
  }

  if (!resident) {
    return <div className="text-center mt-8">Resident not found.</div>;
  }

  const residentNumber = resident.url.match(/\d+/)[0];
  const residentImageUrl = `/people/${residentNumber}.jpg`;

  return (
    <div className="container gap-4 mx-auto my-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div className="flex justify-center items-center mx-10">
          <img
            src={residentImageUrl}
            alt={resident.name}
            className="rounded-lg mb-4"
            style={{ height: "500px", width: "500px" }}
          />
        </div>
        <div className="flex flex-col justify-center gap-4 mx-1 md:mx-10 text-xl  items-center md:items-start">
          <h2 className="text-3xl md:text-2xl lg:text-4xl font-semibold">
            {resident.name}
          </h2>
          <p className="flex gap-2">
            Height :
            <p className="font-medium text-yellow-300">{resident.height}</p>
          </p>
          <p className="flex gap-2">
            Mass :<p className="font-medium text-yellow-300">{resident.mass}</p>
          </p>
          <p className="flex gap-2">
            Hair Color :
            <p className="font-medium text-yellow-300">{resident.hair_color}</p>
          </p>
          <p className="flex gap-2">
            Skin Color :
            <p className="font-medium text-yellow-300">{resident.skin_color}</p>
          </p>
          <p className="flex gap-2">
            Eye Color :
            <p className="font-medium text-yellow-300">{resident.eye_color}</p>
          </p>
          <p className="flex gap-2">
            Birth Year :
            <p className="font-medium text-yellow-300">{resident.birth_year}</p>
          </p>
          <p className="flex gap-2">
            Gender :
            <p className="font-medium text-yellow-300">{resident.gender}</p>
          </p>
          <p className="flex gap-2">
            Homeworld :
            <p className="font-medium text-yellow-300">{homeworld}</p>
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => navigateToResident("previous")}
          className="bg-red-500 hover:bg-red-600 text-black font-semibold text-xl p-4 mx-2 text-nowrap rounded-md"
        >
          Previous
        </button>
        <span className="font-semibold text-3xl">{`<< ${residentNumber} >>`}</span>
        <button
          onClick={() => navigateToResident("next")}
          className="bg-green-500 hover:bg-green-600 text-black font-semibold text-xl p-4 mx-2 text-nowrap rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ResidentDetailsPage;
