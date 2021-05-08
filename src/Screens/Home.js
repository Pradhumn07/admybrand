import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Data = ['milk', 'coffee', 'oranges', 'bread'];

const Home = () => {
  const [initilaValue, setInitilaValue] = useState(Data);
  const [inputValue, setInputValue] = useState();
  const [filters, setFilters] = useState(initilaValue);
  const AddNewFilters = () => {
    if (inputValue) {
      const tempArray = filters.map(x => x.toLocaleLowerCase());
      const isValueExist = tempArray.includes(inputValue.toLocaleLowerCase());
      if (!isValueExist) {
        setInitilaValue([...initilaValue, inputValue]);
      }
    }
    setInputValue('');
  };

  useEffect(() => {
    if (inputValue) {
      const searchValue = initilaValue.filter(x =>
        x.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()),
      );
      setFilters(searchValue);
    } else {
      setFilters(initilaValue);
    }
  }, [inputValue]);

  return (
    <View>
      <View style={styles.HeaderContainer}>
        <View style={styles.HeaderDiv}>
          <TextInput
            value={inputValue}
            onChangeText={Text => setInputValue(Text)}
            placeholder="Search"
            style={styles.Textinput}
            placeholderTextColor="#b7c4ba"
          />
          <TouchableOpacity style={styles.iconview} onPress={AddNewFilters}>
            <FontAwesome
              name="plus"
              size={25}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          data={filters}
          renderItem={({item}) => <Text style={styles.listText}>{item}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    height: 80,
    backgroundColor: '#193ee3',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  HeaderDiv: {
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Textinput: {
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
  iconview: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 50,
    height: 50,
    borderColor: 'white',
    marginLeft: 10,
  },
  icon: {
    fontWeight: '300',
  },
  listText: {
    fontSize: 20,
    padding: 10,
  },
});

export default Home;
