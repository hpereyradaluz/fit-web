import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap'
import Gyms from './Gyms'
import Affiliates from './Affiliates'
import MapView from './MapView'
import Gym from './components/Gym'
import Affiliate from './components/Affiliate'

class BootstrapNavbar extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Router>
              <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="#home">Fitness App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="/">Gyms</Nav.Link>
                    <Nav.Link href="/affiliates">Affiliates</Nav.Link>
                    <Nav.Link href="/map">Map</Nav.Link>

                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        Action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Something
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Separated link
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Form inline>
                    <FormControl
                      type="text"
                      placeholder="Search"
                      className="mr-sm-2"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Navbar.Collapse>
              </Navbar>
              <br />
              <Switch>
                <Route exact path="/">
                  <Gyms />
                </Route>
                <Route path="/affiliates">
                  <Affiliates />
                </Route>
                <Route path="/map">
                  <MapView />
                </Route>
                <Route path="/gym/:id" component={Gym} />
                <Route path="/affiliate/:id" component={Affiliate} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    )
  }
}

export default BootstrapNavbar
