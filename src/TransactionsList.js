import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#eee'
  }
});

class TransactionsList extends Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.transactionNumber !== r2.transactionNumber
    });

    this.state = {
      dataSource: this.ds.cloneWithRows(props.transactions)
    };
  }

  _renderRow(transaction) {
    return (
      <View style={{height: 70, flexDirection: 'row'}}>
        { transaction.accountOwner.image ? <Image style={styles.image} source={{uri: transaction.accountOwner.image.url}}/> : <View style={styles.image} /> }
        <Text style={{fontSize: 20}}>{transaction.accountOwner.name}</Text>
      </View>
    );
  }

  render() {
    return (
        <ListView
          style={{flex: 1}}
          pageSize={10}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}/>
    )
  }
}

export default TransactionsList;
