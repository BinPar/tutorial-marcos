import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import pokemonData, { PokemonBasicInfo } from '../../src/pokemonData';

interface TypeProps {
  typeName: string;
  start: string;
  end: string;
  pokemons: PokemonBasicInfo[];
}

const type: React.FC<TypeProps> = ({ typeName, pokemons, start, end }) => (
  <React.Fragment>
    <Head>
      <title>{`Pokemons by type ${typeName}`}</title>
      <link rel="stylesheet" type="text/css" href="/styles.css" />
    </Head>
    <h1>{`Pokemons by type ${typeName}`}</h1>
    <p>
      <strong>Start:</strong>
      {start}
    </p>
    <p>
      <strong>End:</strong>
      {end}
    </p>
    <Link href="/">
      <a>Home</a>
    </Link>
    <ul>
      {pokemons &&
        pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <p>
              {pokemon.name}
              {pokemon.types &&
                pokemon.types.map((pokemonType) => (
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
  let allTypes = pokemonData.reduce((list: string[], pokemon) => {
    const newList = [...list];
    pokemon.types.forEach((typeName) => {
      if (!newList.includes(typeName)) {
        newList.push(typeName);
      }
    });    
    return newList;
  }, new Array<string>());  
  const removed = allTypes.pop();    
  allTypes = [];
  // eslint-disable-next-line no-console
  console.log(`Removed from the list...${removed}`);
  return {
    paths: allTypes.map((typeName) => ({ params: { type: typeName } })),
    fallback: true,
  };
};

let cnt = 0;

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }) => {
  const start = new Date().toLocaleTimeString();
  const typeName = params.type.toString();
  try  {    
    const listOfPokemons = pokemonData.filter((pokemon) =>
      pokemon.types.includes(typeName),
    );
    const firstPokemon = listOfPokemons[0].name[7].toLowerCase();
    // eslint-disable-next-line no-console
    console.log(firstPokemon);
    // eslint-disable-next-line no-console
    console.log(`Start ${typeName}`);
    // await wait(10);
    // eslint-disable-next-line no-console
    console.log(`End ${typeName}`);
    const end = new Date().toLocaleTimeString();
    return {
      notFound: listOfPokemons.length === 0,
      props: {
        typeName,
        start,
        end,
        pokemons: listOfPokemons,
      },
      revalidate: typeName === 'water' ? 60 : false,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`Error en página: ${typeName}`);
    return {
      redirect: {
        destination: `/mal?error=${encodeURIComponent(error)}&cnt=${cnt++}`,
        permanent: false,        
      },
      revalidate: 1,
    };
  }
  
};

export default type;
