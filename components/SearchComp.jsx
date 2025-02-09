import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

const SearchComp = ({ placeholder = 'Search...', onSearch = () => {} }) => {
  const [text, setText] = useState('');

  const handleChangeText = (input) => {
    setText(input);
    onSearch(input); // Callback function to handle search logic
  };

  const handleClearText = () => {
    setText('');
    onSearch(''); // Reset search results
  };

  return (
    <ThemedView style={styles.container}>
      {/* Left side search icon */}
      <MaterialIcons name="search" size={24} color="white" style={styles.icon} />

      {/* Text input for search */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={text}
        onChangeText={handleChangeText}
      />

      {/* Right side cancel icon */}
      {text.length > 0 && (
        <TouchableOpacity onPress={handleClearText} style={styles.clearButton}>
          <Icon name="close" size={20} color="#888" />
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    height:200,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    margin: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    marginLeft: 10,
  },
});

export default SearchComp;
