import React, { Component } from "react";
import { Container, Icon, Menu, Sidebar } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

// navbar items left
const leftItems = [
  {
    as: Link, name: "home", to:"/", content: "Home", key: "home",
    icon: {
      name: "home"
    }
  },
  {
    as: Link, name: "sell", to:"/sell", content: "Sell", key: "sell",
    icon: {
      name: "game"
    }
  },
];

// navbar for right items
const rightItems = [
  { as: Link, name: "cart", to:"/cart", content:"Cart", key: "cart",
    icon: {
      name: "cart"
    }
  }
];

// checks if logged in to dynamically display navbar
if(!Auth.loggedIn()) {
  rightItems.push({ as: Link, content: "Login", key: "login", to:"/login"},
                  { as: Link, content: "Register", key: "register", to:"/register" });
} else {
  rightItems.push({as: Link, content: "Logout", key: "logout", onClick: Auth.logout });
}

// function that returns navbar component
const NavbarMobile = (props) => {
  const {
    children,
    leftItems,
    onPusherClick,
    onToggle,
    rightItems,
    visible
  } = props;

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        items={leftItems}
        vertical
        visible={visible}
      />
      <Sidebar.Pusher
        dimmed={visible}
        onClick={onPusherClick}
        style={{ minHeight: "100vh" }}
      >
        <Menu fixed="top">
          <Menu.Item>
          <h2 className="title">GameBuy</h2>
          </Menu.Item>
          <Menu.Item onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            {rightItems.map((item) => (
              <Menu.Item {...item} />
            ))}
          </Menu.Menu>
        </Menu>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const NavbarChildren = (props) => (
  <Container style={{ paddingTop: "10em" }}>{props.children}</Container>
);

const NavbarDesktop = (props) => {
  const { leftItems, rightItems } = props;

  return (
    <Menu fixed="top">
      <Menu.Item>
      <h2 className="title">GameBuy</h2>
      </Menu.Item>

      {leftItems.map((item) => (
          <Menu.Item {...item}/>
      ))}

      <Menu.Menu position="right">
        {rightItems.map((item) => (
          <Menu.Item {...item} />
        ))}
      </Menu.Menu>
    </Menu>
  );
};

class Navbar extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });


  render() {
    const { visible } = this.state;
    const Media = this.props.Media;
    const children = this.props.children;

    return (
      <div>
        <Media at="mobile">
          <NavbarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavbarChildren>{children}</NavbarChildren>
          </NavbarMobile>
        </Media>

        <Media greaterThan="mobile">
          <NavbarDesktop leftItems={leftItems} rightItems={rightItems}/>
          <NavbarChildren>{children}</NavbarChildren>
        </Media>
      </div>
    );
  }
}

export default Navbar;