import { useEffect, useState } from "react";
import { Result } from "../interface/IArticles";
import { Alert, Container, Row, Spinner } from "react-bootstrap";
import MyArticle from "./MyArticle";

const MyMain = () => {
  const [articles, setArticles] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchArticles = () => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        console.log(data.results);
        setArticles(data.results);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Container className="my-5">
      <Row>
        <div className="text-center">
          <h2>Articoli</h2>
        </div>
      </Row>

      {loading && !error && (
        <div className="text-center my-2">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && <Alert variant="danger">Errore nel reperimento dei dati</Alert>}

      {!loading && !error && (
        <Row>
          {articles.map((article) => (
            <MyArticle key={article.id} article={article} />
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyMain;
