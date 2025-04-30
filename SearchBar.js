import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native-windows";

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Search...", onSearch }) => {
    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder={placeholder}
                style={styles.input}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
            />
            <Button title="Search" onPress={handleSearch} />
        </View>
    );
};

const styles = StyleSheet.create({
    
})