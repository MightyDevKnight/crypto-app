import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import cryptoStore from "../store/cryptoStore";

type RootStackParamList = {
  CryptoDetail: { baseCurrency: string; quoteCurrency: string };
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CryptoDetail"
>;

const CryptoList: React.FC = observer(() => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    cryptoStore.fetchCryptoRates();
  }, []);

  if (cryptoStore.loading) {
    return <Text>Loading...</Text>;
  }

  if (cryptoStore.error) {
    return <Text>{cryptoStore.error}</Text>;
  }

  // Filter and sort cryptoRates
  const filteredRates = cryptoStore.cryptoRates.filter((crypto) =>
    `${crypto.baseCurrency}/${crypto.quoteCurrency}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Rates</Text>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredRates}
        keyExtractor={(item) => `${item.baseCurrency}-${item.quoteCurrency}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("CryptoDetail", {
                baseCurrency: item.baseCurrency,
                quoteCurrency: item.quoteCurrency,
              })
            }
          >
            <Text>
              {item.baseCurrency}/{item.quoteCurrency}: {item.rate}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  item: {
    padding: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default CryptoList;
