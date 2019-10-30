import React, {useState} from 'react';
import { View, SafeAreaView, FlatList, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {SearchBar, Divider } from 'react-native-elements';

const DATA = {
  "data": {
    "findMoviesBasedOnYearRange": [
      {
        "_id": "573a13f8f29313caabde8d7a",
        "title": "The Treasure",
        "plot": "Costi leads a peaceful life. At night he likes to read his 6-year-old son stories, to help him sleep. Their favourite is Robin Hood. Costi sees himself as the hero - righter of wrongs and ...",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTUzNjIyOTU1Ml5BMl5BanBnXkFtZTgwMjEzNzI2NzE@._V1_SY1000_SX677_AL_.jpg",
        "imdb": {
          "rating": "7.5"
        }
      },
      {
        "_id": "573a13d6f29313caabda10e6",
        "title": "Knight of Cups",
        "plot": "A screenwriter living in LA tries to make sense of the strange events occurring around him.",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjQyOTcwODIyNF5BMl5BanBnXkFtZTgwMDE4OTI4NzE@._V1_SY1000_SX677_AL_.jpg",
        "imdb": {
          "rating": "7.1"
        }
      },
      {
        "_id": "573a13f4f29313caabde0bfd",
        "title": "Shut In",
        "plot": "Anna suffers from agoraphobia so crippling that when a trio of criminals break into her house, she cannot bring herself to flee. But what the intruders don't realize is that agoraphobia is not her only psychosis.",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTY5MzE0MjUwNV5BMl5BanBnXkFtZTgwNjQxNzM2NzE@._V1_SY1000_SX677_AL_.jpg",
        "imdb": {
          "rating": "7.1"
        }
      },
      {
        "_id": "573a13f7f29313caabde74df",
        "title": "Dègradè",
        "plot": "A hot summer's day in the Gaza Strip. Today the electricity is on. Christine's beauty salon is heaving with female clients: a bride-to-be, a pregnant woman, a bitter divorcèe, a devout ...",
        "poster": null,
        "imdb": {
          "rating": "6.5"
        }
      },
      {
        "_id": "573a13f9f29313caabdeb527",
        "title": "Land and Shade",
        "plot": "After having left a long time ago, a humble country sugar cane worker returns home to meet his grandson and deal with the hardships his family has been put into.",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTUwZTM3M2ItZWM2Ny00ZDUwLWIzYzEtMWVmODc2NzYwODE1XkEyXkFqcGdeQXVyNjQ0NTQwNjk@._V1_SY1000_SX677_AL_.jpg",
        "imdb": {
          "rating": "7.6"
        }
      },
      {
        "_id": "573a13f0f29313caabdd969c",
        "title": "Remember",
        "plot": "The darkest chapter of the 20th century collides with a contemporary mission of revenge.",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjM3OTY3Njc1OV5BMl5BanBnXkFtZTgwNDY0MzE1NzE@._V1_SY1000_SX677_AL_.jpg",
        "imdb": {
          "rating": "7.4"
        }
      },
      {
        "_id": "573a13f2f29313caabddd3b6",
        "title": "Bang Gang (A Modern Love Story)",
        "plot": "In the well-to-do suburbs of a small town, a group of pretty average, well-adjusted sixteen and seventeen year olds are ordinary adolescents who take a singular path.",
        "poster": null,
        "imdb": {
          "rating": "6.1"
        }
      },
      {
        "_id": "573a13e9f29313caabdcc6c6",
        "title": "Equals",
        "plot": "A futuristic love story set in a world where emotions have been eradicated.",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTg3NTQ5MDU3OF5BMl5BanBnXkFtZTgwODc2Mzk5NzE@._V1_SY1000_SX677_AL_.jpg",
        "imdb": {
          "rating": "6.3"
        }
      },
      {
        "_id": "573a13f0f29313caabdda7ac",
        "title": "Mountains May Depart",
        "plot": "China, 1999. Childhood friends Liangzi and Zhang are both in love with Tao, the town beauty. Tao eventually decides to marry the wealthier Zhang. They soon have a son he names Dollar... ...",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjMwNjgyMjk1OV5BMl5BanBnXkFtZTgwMzgzNDc5NzE@._V1_SY1000_SX677_AL_.jpg",
        "imdb": {
          "rating": "6.6"
        }
      }
    ]
  }
}

function Item({title, poster, rating}) {
  return (
    <View style={styles.item}>
      <Image style={styles.itemImage} source={{uri: poster}} />
      <View style={styles.itemText}>
        <Text style={styles.itemTextTitle}>{title}</Text>
        <Text>{rating}</Text>
      </View>
    </View>
  );
}

export default function App() {
  const [search, setSearch] = useState('');

  updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
        />
      {/* Data to be rendered */}
      <FlatList
        data={DATA.data.findMoviesBasedOnYearRange}
        renderItem={({item}) => (
          <View>
            <Item 
              title={item.title}
              poster={item.poster || "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1340&q=80"}
              rating={item.imdb.rating}
              />
            <Divider />
          </View>
        )}
        keyExtractor={(item) => item._id}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    marginVertical: 16,
    marginHorizontal: 16,
    width: Dimensions.get('window').width - 32, // Subtract 2 times horizontal margin
  },
  itemImage: {
    width: 150,
    height: 225,
    marginRight: 10,
  },
  itemTextTitle: {
    fontSize: 24,
  },
});
