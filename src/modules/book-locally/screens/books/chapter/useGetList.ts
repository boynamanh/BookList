import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {apiService, APIStatus, storageService} from '../../../../services';
import rx from '../../../../services/rx';

type VerseResponse = {
  id: string;
  name: string;
  select?: boolean;
};

export type BookResponse = {
  id: string;
  name: string;
  verses: VerseResponse[];
};

const UPDATE_HIGHLIGHT = 'UPDATE_HIGHLIGHT';

const useGetList = () => {
  const {name} = useRoute();
  const navi = useNavigation();
  const [data, setData] = useState<BookResponse[]>();
  const [fetching, setFetching] = useState<APIStatus>('none');
  const onSaveSelected = useCallback(async (arr?: BookResponse[]) => {
    const selected = arr
      ?.flatMap(e => e.verses)
      .filter(e => e.select)
      .map(e => e.id);
    await storageService.cacheVerseInteraction(selected ?? []);
    rx.Emiter.share().push(UPDATE_HIGHLIGHT);
  }, []);
  const onTapChapter = useCallback(
    (bookID, versesID) =>
      setData(prev => {
        const arr = prev?.map(e => {
          if (e.id === bookID) {
            e.verses.map(ee => {
              if (ee.id === versesID) {
                ee.select = !(ee.select ?? false);
              }
              return {...ee};
            });
          }
          return {...e};
        });
        onSaveSelected(arr);
        return arr;
      }),
    [onSaveSelected],
  );
  const onTapHighlight = useCallback(() => navi.navigate('Chapter'), [navi]);
  const onTap = useCallback(
    (bookID, versesID) => {
      switch (name) {
        case 'Chapter': {
          onTapChapter(bookID, versesID);
          return;
        }
        case 'Highlight': {
          onTapHighlight();
          return;
        }
        default:
          return;
      }
    },
    [name, onTapChapter, onTapHighlight],
  );
  const matchWithCache = useCallback(async (value: BookResponse[]) => {
    const result = await storageService.getCacheVerseInteraction();
    const arr = value.map(e => {
      e.verses.map(ee => {
        ee.select = result.includes(ee.id);
        return {...ee};
      });
      return {...e};
    });
    setData(arr);
  }, []);

  const requestData = useCallback(async () => {
    setFetching('fetching');
    const res = await apiService.get('list/');
    if (res.status === 'success') {
      matchWithCache((res.data as BookResponse[]) ?? []);
    }
    setFetching(res.status);
  }, [matchWithCache]);

  const syncWithCache = useCallback(() => {
    switch (name) {
      case 'Highlight': {
        requestData();
        return;
      }
      default:
        return;
    }
  }, [name, requestData]);
  rx.useSubcriber(UPDATE_HIGHLIGHT, syncWithCache);

  useEffect(() => {
    requestData();
  }, [requestData]);
  return {data, fetching, onTap, syncWithCache};
};
export default useGetList;
