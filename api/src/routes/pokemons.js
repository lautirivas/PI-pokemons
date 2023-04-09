const { Router } = require("express");
const { createPokemonHandler, getPokemonHandler, getPokemonsHandler } = require("../handlers/pokemonsHandlers");

const pokemonsRouter = Router();
const validate = (req, res, next) =>{
    const {name,img,hp,attack,defense,speed,height,weight,types} = req.body;
 'normal',   'fighting', 'flying',
  'poison',   'ground',   'rock',  
  'bug',      'ghost',    'steel', 
  'fire',     'water',    'grass', 
  'electric', 'psychic',  'ice',   
  'dragon',   'dark',     'fairy', 
  'unknown',  'shadow'
    if(!name) return res.status(400).json({error: "falta name"});
    if(!img) return res.status(400).json({error: "falta img"});
    if(!hp) return res.status(400).json({error: "falta hp"});
    if(!attack) return res.status(400).json({error: "falta attack"});
    if(!defense) return res.status(400).json({error: "falta defense"});
    if(!speed) return res.status(400).json({error: "falta speed"});
    if(!height) return res.status(400).json({error: "falta height"});
    if(!weight) return res.status(400).json({error: "falta weight"})
    // if(types !== "normal"|| "fighting"|| "flying"||
    // "poison"||   "ground"||   "rock"||  
    // "bug"||      "ghost"||    "steel"||
    // "fire"||     "water"||    "grass"|| 
    // "electric"|| "psychic"||  "ice"||   
    // "dragon"||   "dark"||     "fairy"|| 
    // "unknown"||  "shadow") return res.status(400).json({error: "falta type existente"});
    next()
} ;

pokemonsRouter.get("/", getPokemonsHandler)

pokemonsRouter.get("/:idPokemon", getPokemonHandler);

pokemonsRouter.post("/",validate, createPokemonHandler);
 
module.exports = pokemonsRouter;