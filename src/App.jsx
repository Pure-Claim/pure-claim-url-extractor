import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous states and errors
    setError(null);
    setProductData(null);
    setLoading(true); // Set loading to true when starting fetch

    if (!url || !selectedWebsite) {
      setError("Please enter a URL and select a website");
      setLoading(false); // Set loading to false on error
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
    } finally {
      setLoading(false); // Set loading to false after fetch is complete
    }
  };

  return (
    <div className="Container">
      <div className="UrlForm">
        <input
          type="url"
          placeholder="Enter product URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="InputField"
        />
        <label className="SiteLabel">
          <input
            type="radio"
            name="website"
            value="swiggy-instamart"
            checked={selectedWebsite === "swiggy-instamart"}
            onChange={(e) => setSelectedWebsite(e.target.value)}
          />
          Swiggy Instamart
        </label>
        <label className="SiteLabel">
          <input
            type="radio"
            name="website"
            value="zepto"
            checked={selectedWebsite === "zepto"}
            onChange={(e) => setSelectedWebsite(e.target.value)}
          />
          Zepto
        </label>
        <label className="SiteLabel">
          <input
            type="radio"
            name="website"
            value="amazon"
            checked={selectedWebsite === "amazon"}
            onChange={(e) => setSelectedWebsite(e.target.value)}
          />
          Amazon
        </label>
        <label className="SiteLabel">
          <input
            type="radio"
            name="website"
            value="bigbasket"
            checked={selectedWebsite === "bigbasket"}
            onChange={(e) => setSelectedWebsite(e.target.value)}
          />
          Big Basket
        </label>
        <label className="SiteLabel">
          <input
            type="radio"
            name="website"
            value="jiomart"
            checked={selectedWebsite === "jiomart"}
            onChange={(e) => setSelectedWebsite(e.target.value)}
          />
          Jio Mart
        </label>
        <label className="SiteLabel">
          <input
            type="radio"
            name="website"
            value="blinkit"
            checked={selectedWebsite === "blinkit"}
            onChange={(e) => setSelectedWebsite(e.target.value)}
          />
          Blinkit
        </label>
        <button
          type="submit"
          disabled={loading}
          className="SubmitBtn"
          onClick={handleSubmit}>
          Submit
        </button>{" "}
      </div>
      {/* Disable button during loading */}
      {loading && <p style={{ color: "blue" }}>Analyzing...</p>}{" "}
      {/* Loading state */}
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
