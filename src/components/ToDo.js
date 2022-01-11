import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ToDo = (props) => {
   return (
     <>
       <div>
        <Form>
          <Row>
            <Col lg={true}><Form.Control type="text" placeholder="Your task!" /></Col>
            <Col md="auto"><Button variant="primary" name="add" type="submit">Add</Button></Col>
          </Row>
        </Form>
       </div>

       <div>
        <Form>
          <Row>
            <Col md="auto"><Form.Check aria-label="option 1" /></Col>
            <Col lg={true}><Form.Control type="text" placeholder="Your task!" disabled/></Col>
            <Col md="auto"><Button variant="primary" name="edit" type="submit">Edit</Button></Col>
            <Col md="auto"><Button variant="primary" name="delete" type="submit">Delete</Button></Col>
          </Row>
        </Form>
       </div>

       <div>
        <Form>
          <Row>
            <Col lg={true}><Form.Control type="text" placeholder="Edit your task!"/></Col>
            <Col md="auto"><Button variant="primary" name="save" type="submit">Save</Button></Col>
            <Col md="auto"><Button variant="primary" name="cancel" type="submit">Cancel</Button></Col>
          </Row>
        </Form>
       </div>
    </>
   );
};

export default ToDo;
