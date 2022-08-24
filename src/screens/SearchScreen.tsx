import React from 'react';
import {View, Platform, Text, FlatList, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
import {styles} from '../theme/appTheme';
import {useState, useEffect} from 'react';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';

const screenwidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [term, setTerm] = useState('');

  const [filteredPokemons, setfilteredPokemons] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setfilteredPokemons([]);
    }
    if (isNaN(Number(term))) {
      setfilteredPokemons(
        simplePokemonList.filter(poke =>
          poke.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setfilteredPokemons(pokemonById ? [pokemonById] : []);
    }
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
      <SearchInput
        onDebounce={value => {
          setTerm(value);
        }}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenwidth - 40,
          top: Platform.OS === 'ios' ? top : top + 10,
        }}
      />

      <FlatList
        data={filteredPokemons}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        //Header
        ListHeaderComponent={
          <Text
            style={{
              ...styles.title,
              ...styles.globalMargin,
              paddingBottom: 10,
              marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
            }}>
            {term}
          </Text>
        }
        renderItem={({item}) => (
          // <FadeInImage uri={item.picture} style={{width: 100, height: 100}} />
          <PokemonCard pokemon={item} />
        )}
      />
    </View>
  );
};
