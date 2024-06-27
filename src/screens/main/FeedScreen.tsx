import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {ImageItem} from '../../components/ImageItem';
import {useDataImageItemFetch} from '../../utils/useDataImageItemFetch';
import {Error} from '../../theme/infoMessages';
import {colors} from '../../theme/constants';

export const FeedScreen = () => {
  const [page, setPage] = useState(1);
  const {response, refetch, isError, isLoading} = useDataImageItemFetch(
    'list',
    `${page}`,
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
      .then(() => {
        setRefreshing(false);
        setPage(prevPage => prevPage + 1);
      })
      .catch(() => {
        setRefreshing(false);
      });
  }, [refetch]);

  if (isError) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={response}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ImageItem source={item.download_url} author={item.author} />
        )}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading && !refreshing ? <ActivityIndicator /> : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 35,
    backgroundColor: colors.white,
  },
});
