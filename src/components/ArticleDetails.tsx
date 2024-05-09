import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import { useParams } from "react-router-dom";
import { Result } from "../interface/IArticles";
import { useEffect, useState } from "react";

const MyArticleDetails = () => {
  const params = useParams();
  const [articleDetails, setArticleDetails] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchArticleDetails = () => {
    fetch(`https://api.spaceflightnewsapi.net/v4/articles/${params.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        console.log(data);
        setArticleDetails(data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchArticleDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <MyNavbar />

      <Container>
        {loading && !error && (
          <div className="text-center my-2">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {error && (
          <Alert variant="danger">Errore nel reperimento dei dati</Alert>
        )}

        {!loading && !error && (
          <Row>
            <Col xs={8} className="my-3 mx-auto">
              <img
                src={articleDetails?.image_url}
                alt={articleDetails?.title}
                style={{ width: "100%", maxHeight: "300px" }}
              />
              <h1>{articleDetails?.title}</h1>
              <p>{articleDetails?.summary}</p>
              <p>
                Data di pubblicazione:
                <span className="ms-2">
                  {articleDetails?.published_at &&
                    new Date(articleDetails?.published_at).toLocaleString(
                      "it-IT"
                    )}
                </span>
              </p>
              <p>
                Ultimo aggiornamento:
                <span className="ms-2">
                  {articleDetails?.updated_at &&
                    new Date(articleDetails?.updated_at).toLocaleString(
                      "it-IT"
                    )}
                </span>
              </p>
              <a href={articleDetails?.url} target="_blank">
                Leggi l'articolo completo
              </a>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyArticleDetails;
