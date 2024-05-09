import { useEffect, useState } from "react";
import { Result } from "../interface/IArticles";
import { Container, Row } from "react-bootstrap";
import MyArticle from "./MyArticle";

const MyMain = () => {
  const [articles, setArticles] = useState<Result[]>([]);

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
      });
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

      <Row>
        {articles.map((article) => (
          <MyArticle key={article.id} article={article} />
        ))}
      </Row>
    </Container>
  );
};

export default MyMain;
