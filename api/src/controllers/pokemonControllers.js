const { Pokemon, Type } = require("../db");
const axios = require('axios');

const CleanApiPokemonById = async (idPokemon) => {
  const apiPokemonPorId = [];
  const pokemonRequest = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const urlPokemonSubrequest = pokemonRequest.data.results.map((p) =>p.url);
  const infoApiPokemons = await axios.all(urlPokemonSubrequest.map(urlPokemonSubrequest => axios.get(urlPokemonSubrequest)))
  for (let i = 0; i < urlPokemonSubrequest.length; i++){
    const foundPokemons = infoApiPokemons[i].data;
    if(idPokemon == foundPokemons.id)
    apiPokemonPorId.push({
      id: foundPokemons.id,
      name: foundPokemons.name,
      img: foundPokemons.sprites.other.dream_world.front_default,
      hp: foundPokemons.stats[0].base_stat,
      attack: foundPokemons.stats[1].base_stat,
      defense: foundPokemons.stats[2].base_stat,
      speed: foundPokemons.stats[5].base_stat,
      height: foundPokemons.height,
      weight: foundPokemons.weight,
      created: false,
      types: foundPokemons.types.map((t) => t.type.name)
    })
  }
  return apiPokemonPorId;
}

const CleanApiPokemon = async () => {
      let url = 'https://pokeapi.co/api/v2/pokemon/';
      let pokemones = [];
      do {
          let info = await axios.get(url);
          let pokemonesApi = info.data;
          let auxPokemones = pokemonesApi.results.map(e => {
              return {
                  name: e.name,
                  url: e.url,
              }
          })
          pokemones.push(...auxPokemones);
          url = pokemonesApi.next;
      } while (url != null && pokemones.length < 60); 
      //ACA PUEDO LIMITARLOS A LOS QUE QUIERA TRAER
      let pokesWithData = await Promise.all(pokemones.map(async e => {
          let pokemon = await axios.get(e.url);
          return {
            id: pokemon.data.id,
            name: pokemon.data.name,
            img: pokemon.data.sprites.other.home.front_default,
            hp: pokemon.data.stats[0].base_stat,
            attack: pokemon.data.stats[1].base_stat,
            defense: pokemon.data.stats[2].base_stat,
            speed: pokemon.data.stats[5].base_stat,
            height: pokemon.data.height,
            weight: pokemon.data.weight,
            types: pokemon.data.types.map((t) => t.type.name)     
          }
      }));
      // console.log(pokesWithData);
      return pokesWithData;
  }
    

const createPokemon = async (id,name,img,hp,attack,defense,speed,height,weight,types) => {
    return await Pokemon.create({ id,name,img,hp,attack,defense,speed,height,weight,types })
}
const getPokemonById = async (idPokemon, source) => {
    if (source === "bdd") {
       return await Pokemon.findByPk(idPokemon) ;
    } else {
       return await CleanApiPokemonById(idPokemon);
    }
}

const getAllPokemons= async () =>{
    const bddPokemons = await Pokemon.findAll();
    const apiPokemons = await CleanApiPokemon()
    return [...bddPokemons, ...apiPokemons];
};

const getPokemonByName= async (name)=>{
  const bdd= await Pokemon.findAll({where:{name:name}});
  const apiSinFilter= await CleanApiPokemon();
  const api = apiSinFilter.filter((poke) => poke.name === name)
  return [...bdd,...api]
};


module.exports = {createPokemon, getPokemonById, getAllPokemons, getPokemonByName};