// Sidebar.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const Sidebar = ({ navigation }) => (
  <DrawerContentScrollView>
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  </DrawerContentScrollView>
);

export default Sidebar;
