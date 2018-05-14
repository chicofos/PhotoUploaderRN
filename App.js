import React, { Component } from 'react';
import { Root, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { Font, AppLoading } from "expo";
import theme from './components/myTheme';
import IndexComponent from './components/Index/IndexComponent';
import CameraComponent from './components/Camera/CameraComponent';
import PhotoComponent from './components/Photo/PhotoComponent.js';

export default class AnatomyExample extends Component {

  //Hack for Expo font issues
    constructor(props) {
      super(props);
      this.state = { loading: true, view : 0};
    }

    async componentWillMount() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
        Ionicons: require("native-base/Fonts/Ionicons.ttf")
      });
      this.setState({ loading: false });
    }
  //----------------------------------

  render() {

    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }

    var currentView;
    if (this.state.view === 0) {
      currentView = <IndexComponent />
    } else if (this.state.view === 1) {
      currentView = <CameraComponent />
    }else{
      currentView = <PhotoComponent />
    }

    return (
      <Container style={{ paddingTop: Expo.Constants.statusBarHeight }}>
        <Header style={theme.background}>
          <Left style={theme.alignMenu}/>
          <Body >
            <Title>Uploader </Title>
          </Body>
          <Right style={theme.alignMenu}/>
        </Header>
        <Content>
          {currentView}
        </Content>
        <Footer >
          <FooterTab style={ theme.background }>
            <Button vertical onPress={() => { this.setState({ view: 1 }) }}>
              <Icon name="camera" type="FontAwesome"/>
              <Text>Camera</Text>
            </Button>
            <Button vertical onPress={() => { this.setState({ view: 0 }) }}>
              <Icon name="home" type="FontAwesome"/>
              <Text>Home</Text>
            </Button>
            <Button onPress={()=> { this.setState({view: 2})}}>
              <Icon name="photo" type="FontAwesome"/>
              <Text>Images</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}