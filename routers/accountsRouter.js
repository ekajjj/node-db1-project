const express = require('express');
const db = require('../data/dbConfig');
const router = express.Router();

router.get('/', (req, res) => {
	db
		('accounts')
		.then((accounts) => {
			res.status(200).json({ data: accounts });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ errorMessage: 'there was an error trying to retrive all accounts' });
		});
});

router.get('/:id', (req, res) => {
  db
  ('accounts')
  .where({ id: req.params.id })
  .first()
  .then((account) => {
    res.status(200).json({data: account})
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({ errorMessage: 'there was an error retrieveing that account' })
  })
})

router.post('/', (req, res) => {
  const postData = req.body
	db('accounts')
    .insert(postData, 'id')
    .then(ids => {
      const id = ids[0]
        db('accounts')
        .where({ id })
        .first()
        .then(account => {
            res.status(201).json({data: account});
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ errorMessage: 'There was an error with POST of that account data' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db('accounts')
  .where({ id })
  .update(changes)
  .then((count) => {
    res.status(200).json({ message: `updated ${count} account(s)`})
  })
})

router.delete('/:id', (req, res) => {
  db('accounts')
  .where({id: req.params.id })
  .del()
  .then((count) => {
    if (count > 0){
      res.status(200).json({ message: `${count} account(s) deleted say buh bye`})
    }else {
      res.status(404).json({ message: 'There was no account with that id in our database' });
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).json({ errorMessage: 'Some other error trying to delete that account other than the ID not being there idk sorry bud' });
  });
})
module.exports = router;