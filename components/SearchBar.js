import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Feather  from 'react-native-vector-icons/Feather';

const SearchBar = ({ term, onTermChange, onTermSubmit,textChanged }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search artists"
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
        // onChange={textChanged}
      />
      {/* <Feather name="search" style={styles.iconStyle} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 40,
    backgroundColor: '#F0EEEE',
    height: 40,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 10
  },
  inputStyle: {
    flex: 1,
    // marginTop:10
    fontSize: 18
  },
  iconStyle: {
    fontSize: 20,
    alignSelf: 'center',
    marginHorizontal: 15
  }
});

export default SearchBar;
