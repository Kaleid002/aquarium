import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image, Button, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const PRODUCT_WIDTH = (width - 40) / 3;

const PRODUCTS = [
  { id: '1', name: 'Product 1', price: 20, /*image: require()*/ },
  { id: '2', name: 'Product 2', price: 100, /*image: require()*/ },
  { id: '3', name: 'Product 3', price: 30, /*image: require()*/ },
  { id: '4', name: 'Product 4', price: 30, /*image: require()*/ },
  { id: '5', name: 'Product 5', price: 30, /*image: require()*/ },
  { id: '6', name: 'Product 6', price: 30, /*image: require()*/ },
  { id: '7', name: 'Product 7', price: 30, /*image: require()*/ },
  { id: '8', name: 'Product 8', price: 30, /*image: require()*/ },
  // 添加更多商品
];

const ShoppingScreen = ({ navigation }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const addToWareHouse = () => {
    if (selectedProduct) {
      const data = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        quantity: quantity,
        //image: selectedProduct.image
      };
      navigation.navigate('warehouse', { productDate: data });
      setSelectedProduct(null);
      setQuantity(1);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>商城</Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedProduct(item)} style={styles.productItemWrapper}>
            <View style={styles.productItem}>
              {/*<Image source={item.image} style={styles.productImage} />*/}
              <View style={{ width: 100, alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
              </View>
              <Text>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!selectedProduct} animationType="fade" supportedOrientations={['landscape']}>
        <View style={styles.modalContainer}>
          {/*<Image source={selectedProduct?.image} style={styles.productImage} />*/}
          <Text style={styles.productName}>{selectedProduct?.name}</Text>
          <Text style={styles.productPrice}>${selectedProduct?.price}</Text>
          <View style={styles.quantityContainer}>
            <Button title="-" onPress={() => setQuantity(Math.max(1, quantity - 1))} />
            <Text>{quantity}</Text>
            <Button title="+" onPress={() => setQuantity(quantity + 1)} />
          </View>
          <Button title="購買" onPress={addToWareHouse} />
          <Button title="Close" onPress={() => setSelectedProduct(null)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productList: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  productItemWrapper: {
    width: PRODUCT_WIDTH,
    marginBottom: 100,
    marginHorizontal: 5,
  },
  productItem: {
    alignItems: 'center',
    padding: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ShoppingScreen;