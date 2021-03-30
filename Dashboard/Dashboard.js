import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { HomePageNavBar } from "./HomePageNavBar";
import { userActions } from "../_actions";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  handleDeleteUser(id) {
    return e => this.props.deleteUser(id);
  }

  render() {
    const { users } = this.props;
    return (
      <>
        <nav>  
        <ul>  
        <li>  
        <a href="#"> Home </a>  
        </li>  
        <li>  
        <a href="#"> About </a>  
        </li>  
        <li>  
        <a href="#"> Contact </a>  
        </li>  
        <li> <a href="#"> Terms of use </a>  
        </li>  
        <li>  
        <a href="#"> Join Us </a>  
        </li>  
        </ul>  
        </nav> 
        <div className="col-md-6 col-md-offset-3">
          {users.loading && <em>Loading users...</em>}
          {users.error && (
            <span className="text-danger">ERROR: {users.error}</span>
          )}
          {users.items && (
            <ul>
              {users.items.map((user, index) => (
                <li key={user.id}>
                  {user.firstName + " " + user.lastName}
                  {user.deleting ? (
                    <em> - Deleting...</em>
                  ) : user.deleteError ? (
                    <span className="text-danger">
                      {" "}
                      - ERROR: {user.deleteError}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      - <a onClick={this.handleDeleteUser(user.id)}>Delete</a>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          <p>
            <Link to="/login">Logout</Link>
          </p>
        </div>
      </>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete
};

const connectedHomePage = connect(
  mapState,
  actionCreators
)(Dashboard);
export { connectedHomePage as Dashboard };
