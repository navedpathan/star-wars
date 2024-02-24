import React, { useState, useEffect } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";

function ResidentPage() {
  const [people, setPeople] = useState([]);
  const [changePage, setChangePage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${changePage}&format=json`
        );

        const peopleWithHomeworld = await Promise.all(
          response.data.results.map(async (person) => {
            const homeworldResponse = await axios.get(person.homeworld);
            return { ...person, homeworld: homeworldResponse.data.name };
          })
        );

        setPeople(peopleWithHomeworld);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchPeople();
  }, [changePage]);

  return (
    <div className="mx-5 my-10">
      {loading ? (
        <div className="text-center text-5xl font-semibold my-40">
          <BeatLoader color={"white"} loading={loading} size={50} />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
            {people.map((person, index) => (
              <Person key={index} person={person} />
            ))}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() =>
                setChangePage((prevPage) => Math.max(prevPage - 1, 1))
              }
              className="bg-red-400 text-black font-semibold text-xl p-4 mx-2 text-nowrap rounded-md"
            >
              Previous
            </button>
            <span className="flex flex-col font-semibold text-3xl mt-6">{`<< ${changePage} >>`}</span>
            <button
              onClick={() =>
                setChangePage((prevPage) => Math.min(prevPage + 1, 9))
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

function Person({ person }) {
  const personNumber = person.url.match(/\d+/)[0];
  const personImageUrl = `/people/${personNumber}.jpg`;

  return (
    <div className="border p-4 flex flex-col items-center rounded-md">
      <h2 className="text-2xl font-semibold">
        {personNumber}. {person.name}
      </h2>
      <img
        src={personImageUrl}
        alt={person.name}
        className="w-80 h-72 rounded-md my-2"
      />
      <span className="flex flex-col items-start text-lg">
        <h4>
          Height :{" "}
          <span className="text-yellow-300 font-medium">{person.height}</span>
        </h4>
        <h4>
          Mass :{" "}
          <span className="text-yellow-300 font-medium">{person.mass}</span>
        </h4>
        <h4>
          Hair Color :{" "}
          <span className="text-yellow-300 font-medium">
            {person.hair_color}
          </span>
        </h4>
        <h4>
          Skin Color :{" "}
          <span className="text-yellow-300 font-medium">
            {person.skin_color}
          </span>
        </h4>
        <h4>
          Eye Color :{" "}
          <span className="text-yellow-300 font-medium">
            {person.eye_color}
          </span>
        </h4>
        <h4>
          Birth Year :{" "}
          <span className="text-yellow-300 font-medium">
            {person.birth_year}
          </span>
        </h4>
        <h4>
          Gender :{" "}
          <span className="text-yellow-300 font-medium">{person.gender}</span>
        </h4>
        <h4>
          Homeworld :{" "}
          <span className="text-yellow-300 font-medium">
            {person.homeworld}
          </span>
        </h4>
      </span>
    </div>
  );
}

export default ResidentPage;
