var con = require('../lib/conexionbd');

function obtenerTodasLasPeliculas(req, res){
    var pagina = req.query.pagina;
    var titulo = req.query.titulo;
    var genero = req.query.genero;
    var anio = req.query.anio;
    var cantidad = req.query.cantidad;
    var columna_orden = req.query.columna_orden;
    var tipo_orden = req.query.tipo_orden;
    var posicion = 0;
    
    if(pagina != 1){
        posicion = (pagina - 1) * cantidad;
    }

    if(pagina){
        if(titulo && anio && genero){
            var sql = "select * from pelicula where anio = " + anio + " and genero_id = " + genero + " and titulo like '%" + titulo + "%' order by " + columna_orden + " " + tipo_orden + " limit " + posicion +"," + cantidad;
        }
        else if (titulo && anio && !genero){
            var sql = "select * from pelicula where anio = " + anio + " and titulo like '%" + titulo + "%' order by " + columna_orden + " " + tipo_orden + " limit " + posicion +"," + cantidad;
        }
        else if (titulo && !anio && genero){
            var sql = "select * from pelicula where genero_id = " + genero + " and titulo like '%" + titulo + "%' order by " + columna_orden + " " + tipo_orden + " limit " + posicion +"," + cantidad;
        }
        else if (titulo && !anio && !genero){
            var sql = "select * from pelicula where titulo like '%" + titulo + "%' order by " + columna_orden + " " + tipo_orden + " limit " + posicion +"," + cantidad;
        }
        else if (!titulo && anio && genero){
            var sql = "select * from pelicula where anio = " + anio + " and genero_id = " + genero + " order by " + columna_orden + " " + tipo_orden + " limit " + posicion +"," + cantidad;
        }
        else if (!titulo && anio && !genero){
            var sql = "select * from pelicula where anio = " + anio + " order by " + columna_orden + " " + tipo_orden + " limit " + posicion +"," + cantidad;
        }
        else if (!titulo && !anio && genero){
            var sql = "select * from pelicula where genero_id = " + genero + " order by " + columna_orden + " " + tipo_orden + " limit " + posicion +"," + cantidad;
        }
        else {
            var sql = "select * from pelicula order by " + columna_orden + " " + tipo_orden + " limit " + posicion +"," + cantidad;
        }
    }
    else{
        var sql = "select * from pelicula";
    }

    con.query(sql, function(error, resultado, fields){
        if(error){
            console.log("Hubo un error en la consulta " + error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        var total = resultado.length;
        var respuesta = {peliculas: resultado, total: total}

        res.send(respuesta)
    })
}

function obtenerGeneros(req, res){
    var sql = "select * from genero";

    con.query(sql, function(error, resultado, fields){
        if(error){
            console.log("Hubo un error en la consulta " + error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        var respuesta = {generos: resultado}

        res.send(respuesta)
    })
}

module.exports = {
    obtenerTodasLasPeliculas : obtenerTodasLasPeliculas,
    obtenerGeneros : obtenerGeneros
}