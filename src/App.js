import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  // Set the initial count state to zero, 0
  const [count, setCount] = useState(0);
  const [headline, setHeadline] = useState([
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
  ]);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Create handleIncrement event handler
  const handleIncrement = () => {
    var i =
      count + 1 < headline.length
        ? setCount((prevCount) => prevCount + 1)
        : setCount((prevCount) => (prevCount = 0));
  };

  //Create handleDecrement event handler

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${headline[count].country}&q=${headline[count].q}&catergor=${headline[count].category}&apiKey=80ba3b1ab636411e819ecdb5360a114e`
    )
      // fetch(
      //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=80ba3b1ab636411e819ecdb5360a114e`
      // )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setLoaded(true);
      });

    console.log(items);
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
