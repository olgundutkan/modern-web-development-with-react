import React from "react";

class RenderElements extends React.Component {
  
  state = {
    users: [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
      { id: 3, name: "User 3" }
    ]
  };

  render() {
    const { users } = this.state;
    return (
      <ul>
        {users.map(user => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    );
  }
}

export default RenderElements;
