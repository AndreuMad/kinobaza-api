const Title =  require('../models/title');

const postTitle = function(req, res) {
    const title = new Title({
        title: req.body.title,
        genre: req.body.genre,
        image: req.body.image,
        year: req.body.year,
        score: req.body.score,
        text: req.body.text
    });

    title.save()
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

    let count;
    let query = {};

    if(name) {
        query = Object.assign({
            $or: [
                { "name.en": { "$regex": name, "$options": "i" } },
                { "name.ukr": { "$regex": name, "$options": "i" } }
            ]
        },
        query);
    }

    if(genre) {
        query.genre = { $all: genre };
    }

    if(year) {
        console.log(year);
        query.year = { $gt: year.min, $lt: year.max };
    }

    if(score) {
        query["score.imdb"] = { $gt: score.min, $lt: score.max };
    }

    Promise.all([
        Title.count(query),
        Title.find(query).skip(skip).limit(limit)
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
    Title.findById(req.params.title_id, function(err, title) {
        if(err) {
            res.send(err);
        }

        res.json(title);
    });
};

const putTitle = function(req, res) {
    Title.findById(req.params.title_id, function(err, title) {
        if(err) {
            res.send(err);
        }

        title.title = req.body.title;
        title.genre = req.body.genre;
        title.image = req.body.image;
        title.year = req.body.year;
        title.score = req.body.score;
        title.text = req.body.text;

        title.save(function(err) {
            if(err) {
                res.send(err);
            }
        });

        res.json({ message: 'Title updated' });
    });
};

const deleteTitle = function(req, res) {
    Title.remove({
        _id: req.params.title_id
    }, function(err, title) {
        if(err) {
            res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
};

module.exports = {
    postTitle: postTitle,
    getTitles: getTitles,
    getTitle: getTitle,
    putTitle: putTitle,
    deleteTitle: deleteTitle
};
