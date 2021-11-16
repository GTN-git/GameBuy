import React, { Component } from "react";
import { Icon, Image, Menu, Sidebar } from "semantic-ui-react";

const leftItems = [
  {
    as: "a", content: "Home", key: "home",
    icon: {
      name: "home"
    }
  },
];

const rightItems = [
  { as: "a", content: "Login", key: "login" },
  { as: "a", content: "Register", key: "register" }
];

const Search = () => {
  return (
      <div className='ui right aligned category search item'>
      <div className='ui transparent icon input'>
        <input
          className='prompt'
          type='text'
          placeholder='Search for games...'
        />
        <i className='search link icon' />
      </div>
      <div className='results' />
    </div>
  );
}

const NavbarMobile = (props) => {
  const {
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
            <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
          </Menu.Item>
          <Menu.Item onClick={onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Search />
            </Menu.Item>
            {rightItems.map((item) => (
              <Menu.Item {...item} />
            ))}
          </Menu.Menu>
        </Menu>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const NavbarDesktop = (props) => {
  const { leftItems, rightItems } = props;

  return (
    <Menu fixed="top">
      <Menu.Item>
        <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
      </Menu.Item>

      {leftItems.map((item) => (
        <Menu.Item {...item} />
      ))}

      <Menu.Menu position="right">
        <Search />
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
          </NavbarMobile>
        </Media>

        <Media greaterThan="mobile">
          <NavbarDesktop leftItems={leftItems} rightItems={rightItems} />
        </Media>
      </div>
    );
  }
}

export default Navbar;