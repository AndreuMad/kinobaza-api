const Title =  require('../models/title');

const getTitleQuery = require('../queries/titles/getTitle');
const postTitleQuery = require('../queries/titles/postTitle');
const editTitleQuery = require('../queries/titles/editTitle');
const deleteTitleQuery = require('../queries/titles/deleteTitle');

const postTitle = function(req, res) {
    const query = {
        title: req.body.title,
        genre: req.body.genre,
        image: req.body.image,
        year: req.body.year,
        score: req.body.score,
        text: req.body.text
    };

    postTitleQuery(query)
        .then(() => res.json({ message: 'Title created' }))
        .catch(error => res.send(error));
};

const getTitles = function(req, res) {
    const limit = +req.query.limit || 3;
    const skip = +req.query.skip || 0;

    const name = req.query.name;
    const genre = req.query.genre;
    const year = req.query.year ? JSON.parse(req.query.year) : null;
    const score = req.query.score ? JSON.parse(req.query.score) : null;
    const sort = req.query.sort || 'name';

    let query = {};

    if(name) {
        query = Object.assign(
            {
                $or: [
                    { "name.en": { "$regex": name, "$options": "i" } },
                    { "name.ukr": { "$regex": name, "$options": "i" } }
                ]
            },
            query
        );
    }

    if(genre) {
        query.genre = { $all: genre };
    }

    if(year) {
        query.year = { $gt: year.min, $lt: year.max };
    }

    if(score) {
        query["score.imdb"] = { $gt: score.min, $lt: score.max };
    }

    Promise.all([
        Title.count(query),
        Title.find(query).skip(skip).limit(limit).sort([[sort, -1]])
    ])
        .then((values) => {
            res.json({
                count: values[0],
                titles: values[1]
            });
        })
        .catch(error => res.send(error))
};

const getTitle = function(req, res) {
    getTitleQuery(req.params.title_id)
        .then(title => res.json(title))
        .catch(error => res.send(error));
};

const editTitle = function(req, res) {
    editTitleQuery(req.params.title_id, req.body)
        .then(() => res.json({ message: 'Title updated' }))
        .catch(error => res.send(error));
};

const deleteTitle = function(req, res) {
    deleteTitleQuery(req.params.title_id)
        .then(() => res.json({ message: 'Successfully deleted' }))
        .catch(error => res.send(error));
};

module.exports = {
    postTitle: postTitle,
    getTitles: getTitles,
    getTitle: getTitle,
    editTitle: editTitle,
    deleteTitle: deleteTitle
};
