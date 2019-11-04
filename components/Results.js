import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import MovieDetail from '../components/MovieDetail';
import store from '../redux/store';

const SEARCH_QUERY = gql`
  query searchQuery($searchValue: String!, $skipValue: Int!, $paginationValue: Int!) {
    filterMovies (
      searchValue: $searchValue,
      genre: "",
      yearRange: [1980,2019],
      ratingRange: [5,10],
      sort: "-imdb", pagination: $paginationValue, skip: $skipValue ) {
      _id
      title
      poster
      imdb {
        rating
      }
    }
  }
`;

function Results(props) {
  const { query } = props;
  const pagination = 10;
  const { data, loading, error, fetchMore} = useQuery(SEARCH_QUERY, {
    variables: { 
      searchValue: query,
      skipValue: 0,
      paginationValue: pagination,
    },
  });

  const renderListEmptyComponent = () => {
    return (
      <View style={styles.centerChild}>
        <Text style={styles.title}>No results</Text>
      </View>
    );
  }

  const renderListFooterComponent = () => {
    return (
      <View style={styles.listFooter}>
        <Icon 
          reverse
          size={24}
          name="refresh"
          type="ion-icon"
          onPress={fetchMoreData}
        />
      </View>
    )
  }

  const renderDivider = () => {
    return (
      <Divider />
    );
  }

  const fetchMoreData = () => {
    const skip = store.getState().skip + pagination; // Get skip value from store and add pagination
    fetchMore({
      variables: {
        skipValue: skip,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        // No more results, return previous data
        if (!fetchMoreResult) {
          return prev;
        }
        // Assign new data to previous data, this will cause a rerender
        return Object.assign({}, prev, {
          filterMovies: [...prev.filterMovies, ...fetchMoreResult.filterMovies]
        });
      }
    });
    props.updateSkip(skip);
  }
  
  if (loading) {
    return (
      <View style={styles.centerChild}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (error) return <Text>{error.message}</Text>;

  return (
    <FlatList
    data={(data && data.filterMovies) ? data.filterMovies : []}
    renderItem={({item}) => (
        <View>
        <MovieDetail
            movieID={item._id}
            title={item.title}
            rating={item.imdb.rating}
            poster={item.poster}
            />
        </View>
    )}
    keyExtractor={(item) => item._id}
    ItemSeparatorComponent={renderDivider}
    ListFooterComponent={renderListFooterComponent}
    ListEmptyComponent={renderListEmptyComponent}
    />
  )
}

const mapDispatchToProps = dispatch => ({
  updateSkip: skipValue => dispatch({ type: 'UPDATE_SKIP', skipValue }),
});

export default connect(
  null, // Needs to be null because mapDispatchToProps always follows mapStateToProps
  mapDispatchToProps
)(Results);

const styles = StyleSheet.create({
  centerChild: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get("window").height,
    width: Dimensions.get('window').width
  },
  listFooter: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
  }
});