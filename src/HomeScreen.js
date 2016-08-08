import React, { Component } from 'react';
import { Text, Navigator } from 'react-native';
import BusinessList from './BusinessList';

export default class HomeScreen extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Awesome Scene', index: 0 }}
        renderScene={(route, navigator) =>
          <BusinessList businesses={this.props.businesses}/>
        }
        style={{padding: 0}}
      />
    );
  }
}
