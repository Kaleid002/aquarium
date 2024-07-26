import { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const WareHouseScreen = ({ route }) => {
  const { productDate } = route.params;
  const  [ Products, setProducts] = useState([productDate]);

  return (
      <View style={styles.modalContainer}>
        <Text style={styles.title}>倉庫</Text>
        <FlatList
          data={Products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.ProductItem}>
              <Text>{item.name}</Text>
              <Text>數量: {item.quantity}</Text>
            </View>
          )}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ProductItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
});

export default WareHouseScreen;
