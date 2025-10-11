import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Alert } from 'react-bootstrap';
import { Upload, Link, Image, Video, Save, Eye } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WysiwygEditor = ({ 
  initialContent = '', 
  onSave, 
  onPreview, 
  showPreview = true,
  showSave = true 
}) => {
  const [content, setContent] = useState(initialContent);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: () => setShowImageModal(true),
        video: () => setShowVideoModal(true)
      }
    }
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'align', 'link', 'image', 'video'
  ];

  const handleImageUpload = async () => {
    if (!imageFile && !imageUrl) return;

    setLoading(true);
    try {
      let finalUrl = imageUrl;

      if (imageFile) {
        // Upload file to server
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const response = await fetch('/api/upload/image', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          finalUrl = data.url;
        } else {
          throw new Error('Upload failed');
        }
      }

      // Insert image into editor
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'image', finalUrl);
      
      setShowImageModal(false);
      setImageUrl('');
      setImageFile(null);
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoInsert = () => {
    if (!videoUrl) return;

    // Extract YouTube video ID
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = videoUrl.match(youtubeRegex);
    
    if (match) {
      const videoId = match[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      
      // Insert video iframe
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      
      const videoHtml = `
        <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
          <iframe 
            src="${embedUrl}" 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
            frameborder="0" 
            allowfullscreen>
          </iframe>
        </div>
      `;
      
      quill.clipboard.dangerouslyPasteHTML(range.index, videoHtml);
    } else {
      alert('Please enter a valid YouTube URL');
      return;
    }

    setShowVideoModal(false);
    setVideoUrl('');
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
  };

  const handlePreview = () => {
    if (onPreview) {
      onPreview(content);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Email Template Editor</h5>
              <div>
                {showPreview && (
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    className="me-2"
                    onClick={handlePreview}
                  >
                    <Eye size={16} className="me-1" />
                    Preview
                  </Button>
                )}
                {showSave && (
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={handleSave}
                  >
                    <Save size={16} className="me-1" />
                    Save
                  </Button>
                )}
              </div>
            </Card.Header>
            <Card.Body>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                style={{ height: '400px' }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Image Upload Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Image size={20} className="me-2" />
            Insert Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Upload Image File</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <Form.Text className="text-muted">
                Supported formats: JPG, PNG, GIF (Max 2MB)
              </Form.Text>
            </Form.Group>
            
            <div className="text-center mb-3">
              <strong>OR</strong>
            </div>
            
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleImageUpload}
            disabled={loading || (!imageFile && !imageUrl)}
          >
            {loading ? 'Uploading...' : 'Insert Image'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Video Insert Modal */}
      <Modal show={showVideoModal} onHide={() => setShowVideoModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Video size={20} className="me-2" />
            Insert YouTube Video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>YouTube URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <Form.Text className="text-muted">
                Paste any YouTube video URL
              </Form.Text>
            </Form.Group>
            
            {videoUrl && (
              <Alert variant="info">
                <strong>Preview:</strong> The video will be embedded as a responsive iframe
              </Alert>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVideoModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleVideoInsert}
            disabled={!videoUrl}
          >
            Insert Video
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default WysiwygEditor;
