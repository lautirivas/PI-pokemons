const { createPokemon, getPokemonById, getAllPokemons, getPokemonByName } = require("../controllers/pokemonControllers");

const getPokemonsHandler = async (req,res) => {
    const {name} =req.query;
    const results = name ? await getPokemonByName(name) : await getAllPokemons();

    res.status(200).json(results);
}

const getPokemonHandler = async (req,res)=> {
    const {idPokemon} = req.params;
    const source = isNaN(idPokemon) ? "bdd" : "api";
    try {
        const pokemon = await getPokemonById(idPokemon, source)
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({ error:error.message });
    }
}

const createPokemonHandler = async (req,res)=> {
    const {id,name,img,hp,attack,defense,speed,height,weight,types} = req.body;
    try {
    const newPokemon = await createPokemon(id,name,img,hp,attack,defense,speed,height,weight,types)    
    res.status(201).json(newPokemon);
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getPokemonHandler,
    getPokemonsHandler,
    createPokemonHandler
}