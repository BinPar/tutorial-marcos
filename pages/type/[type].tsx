import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { stdout } from 'process';
import pokemonData, { PokemonBasicInfo } from '../../src/pokemonData';

interface TypeProps {
  typeName: string;
  pokemons: PokemonBasicInfo[];
}

const type: React.FC<TypeProps> = ({ typeName, pokemons }) => (
  <React.Fragment>
    <Head>
      <title>
        Pokemons by type
        {' '}
        {typeName}
      </title>
      <link rel="stylesheet" type="text/css" href="/styles.css" />
    </Head>
    <h1>
      Pokemons by type
      {' '}
      {typeName}
    </h1>
    <Link href="/">
      <a>Home</a>
    </Link>
    <ul>
      {pokemons && pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <p>
            {pokemon.name}
            {pokemon.types && pokemon.types.map((pokemonType) => (
              <React.Fragment key={pokemonType}>
                {' '}
                <Link href={`/type/${pokemonType}`}>
                  <a>{pokemonType}</a>
                </Link>
              </React.Fragment>
            ))}
          </p>
        </li>
      ))}
    </ul>
  </React.Fragment>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const allTypes = pokemonData.reduce((list: string[], pokemon) => {
    const newList = [...list];
    pokemon.types.forEach((typeName) => {
      if (!newList.includes(typeName)) {
        newList.push(typeName);
      }
    });
    return newList;
  }, new Array<string>());
  // eslint-disable-next-line no-console
  console.log(`*******${allTypes.pop()}`);
  return {
    paths: allTypes.map((typeName) => ({ params: { type: typeName } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }) => {
  const typeName = params.type.toString();
  const listOfPokemons = pokemonData.filter((pokemon) =>
    pokemon.types.includes(typeName),
  );
  return {
    notFound: listOfPokemons.length === 0,
    props: {
      typeName,
      pokemons: listOfPokemons,      
    },
    revalidate: 10, 
  };
};

export default type;
