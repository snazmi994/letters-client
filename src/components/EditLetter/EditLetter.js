import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import { editLetter } from '../../api/letter'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class EditLetter extends Component {
  constructor () {
    super()

    this.state = {
      letter: {
        title: '',
        body: ''
      }
    }
  }

  componentDidMount () {
    this.props.onEditLetterModalShow()
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history, user } = this.props
    const { id } = this.props.match.params

    editLetter(this.state, user, id)
      .then(res => {
        this.setState({ letter: res.data.letter })
      })
      .then(() =>
        msgAlert({
          heading: 'Edit post success',
          message: messages.editLetterSuccess,
          variant: 'success'
        }))
      .then(() => history.push('/letters'))
      .catch(error => {
        this.setState({ title: '', body: '' })
        msgAlert({
          heading: 'Edit post failed with error: ' + error.message,
          message: messages.editLetterFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { title, body } = this.state
    return (
      <div>
        <Modal show={this.props.editLetterModal} onHide={this.props.onEditLetterModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Your Letter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm-10 col-md-8 mx-auto mt-5">
                <h3>Actually..</h3>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="title">
                    <Form.Label>who is this addressed to..</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="title"
                      value={title}
                      placeholder="Dear"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="body">
                    <Form.Label>edit note below</Form.Label>
                    <Form.Control
                      required
                      name="body"
                      value={body}
                      type="textarea"
                      placeholder="...?"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default withRouter(EditLetter)
