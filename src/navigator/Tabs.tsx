import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Platform} from 'react-native';
import {Navigator} from './Navigator';
import Icon from 'react-native-vector-icons/Ionicons';

import {TabSearchScreen} from './TabSearch';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856d6',
        tabBarLabelStyle: {marginBottom: Platform.OS === 'ios' ? 0 : 10},
        tabBarStyle: {
          position: 'absolute',
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 80 : 60,
          backgroundColor: 'rgba(255,255,255,0.92)',
        },
      }}
      sceneContainerStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="list-outline" />
          ),
        }}
        name="Navigator"
        component={Navigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Busqueda',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="search-outline" />
          ),
        }}
        name="SearchScreen"
        component={TabSearchScreen}
      />
    </Tab.Navigator>
  );
};
