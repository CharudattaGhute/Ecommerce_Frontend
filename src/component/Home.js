import React from "react";
import { Carousel, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <Container fluid className="p-0">
      <Carousel controls={false} interval={900} indicators={false}>
        <Carousel.Item>
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src="https://media.istockphoto.com/id/458066987/photo/rolex-deepsea-wristwatch.jpg?s=612x612&w=0&k=20&c=T3frhDuFQw9YvmuPd0GeK_Ka5NlEFlCmqtWrJtI7beA="
              alt="First slide"
              style={{ height: "100vh", objectFit: "cover" }}
            />
            <div className="custom-lines"></div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src="https://w0.peakpx.com/wallpaper/198/882/HD-wallpaper-rolex-oyster-perpetual-rolex-deepsea-rolex.jpg"
              alt="Second slide"
              style={{ height: "100vh", objectFit: "cover" }}
            />
            <div className="custom-lines"></div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-image">
            <img
              className="d-block w-100"
              src="https://mrwallpaper.com/images/hd/rolex-hd-watch-closeup-8vjs3wkmab3b9zs1.jpg"
              alt="Third slide"
              style={{ height: "100vh", objectFit: "cover" }}
            />
            <div className="custom-lines"></div>
          </div>
        </Carousel.Item>
      </Carousel>

      <Container fluid className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <Row className="text-center py-4">
          <Col md={6} className="d-flex justify-content-center">
            <img
              src="https://via.placeholder.com/400x300"
              alt="Info Image"
              className="img-fluid"
            />
          </Col>
          <Col md={6}>
            <h2>Information Title</h2>
            <p>
              This is some information that you want to display below the
              carousel. You can add more details, descriptions, and other
              relevant content here.
            </p>
          </Col>
        </Row>
      </Container>

      <style jsx="true">{`
        .carousel-image {
          position: relative;
        }

        .custom-lines {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .custom-lines::before,
        .custom-lines::after {
          content: "";
          width: 60px;
          height: 3px;
          background-color: white;
          margin: 5px 0;
        }

        .custom-lines {
          width: 60px;
          height: 3px;
          background-color: white;
          margin: 5px 0;
        }

        .container-fluid {
          padding-left: 0;
          padding-right: 0;
        }
      `}</style>
    </Container>
  );
};

export default Home;
