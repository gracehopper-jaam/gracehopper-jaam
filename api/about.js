const express = require('express');
const router = express.Router();
const { aboutRouter } = require('');

// GET/api/about
aboutRouter.use((req, res, next) => {

    next();
    });
    
    aboutRouter.get('/', async (req, res) => {
        const about = await aboutRouter();
        res.send({ 
        about
    });
    });
    

// POST/api/ about
aboutRouter.post('/:about', async (req, res, next) => {
    const { about } = req.params;
    
    try {
        const about = await aboutRouter(about);
    
    if(about) {
    console.log(`Here is the about section: ${about}:`);
        res.send({
            about
         });

    } else {
        next({
        name: "Error creating about page",
        message: "Not able to create new about page"
  })
}
    } catch (error) {
        next(error);
    }
  });

// PATCH /api/ about
aboutRouter.patch('/:aboutId', requireUser, async (req, res, next) => {
    const { aboutId } = req.params;
    const { isPublic, name, goal } = req.body;
    let about = await getaboutById(aboutId)
    try {
        if(req.user.id === about.creatorId) {
            const about = await updateabout({ id: aboutId, goal, name, isPublic })
            res.send(about);
        } else {
            res.status(403)
            next({
                message: UnauthorizedUpdateError(req.user.username, about.name),
                name: 'UnauthorizedUpdateError',
                error: 'This is not working!'
            });
        }

    } catch (error) {
        next(error)
    }
})

// DELETE /api/ about
aboutRouter.delete('/:aboutId', requireUser, async (req, res, next) => {
    const { aboutId } = req.params;
    
    try {
        const about = await getaboutById(aboutId);
        if(req.user.id === about.creatorId) {
            const about = await destroyabout(aboutId);
            res.send(about);
        } else {
            res.status(403)
            next({
                message: UnauthorizedDeleteError(req.user.username, about.name),
                name: 'UnauthorizedDeleteError',
                error: 'This is really NOT working!'
            });
        };
    } catch (error) {
        next(error)
    }
})

  module.exports = router; 