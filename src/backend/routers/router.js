import express from 'express';
import passport from 'passport';
import ListNews from '../models/news';
const router = express.Router();

router.get("/api/news/getall", function (req, res) {
    ListNews.find({}, function (err, news) {
        if (err) throw err;
        res.send(news);
    });
})

router.post("/api/news/addnews", function (req, res) {

    let newNews = new ListNews({ price: req.body.price, item: req.body.item });
    newNews.save(function (err) {
        if (err) throw err;
        res.send(newNews);
    });
})
router.post("/api/news/deletenews", function (req, res) {
    ListNews.findByIdAndRemove(req.body, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
})
router.post("/api/news/editnews", function(req, res){ 
    let { _id, price, item } = req.body;
    ListNews.findByIdAndUpdate(_id, { price, item }, { new: true }, (err, update) => {
        if (err) throw err;
        res.send(update)
    })
})
//local
router.post('/api/user/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
}));
router.post('/api/user/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
}));
router.get('/logout', (req, res) => {
    console.log("logout")
    req.logout();
    res.redirect('/')

})

//facebook
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
})
)



router.get('/user', (req, res) => {
    if (req.user) {
        res.send(req.user)
    } else {
        return res.status(401).json({
            error: 'User is not authenticated',
            authenticated: false
        });
    }
});


export default router;