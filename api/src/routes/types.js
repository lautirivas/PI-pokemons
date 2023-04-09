const {Router} = require("express")
const axios = require ("axios")
const { Type } = require("../db");


const typesRouter = Router();

typesRouter.get('/', async (req, res) => {
  try {
      let apiType = await axios.get('https://pokeapi.co/api/v2/type');
      let apiTypeInfo = apiType.data;
      let types = apiTypeInfo.results.map(e => e.name);
      //console.log(types)
      
      let contador= 1;
     types.map( type=> {
        const id = contador++;
        Type.findOrCreate({
          where: {
            id : id,
            name: type,
          } 
        }); 
      });
      const allTypes = await Type.findAll();
      //console.log(allTypes);
     res.status(200).send(allTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  };
});

module.exports = typesRouter;