import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import pokemonData, { PokemonBasicInfo } from '../src/pokemonData';

interface IndexProps {
  pokemons: PokemonBasicInfo[];
}

const index: React.FC<IndexProps> = ({pokemons}) => (
  <React.Fragment>
    <Head>
      <title>Pokemons</title>
      <link rel="stylesheet" type="text/css" href="/styles.css" />
    </Head>
    <h1>Pokemons</h1>
    <ul>
      {
        pokemons.map(pokemon => (
          <li key={pokemon.id}>
            <p>
              {pokemon.name}
              {pokemon.types.map(type=> (
                <React.Fragment key={type}>
                  {' '}
                  <Link href={`/type/${type}`}>                  
                    <a>                    
                      {type}
                    </a>
                  </Link>
                </React.Fragment>
              ))}
            </p>
          </li>
        ))
      }      
    </ul>
  </React.Fragment>
);

export const getStaticProps: GetStaticProps<IndexProps>  = async () => {
  // SOLO EN SERVER
  return {
    props: {
      pokemons: pokemonData
    },
  }
}

export default index;
