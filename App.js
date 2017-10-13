
import React, { Component } from 'react';
import {
  Platform,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const REQUEST_URL = 'https://the-best-scotch.herokuapp.com/scotch'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
    marginBottom: 5,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
})

export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    }
  }

componentDidMount(){
  this.fetchData();
}

fetchData() {
  fetch(REQUEST_URL)
    .then((response)=> response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true,
      });
    })
    .done();
}

  render() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderScotch}
        style={styles.listView}
        />
    );
  }

  renderLoadingView(){
    return (
      <View style={styles.container}>
        <Text>Loading Scotch...</Text>
      </View>
    );
  }

  renderScotch(scotch){
    return (
      <View style={styles.container}>
        <Image
          source={{uri: scotch.url}}
          style={styles.thumbnail}
           />
         <View style={styles.rightContainer}>
           <Text style={styles.title}>{scotch.name}</Text>
           <Text style={styles.year}>{scotch.region}</Text>
           <Text style={styles.year}>{scotch.flavor}</Text>
         </View>
      </View>
    );
  }

  }
