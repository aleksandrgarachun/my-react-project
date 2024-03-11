// src/components/App.jsx


import ArticleList from "./ArticleList.jsx";
import { fetchArticlesWithTopic } from "./articles-api.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Article from "./Article.jsx";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import SearchForm from "./SearchForm.jsx";

const App = () => {
	const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  

	const handleSearch = async (topic) => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <Error />}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};



export default App;


/*// src/components/App.jsx


import ArticleList from "./ArticleList.jsx";
import { fetchArticlesWithTopic } from "../articles-api.js";
import { useEffect, useState } from "react";
import axios from "axios";


const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://hn.algolia.com/api/v1/search?query=react"
        );
        setArticles(response.data.hits);
      } catch (error) {
				// Встановлюємо стан error в true
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);


  return (
    <div>
      <h1>Latest articles</h1>
      {loading && <p>Loading data, please wait...</p>}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};



export default App; */