import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  // Set the initial count state to zero, 0
  const [count, setCount] = useState(0);

  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const headline = [
    { title: "Headlines in the US ", country: "us", category: "", q: "" },

    { title: "BBC News Headlines ", country: "us", category: "", q: "cnn" },
    {
      title: "Business Headlines from Germany ",
      country: "gr",
      category: "business",
      q: "",
    },
    {
      title: " Top Trump Headlines",
      country: "us",
      category: "",
      q: "trump",
    },
  ];
  // Create handleIncrement event handler
  const handleIncrement = () => {
    // var i =
    count + 1 < headline.length
      ? setCount((prevCount) => prevCount + 1)
      : setCount((prevCount) => (prevCount = 0));
  };

  useEffect(() => {
    const getData = async () => {
      const headline = [
        { title: "Headlines in the US ", country: "us", category: "", q: "" },

        { title: "BBC News Headlines ", country: "us", category: "", q: "cnn" },
        {
          title: "Business Headlines from Germany ",
          country: "gr",
          category: "business",
          q: "",
        },
        {
          title: " Top Trump Headlines",
          country: "us",
          category: "",
          q: "trump",
        },
      ];

      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${headline[count].country}&q=${headline[count].q}&catergor=${headline[count].category}&apiKey=80ba3b1ab636411e819ecdb5360a114e`
      );
      const data = await response.json();
      setItems(data);
      setLoaded(true);
    };

    getData();
  }, [count]);

  if (!loaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        <div className="row mb-5 mt-5">
          <div className="col-md-6">
            <span>{headline[count].title}</span>
          </div>
          <div className="col-md-6">
            <button onClick={handleIncrement} className="btn btn-primary ">
              Change
            </button>
          </div>
        </div>

        <div>
          {items.articles.map((item) => (
            <div className="responsive" key={item.urlToImage}>
              <div className="gallery">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.urlToImage}
                >
                  <img src={item.urlToImage} alt={item.title} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
