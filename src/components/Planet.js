import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function PlanetPage() {
  const [planets, setPlanets] = useState([]);
  const [changePlanet, setChangePlanet] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://swapi.dev/api/planets/?page=${changePlanet}&format=json`
        );
        setPlanets(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchPlanets();
  }, [changePlanet]);

  return (
    <div className="mx-5 my-10">
      {loading ? (
        <div className="text-center text-5xl font-semibold my-40">
          <BeatLoader color="white" loading={loading} size={50} />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
            {planets.map((planet, index) => (
              <Planet key={index} planet={planet} planetNumber={index + 1} />
            ))}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() =>
                setChangePlanet(changePlanet > 1 ? changePlanet - 1 : 1)
              }
              className="bg-red-400 text-black font-semibold text-xl p-4 mx-2 text-nowrap rounded-md"
            >
              Previous
            </button>
            <span className="flex flex-col font-semibold text-3xl mt-6">
              {`<< ${changePlanet} >>`}
            </span>
            <button
              onClick={() =>
                setChangePlanet(changePlanet < 6 ? changePlanet + 1 : 6)
              }
              className="bg-green-500 text-black font-semibold text-xl p-4 mx-2 text-nowrap rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Planet({ planet }) {
  const planetNumber = planet.url.match(/\d+/)[0];
  const planetImageUrl = `/planets/images${planetNumber}.jpg`;

  const [residents, setResidents] = useState([]);
  const [loadingResidents, setLoadingResidents] = useState(false);

  const fetchResident = useCallback(async (residentUrl) => {
    try {
      const response = await axios.get(residentUrl);
      const {
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
        homeworld,
        url,
      } = response.data;
      return {
        name,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year,
        gender,
        homeworld,
        url,
      };
    } catch (error) {
      console.error("Error fetching resident data:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchResidents = async () => {
      setLoadingResidents(true);
      const residentsData = await Promise.all(
        planet.residents.map(async (residentUrl) => fetchResident(residentUrl))
      );
      setResidents(residentsData.filter((resident) => resident !== null));
      setLoadingResidents(false);
    };

    fetchResidents();
  }, [planet.residents, fetchResident]);

  return (
    <div className="border p-4 flex flex-col items-center rounded-md">
      <h2 className="text-2xl font-semibold">
        {planetNumber}. {planet.name}
      </h2>
      <img
        src={planetImageUrl}
        alt={planet.name}
        className="w-80 h-72 rounded-md my-2"
      />
      <span className="flex flex-col items-start">
        <h4>
          Rotaional Period:{" "}
          <span className="text-yellow-300 font-medium">
            {planet.rotation_period}
          </span>
        </h4>
        <h4>
          Orbital Period:{" "}
          <span className="text-yellow-300 font-medium">
            {planet.orbital_period}
          </span>
        </h4>
        <h4>
          Diameter:{" "}
          <span className="text-yellow-300 font-medium">{planet.diameter}</span>
        </h4>
        <h4>
          Climate:{" "}
          <span className="text-yellow-300 font-medium">{planet.climate}</span>
        </h4>
        <h4>
          Gravity:{" "}
          <span className="text-yellow-300 font-medium">{planet.gravity}</span>
        </h4>
        <h4>
          Terrain:{" "}
          <span className="text-yellow-300 font-medium">{planet.terrain}</span>
        </h4>
        <h4>
          Surface Water:{" "}
          <span className="text-yellow-300 font-medium">
            {planet.surface_water}
          </span>
        </h4>
        <h4>
          Population:{" "}
          <span className="text-yellow-300 font-medium">
            {planet.population}
          </span>
        </h4>
        <details>
          <summary className="font-medium text-cyan-400 cursor-pointer">
            Residents :
          </summary>
          {loadingResidents ? (
            <ul className="text-yellow-500 flex flex-col items-start cursor-pointer">
              <li>Loading residents...</li>
            </ul>
          ) : residents.length === 0 ? (
            <p className="text-red-400">No resident live on this planet</p>
          ) : (
            <ul className="text-yellow-500 flex flex-col items-start cursor-pointer">
              {residents.map((resident, index) => (
                <li key={index}>
                  <Link to={`/resident/${resident.url.match(/\d+/)[0]}`}>
                    {resident.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </details>
      </span>
    </div>
  );
}

export default PlanetPage;
