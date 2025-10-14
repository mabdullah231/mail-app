import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const LegalPages = () => {
  const location = useLocation();
  
  const getContent = () => {
    switch (location.pathname) {
      case '/privacy-policy':
        return {
          title: 'Privacy Policy',
          content: 'This is the privacy policy content. Update this with your actual privacy policy text...'
        };
      case '/terms-conditions':
        return {
          title: 'Terms & Conditions',
          content: 'This is the terms and conditions content. Update this with your actual terms...'
        };
      case '/user-policy':
        return {
          title: 'User Policy',
          content: 'This is the user policy content. Update this with your actual user policy...'
        };
      default:
        return { title: 'Legal', content: 'Legal content' };
    }
  };

  const { title, content } = getContent();

  return (
    <Container className="py-5">
      <Row>
        <Col lg={8} className="mx-auto">
          <h1 className="mb-4">{title}</h1>
          <div className="legal-content">
            <p>{content}</p>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            {/* Add your actual legal content here */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LegalPages;