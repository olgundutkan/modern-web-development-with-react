import React from "react";
class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: []
    };
  }
  componentDidMount() {
    fetch("https://reqres.in/api/users")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            users: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  render() {
    const { error, isLoaded, users } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <img src={user.avatar} width={12} height={12} alt="" />{" "}
              {user.first_name} {user.last_name}
            </li>
          ))}
        </ul>
      );
    }
  }
}
export default UsersList;
