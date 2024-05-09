import { Card, Col } from "react-bootstrap";
import { Result } from "../interface/IArticles";

interface SingleArticleProps {
  article: Result;
}

const MyArticle = (props: SingleArticleProps) => {
  return (
    <Col xs={12} md={4} className="text-center my-3">
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={props.article.image_url}
          alt={props.article.title}
          style={{ aspectRatio: "5/4" }}
        />
        <Card.Body className="d-flex flex-column align-items-start gap-2">
          <Card.Title>{props.article.title}</Card.Title>
          <Card.Text>
            {props.article.summary}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MyArticle;
