const { response, request } = require("express");
const { Pictogram, PictogramSynonym, PictogramCategory, Storage } = require("../models/index");

/**
 * FUNCION PARA OBTENER UN PICTOGRAMA
 * @param {*} req 
 * @param {*} res 
 */
const pictogramGet = async (req = request, res = response) => {
  const { limit = 1000, offset = 0 } = req.query;
  const query = { state: true };
  try {
    const [length, pictogram] = await Promise.all([
      Pictogram.count({ where: query }),
      Pictogram.findAll({
        where: query,
        offset: Number(offset),
        limit: Number(limit),
      }),
    ]);
    res.json({ length, pictogram });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCION PARA CREAR UN PICTOGRAMA
 * @param {*} req 
 * @param {*} res 
 */
const pictogramPost = async (req = request, res = response) => {
  const { name, description, synonymsIds, categoriesIds, storageId } = req.body;

  //Encuentra la imagen en el storage por el id
  const img = await Storage.findByPk(storageId)

  try {
    const pictogram = await Pictogram.create({
      name,
      description,
      //userId: req.user.id,
      storageId: img.id,
    });

    // Asociar el pictograma con sinónimos
    await pictogramAssingSynonyms(pictogram.id, synonymsIds)
    // Asociar el pictograma con categorias
    await pictogramAssingCategories(pictogram.id, categoriesIds)

    res.json({ pictogram });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

/**
 * FUNCIÓN PARA MODIFICAR UN PICTOGRAMA
 * @param {*} req 
 * @param {*} res 
 */
const pictogramPut = async (req, res = response) => {
  /* const { id } = req.params; */
  const { _id, synonymsIds, categoriesIds, storageId, ...resto } = req.body;
  try {
    await Pictogram.update(resto, {
      where: {
        id: req.params.id,
      },
    });

    // Actualizar el pictograma con sinónimos
    await pictogramAAssingSynonymsUpdate(Pictogram.id, synonymsIds)
    // Actualizar el pictograma con categorias
    await pictogramAssingCategoriesUpdate(Pictogram.id, categoriesIds)
/*     // Actualizar el pictograma con sinónimos
    await pictogramAssingSynonymsUpdate(req.params.id, synonymsIds) */

    res.json({ msg: "Pictogram successfully updated", id: req.params.id });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Talk to the administrator" });
  }
};


/**
 * FUNCION PARA ELIMINAR UN PICTOGRAMA
 * @param {*} req 
 * @param {*} res 
 */
const pictogramDelete = async (req, res = response) => {
  const { id, storageId } = req.params;

  try {
    const pictogram = await Pictogram.update({ state: false }, {
      where: {
        id,
      },
    });

    await PictogramSynonym.update({ state: false }, { where: { pictogramId: id } });
    await PictogramCategory.update({ state: false }, { where: { pictogramId: id } });
    /* await Storage.update({ state: false }, { where: { id: storageId } }) */
    
    res.json({ pictogram });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Talk to the administrator" });
  }
};


/******************************* UTIL FUNCTION *******************************/
/**
 * ASIGNAR SINONIMOS AL PICTOGRAMA
 * @param {*} picto_id 
 * @param {*} syn 
 */
const pictogramAssingSynonyms = async (picto_id, syn) => {
  try {
    for (let index = 0; index < syn.length; index++) {
      const syn_id = syn[index];
      await PictogramSynonym.create({ synonymId: syn_id, pictogramId: picto_id });
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * ACTUALIZAR SINONIMOS AL PICTOGRAMA
 * @param {*} picto_id 
 * @param {*} syn 
 */
const pictogramAAssingSynonymsUpdate = async (picto_id, syn) => {
  try {
    await PictogramSynonym.destroy({ where: { eventId: picto_id } });
    for (let index = 0; index < syn.length; index++) {
      const syn_id = syn[index];
      await PictogramSynonym.create({ synonymId: syn_id, pictogramId: picto_id });
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * ASIGNAR CATEGORIAS AL PICTOGRAMA
 * @param {*} picto_id 
 * @param {*} cat 
 */
const pictogramAssingCategories = async (picto_id, cat) => {
  try {
    for (let index = 0; index < cat.length; index++) {
      const cat_id = cat[index];
      await PictogramCategory.create({ categoryId: cat_id, pictogramId: picto_id });
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * ACTUALIZAR CATEGORIA AL PICTOGRAMA
 * @param {*} picto_id 
 * @param {*} cat 
 */
const pictogramAssingCategoriesUpdate = async (picto_id, cat) => {
  try {
    await PictogramCategory.destroy({ where: { pictogramId: picto_id } });
    for (let index = 0; index < cat.length; index++) {
      const cat_id = cat[index];
      await PictogramCategory.create({ categoryId: cat_id, pictogramId: picto_id });
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * ACTUALIZAR IMG AL PICTOGRAMA
 * @param {*} pictogramId 
 * @param {*} storageId 
 */
/* const pictogramAssingSynonymsUpdate = async (pictogramId, storageId) => {
  const img = await Storage.findByPk(storageId) // Buscar la nueva imagen en la base de datos
  if (!img) {
    throw new Error('Image not found');
  }
  await Pictogram.update({ storageId: img.id }, { // Actualizar el storageId con el id de la nueva imagen
    where: {
      id: pictogramId,
    },
  });
}; */




module.exports = {
  pictogramGet,
  pictogramPost,
  pictogramPut,
  pictogramDelete,
};
