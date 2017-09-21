const Title =  require('../models/title');

const postTitle = function(req, res) {
    var title = new Title({
        title: req.body.title,
        genre: req.body.genre,
        image: req.body.image,
        year: req.body.year,
        score: req.body.score,
        text: req.body.text
    });

    title.save(function(err) {
        if(err) {
            res.send(err);
        }

        res.json({ message: 'Title created' });
    });
};

const getTitles = function(req, res) {
    var limit = +req.query.limit || 10;
    var skip = +req.query.skip || 0;

    var year = req.query.year ? JSON.parse(req.query.year) : { min: 1878, max: 2017 };
    console.log('lol');

    Title.find({
        year: { $gt: year.min, $lt: year.max }
    })
        .skip(skip)
        .limit(limit)
        .exec(function(err, titles) {
            if(err) {
                res.send(err);
            }

            res.json(titles);
        });
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
