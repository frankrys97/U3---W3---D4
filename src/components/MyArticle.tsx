import { Card, Col } from "react-bootstrap";
import { Result } from "../interface/IArticles";
import { useNavigate } from "react-router-dom";

interface SingleArticleProps {
  article: Result;
}

const MyArticle = (props: SingleArticleProps) => {
  const navigate = useNavigate();
  const goToDetails = () => {
    navigate(`/article/${props.article.id}`);
  };

  return (
    <Col xs={12} md={4} lg={3} className="my-3">
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={props.article.image_url}
          alt={props.article.title}
          style={{ aspectRatio: "5/4" }}
        />
        <Card.Body className="d-flex flex-column align-items-start justify-content-between">
          <Card.Title onClick={goToDetails} className="textNavigate">
            {props.article.title}
          </Card.Title>
          <Card.Text>{props.article.summary}</Card.Text>
          <p> {new Date(props.article.published_at).toLocaleString()}</p>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MyArticle;
