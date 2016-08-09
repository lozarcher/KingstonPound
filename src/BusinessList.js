import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

import BusinessListItem from './BusinessListItem';

const styles = StyleSheet.create({
});

class BusinessList extends Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.userName !== r2.userName
    });

    this.state = {
      dataSource: this.ds.cloneWithRows(props.businesses)
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

  _filterList(text) {
    const contains = (a, b) =>
      a.toLowerCase().indexOf(b.toLowerCase()) !== -1;

    const filtered = this.props.businesses.filter(b => contains(b.name, text));

    this.setState({
      dataSource: this.ds.cloneWithRows(filtered)
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: 'gray'}}>
          <TextInput placeholder='search'
            style={{height: 30, margin: 10, backgroundColor: 'white'}}
            onChangeText={this._filterList.bind(this)}/>
        </View>
        <ListView
          style={{flex: 1}}
          pageSize={10}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}/>
      </View>
    )
  }
}

export default BusinessList;
