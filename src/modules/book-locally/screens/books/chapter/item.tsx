import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {BookResponse} from './useGetList';

type Prop = {
  data: BookResponse;
  onTap: (bookID: string, versesID: string) => void;
};

const Item: React.FC<Prop> = React.memo(({data, onTap}) => {
  const bgColor = (state?: boolean) => ({
    backgroundColor: state ? 'orange' : 'white',
  });
  return (
    <>
      <Text style={styles.name}>{data.name}</Text>
      {data.verses.map(child => (
        <TouchableOpacity
          onPress={() => onTap(data.id, child.id)}
          key={child.id}>
          <Text key={child.id} style={[styles.verses, bgColor(child.select)]}>
            {child.name}
          </Text>
        </TouchableOpacity>
      ))}
      <View style={styles.divider} />
    </>
  );
});

const styles = StyleSheet.create({
  name: {
    padding: 8,
    margin: 8,
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  verses: {
    borderRadius: 4,
    overflow: 'hidden',
    padding: 12,
    textAlignVertical: 'center',
    marginHorizontal: 8,
    marginBottom: 8,
    color: 'gray',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 2,
    marginHorizontal: 16,
    backgroundColor: 'gray',
  },
});

export default Item;
