/**
 * CategoriaController.js
 * Controlador per gestionar les operacions relacionades amb les categories
 */

const { Usuari, Comentaris, Video, Youtuber } = require('../models');
const { logger } = require('../config/logger');

/**
 * Crea un nou vídeo
 * @param {Object} req - Objecte de petició
 * @param {Object} res - Objecte de resposta
 * @param {Function} next - Funció següent del middleware
 */
const crearUsuari = async (req, res, next) => {
    try {
      const { username, email, password, nom, idioma } = req.body;
      logger.info('Petició per crear un nou usuari', { username, email });
      
      if(username.length<3){
        res.status(400).json({
          ok: false,
          codi: 'ERROR_VALIDACIO',
          missatge: 'Les dades proporcionades no compleixen els requisits',
          detalls: [
            {
              camp: 'username',
              error: "El nom d'usuari ha de tenir com a mínim 3 caràcters"
            }
          ]
        })
      }

      const usuariUsername = await Usuari.findOne({where: {username}})
      if(usuariUsername){
        res.status(409).json({
          ok: false,
          codi: 'ERROR_DUPLICAT',
          missatge: "Ja existeix un usuari amb aquest nom d'usuari o email",
          detalls: [
            {
              camp: 'username',
              error: "Aquest username ja está registrat"
            }
          ]
        })
      }
      
      const usuariCorreuExistent = await Usuari.findOne({where: {email}})
      if(usuariCorreuExistent){
        res.status(409).json({
          ok: false,
          codi: 'ERROR_DUPLICAT',
          missatge: "Ja existeix un usuari amb aquest nom d'usuari o email",
          detalls: [
            {
              camp: 'email',
              error: "Aquest email ja está registrat"
            }
          ]
        })
      }
      // Crear el vídeo
      const usuari = await Usuari.create({
        username,
        email,
        password,
        nom,
        idioma,
        visualitzacions: 0,
        likes: 0
      });
      
      // Retornar el vídeo creat amb les seves categories
      const usuariComplert = await Usuari.findByPk(usuari.id);
      
      res.status(201).json({
        ok: true,
        missatge: 'Vídeo creat amb èxit',
        resultat: usuariComplert
      });
    } catch (error) {
      logger.error('Error creant nou vídeo:', error);
      next(error);
    }
  };

  const obtenirComentaris = async (req, res, next) => {
    try {
      const { id } = req.params;
      logger.info(`Petició per obtenir comentaris del usuari amb ID: ${id}`);
      
      // Verificar primer si el usuari existeix
      const usuari = await Usuari.findByPk(id);
      
      if (!usuari) {
        return res.status(404).json({
          ok: false,
          missatge: `No s'ha trobat cap usuari amb l'ID: ${id}`
        });
      }
      
      const comentaris = await Comentaris.findAll({
        where: { usuari_id: id },
        attributes: ['id', 'text', 'data_creacio'],
        include: [
          {
            model: Video,
            attributes: ['id', 'titol', 'url_video'],
            include:[
              {
                model: Youtuber,
                attributes: ["nom_canal"],
              }
            ]
          } 
        ]
      });
      
      res.status(200).json({
        ok: true,
        missatge: `Comentaris de l'usuari ${usuari.username} obtinguts amb èxit`,
        resultat: comentaris
      });
    } catch (error) {
      logger.error(`Error obtenint els comentaris de l'usuari amb ID ${req.params.id}:`, error);
      next(error);
    }
  };
  
  
module.exports = {
  crearUsuari,
  obtenirComentaris
};