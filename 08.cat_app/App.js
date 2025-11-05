function App() {
  const [catUrl, setCatUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const fetchCat = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search");
      const data = await response.json();
      setCatUrl(data[0].url); // API returns an array
    } catch (error) {
      console.error("Error fetching cat image:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a cat on initial load
  React.useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div>
      <h1>Random Cat Images 🐱</h1>
      <button onClick={fetchCat}>{loading ? "Loading..." : "New Cat"}</button>
      {catUrl && <img src={catUrl} alt="Random Cat" />}
    </div>
  );
}
