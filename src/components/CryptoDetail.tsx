import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useRoute } from "@react-navigation/native";
import cryptoStore from "../store/cryptoStore";

type RootStackParamList = {
  CryptoDetail: { baseCurrency: string; quoteCurrency: string };
};

const CryptoDetail: React.FC = observer(() => {
  const route = useRoute();
  const { baseCurrency, quoteCurrency } =
    route.params as RootStackParamList["CryptoDetail"];

  const crypto = cryptoStore.cryptoRates.find(
    (c) =>
      c.baseCurrency.toLowerCase() === baseCurrency.toLowerCase() &&
      c.quoteCurrency.toLowerCase() === quoteCurrency.toLowerCase()
  );

  if (!crypto) {
    return <Text>Crypto not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {crypto.baseCurrency}/{crypto.quoteCurrency} Details
      </Text>
      <Text>Rate: {crypto.rate}</Text>
      <Text>Ask: {crypto.ask}</Text>
      <Text>Bid: {crypto.bid}</Text>
      <Text>24h Diff: {crypto.diff24h}</Text>
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
});

export default CryptoDetail;
