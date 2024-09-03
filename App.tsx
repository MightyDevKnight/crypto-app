// src/App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CryptoList from "./src/components/CryptoList";
import CryptoDetail from "./src/components/CryptoDetail";

type RootStackParamList = {
  CryptoList: undefined;
  CryptoDetail: { baseCurrency: string; quoteCurrency: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CryptoList">
        <Stack.Screen name="CryptoList" component={CryptoList} />
        <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
