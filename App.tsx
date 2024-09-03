// src/App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type RootStackParamList = {
  CryptoList: undefined;
  CryptoDetail: { baseCurrency: string; quoteCurrency: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CryptoList">
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
