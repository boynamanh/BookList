import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Item from './Item';
import Chapter from '../books/chapter';
import {icon} from '../../common/assets/images';

type TabbarList = {
  Chapter: undefined;
  Highlight: undefined;
};

type ScreenProps = {
  name: keyof TabbarList;
  title: string;
  component: any;
  icon: ImageSourcePropType;
};

const screens: ScreenProps[] = [
  {
    name: 'Chapter',
    title: 'book-locally.title.chapter',
    component: Chapter,
    icon,
  },
  {
    name: 'Highlight',
    title: 'book-locally.title.verses',
    component: Chapter,
    icon,
  },
];

const Tab = createBottomTabNavigator<TabbarList>();
const Tabbar = () => {
  return (
    <>
      <Tab.Navigator initialRouteName="Chapter">
        {screens.map(screen => (
          <Tab.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              tabBarIcon: ({color}) => (
                <Item icon={screen.icon} color={color} />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default Tabbar;
