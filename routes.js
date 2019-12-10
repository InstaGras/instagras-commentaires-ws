function getCommentairesOfPublication(req, response, client){
	const id = req.params.id;
	const commentaireSelectionQuery = {
		text: 'SELECT * FROM "commentaires"."commentaires" where "commentaires"."commentaires"."publication_id" = $1 ORDER BY date_creation desc ',
		values: [id]
	}
	client.query(commentaireSelectionQuery, (err, res) => {
		if (err) {
			response.send({
				success: false,
				code: 400,
				message: 'Error while getting the commentaires '+ id +' in db.'
			});
		} else {
			const rows = res.rows;
			if(rows[0] == undefined){
				response.send({
					success: false,
					code: 400,
					message : rows
					
				});
			} else {
				response.send({
					success: true,
					code: 200,
					data : rows
				});
			}
		}
	});
}

function createCommentaire(req,response,client){

	const username = req.body.username;
	const contenu = req.body.contenu;
	const publication_id = req.body.publication;
	const date_creation = new Date();

	const commentairesInsertionQuery = {
		text: 'INSERT INTO commentaires.commentaires(publication_id, username, date_creation, contenu) VALUES ($1, $2, $3, $4)',
		values: [publication_id, username, date_creation, contenu]
	}

	client.query(commentairesInsertionQuery, (err, res) => {
		if (err) {
			response.send({
				success: false,
				code: 400,
				message: "Error during commentaires creation : "+ err 
			});
		} else {
			response.send({
				success: true,
				code: 200,
				message: 'The commentaires has been created',
			});
		}
	})
}

function deleteCommentaireById(req, response, client){
	const commentaireDeleteQuery = {
		text: 'DELETE FROM commentaires.commentaires WHERE id = $1',
		values: [req.body.idComment]
	}

	console.log(req.body);

	client.query(commentaireDeleteQuery, (err, res) => {
		if (err) {
			response.send({
				success: false,
				code: 400,
				message: "Error during commentaires deletion : "+ err 
			});
		} else {
			response.send({
				success: true,
				code: 200,
				message: 'The commentaires has been deleted',
			});
		}
	})
}

module.exports = {
	getCommentairesOfPublication,
	createCommentaire,
	deleteCommentaireById
}