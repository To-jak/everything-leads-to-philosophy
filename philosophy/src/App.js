import React from 'react';
import './App.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      isDisplayingPath: false,
      isGettingPath: false,
      articleName: "",
      lastSearchedArticleName: "",
      items: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
  }

  fetchPath(articleName) {

    if (articleName === "") {
      this.setState(prevState => ({
        items: [...prevState.items, "...almost everything :'("],
        isGettingPath: false
      }))
      return
    }

    if (articleName === "Philosophy") {
      this.setState({
        isGettingPath: false
      })
      return
    }

    fetch("http://127.0.0.1:5000/First_wiki_link/first_link&articleName=" + articleName)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          items: [...prevState.items, data.nextArticleName]
        }))
        this.fetchPath(data.nextArticleName)
      })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.articleName === "")
      return

    this.setState({
      items: [],
      isDisplayingPath: true,
      isGettingPath: true,
      lastSearchedArticleName: this.state.articleName
    })

    this.fetchPath(this.state.articleName)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRandom() {

    this.setState({
      items: [],
      isGettingPath: true,
    })

    fetch("https://en.wikipedia.org/w/api.php?origin=*&action=query&list=random&format=json&rnnamespace=0&rnlimit=1")
      .then(response => response.json())
      .then(data => {
        let randomArticle = data.query.random[0].title;
        this.setState(prevState => ({
          items: [...prevState.items, randomArticle],
          lastSearchedArticleName: randomArticle,
          isDisplayingPath: true
        }))
        this.fetchPath(randomArticle)
      })
      .catch(function (error) { console.log(error); });
  }

  render() {

    const itemToDisplay = this.state.items.map((item, index) => {
      return (
        <CSSTransition key={index} timeout={500} classNames="move">
          <li className={item === 'Philosophy' ? 'philosophy' : null}>{item}</li>
        </CSSTransition>
      )
    })

    return (
      <div className="App">
        <h1>(Almost) Everything leads to philosophy</h1>
        <h2>Give it a shot.</h2>
        <div className='path-selection'>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Form.Row>
                <Col>
                  <Form.Control
                    type="text"
                    value={this.state.articleName}
                    name="articleName"
                    placeholder="Article name"
                    onChange={this.handleChange}
                    size="sm"
                  />
                </Col>
                <Col>
                  <Button
                    type="submit"
                    variant="outline-light"
                    size="sm"
                    disabled={this.state.isGettingPath}>
                    Show me the path!
                  </Button>
                </Col>
              </Form.Row>
            </FormGroup>
          </Form>
          <Row>
            <Col>
              <Button
                onClick={this.handleRandom}
                variant="outline-light"
                size="sm"
                disabled={this.state.isGettingPath}>
                Random wikipedia article</Button>
            </Col>
          </Row>
        </div>
        <br></br>
        <div className='path-list'>
          {this.state.isDisplayingPath &&
            <div>
              <h3>Path to philosophy from "{this.state.lastSearchedArticleName}":</h3>
              <ul>
                <TransitionGroup>
                  {itemToDisplay}
                </TransitionGroup>
              </ul>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
