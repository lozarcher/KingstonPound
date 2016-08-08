import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  TouchableHighlight
} from 'react-native';

import BusinessListItem from './BusinessListItem';

class BusinessList extends Component {

  constructor(props) {
    super(props);

    console.log('hi');

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.userName !== r2.userName
    });
    this.state = {
      dataSource: ds.cloneWithRows(props.businesses)
    };
  }

  _navigateToBusiness(business) {
    this.props.navigator.push({
      id: 'BusinessDetails',
      business
    });
  }

  _renderRow(business) {
    return <BusinessListItem business={business} businessClicked={this._navigateToBusiness.bind(this)}/>;
  }

  render() {
    return (
      <ListView
        pageSize={10}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}/>
    );
  }
}

export default BusinessList;
