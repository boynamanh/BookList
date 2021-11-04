import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import Tabbar from '../tabbar';

type StackList = {
  Tabbar: undefined;
};

export type ScreenProps = {
  name: keyof StackList;
  title: string;
  component: React.ComponentType<any>;
};

const screens: ScreenProps[] = [
  {
    name: 'Tabbar',
    title: 'book-locally.title.tabbar',
    component: Tabbar,
  },
];

const Stack = createStackNavigator<StackList>();
const Root = () => {
  const {t} = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabbar">
        {screens.map(screen => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              title: t(screen.title),
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
