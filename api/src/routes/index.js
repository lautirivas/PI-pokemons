const { Router } = require('express');
const typesRouter = require('./types')
const pokemonsRouter = require('./pokemons') 

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const validate = (req, res, next) =>{
    const {name,img,hp,attack,defense,speed,height,weight,type} = req.body;
    if(!name) return res.status(400).json({error: "falta name"});
    if(!img) return res.status(400).json({error: "falta img"});
    if(!hp) return res.status(400).json({error: "falta hp"});
    if(!attack) return res.status(400).json({error: "falta attack"});
    if(!defense) return res.status(400).json({error: "falta defense"});
    if(!speed) return res.status(400).json({error: "falta speed"});
    if(!height) return res.status(400).json({error: "falta height"});
    if(!weight) return res.status(400).json({error: "falta weight"})
    if(type !== allTypes) return res.status(400).json({error: "falta type existente"})
    next()
} ;

router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
