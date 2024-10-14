import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // clear previous states and errors
    setError(null);
    setProductData(null);

    if (!url || !selectedWebsite) {
      setError("Please enter a URL and select a website");
      return;
    }

    try {
      const response = await fetch(
        `https://pure-claim-url-extractor.vercel.app/extract?url=${encodeURIComponent(
          url
        )}&website=${selectedWebsite}`
      );
      const data = await response.json();
      if (response.ok) {
        // Store the extracted data in state
        setProductData(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="url"
            placeholder="Enter product URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="website"
              value="amazon"
              checked={selectedWebsite === "amazon"}
              onChange={(e) => setSelectedWebsite(e.target.value)}
            />
            Amazon
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="website"
              value="flipkart"
              checked={selectedWebsite === "flipkart"}
              onChange={(e) => setSelectedWebsite(e.target.value)}
            />
            Flipkart
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="website"
              value="bigbasket"
              checked={selectedWebsite === "bigbasket"}
              onChange={(e) => setSelectedWebsite(e.target.value)}
            />
            Big Basket
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              name="website"
              value="jiomart"
              checked={selectedWebsite === "jiomart"}
              onChange={(e) => setSelectedWebsite(e.target.value)}
            />
            Jio Mart
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {productData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Extracted Product Data:</h3>
          <p>
            <strong>Product Title:</strong> {productData.productTitle}
          </p>
          <p>
            <strong>Ingredients:</strong> {productData.ingredientsText}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
