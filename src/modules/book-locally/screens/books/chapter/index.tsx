import React, {useCallback, useMemo} from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useGetList from './useGetList';
import Item from './item';
import {useRoute} from '@react-navigation/native';

const Chapter = () => {
  // MARK: - Hooks
  const {t} = useTranslation();
  const {name} = useRoute();
  const {data, fetching, onTap} = useGetList();
  const inset = useSafeAreaInsets();
  const dataSource = useMemo(() => {
    switch (name) {
      case 'Chapter':
        return data ?? [];
      case 'Highlight':
        return (
          data
            ?.map(e => {
              e.verses = e.verses.filter(ee => ee.select);
              return {...e};
            })
            .filter(e => e.verses.length > 0) ?? []
        );
      default:
        return [];
    }
  }, [data, name]);
  const renderItem = useCallback(
    item => <Item data={item.item} onTap={onTap} />,
    [onTap],
  );
  // MARK: - Views
  if (fetching === 'fetching') {
    return <ActivityIndicator style={styles.indicator} />;
  }
  if (dataSource.length === 0) {
    return (
      <View style={styles.errorText}>
        <Text>{t('book-locally.common.emptyData')}</Text>
      </View>
    );
  }
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: inset.bottom}}
      horizontal={false}
      style={styles.list}
      data={dataSource}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  indicator: {
    flex: 1,
  },
  errorText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chapter;
