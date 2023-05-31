import { useState, useEffect } from "react";

export default function App() {
  const [place, setPlace] = useState();
  const [submit, setSubmit] = useState(0);
  const [output, setOutput] = useState("Try Something...");

  useEffect(() => {
    if (!place) return;
    let z = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_SECRET}&query=${place}`;
    console.log(z);
    fetch(z)
      .then((response) => response.json())
      .then((data) => {
        if (!data["current"]) {
          setOutput("Entered Location is Out of Range of Server...");
        } else {
          setOutput(
            `It's Currently ${data["current"]["temperature"]} degrees out and there is ${data["current"]["humidity"]}% Humidity in  ${data["location"]["name"]}, ${data["location"]["region"]}, ${data["location"]["country"]} with latitude ${data["location"]["lat"]} and longitude ${data["location"]["lon"]}.`
          );
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, [submit]);

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
        fontSize: "20px",
      }}
      className="App"
    >
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Location"
        onChange={(event) => setPlace(event.target.value)}
      />

      <button
        onClick={() => {
          if (place) {
            setOutput("Fetching....");
            setSubmit(1 - submit);
          } else setOutput("Please!!! Enter Valid Location");
        }}
        type="button"
      >
        Search
      </button>

      {output && <h2>{output}</h2>}
    </div>
  );
}
