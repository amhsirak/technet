const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const request = require('request');
const config = require('config');

// @route GET api/profile/me
// @description Get current user's profile
// @access Private

router.get('/me' , auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',['name','avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'Profile of this user not found.'})
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route POST api/profile/
// @description Create or update user profile 
// @access Private

router.post('/' , [
    auth,
    [
        check('status','Status is required').notEmpty(),
        check('skills','Skills is required').notEmpty()
    ] 
],
async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
      } = req.body;

      // Build profile object 
      const profileFields = {};
      profileFields.user =  req.user.id;
      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (bio) profileFields.bio = bio;
      if (status) profileFields.status = status;
      if (githubusername) profileFields.githubusername = githubusername;
      if (skills) {
          profileFields.skills = skills.split(',').map(skill => skill.trim());
      }
    
      // Build social object 
      profileFields.social = {}
      if (youtube) profileFields.youtube =  youtube;
      if (twitter) profileFields.twitter = twitter;
      if (facebook) profileFields.facebook =  facebook;
      if (linkedin) profileFields.linkedin = linkedin;
      if (instagram) profileFields.instagram = instagram;

      try {
         let profile = await Profile.findOne({ user: req.user.id });

         if(profile) {
             // Update profile 
             profile = await Profile.findOneAndUpdate(
                 { user: req.user.id },
                 { $set: profileFields },
                 { new: true }
             );

             return res.json(profile);
         }
         // Create profile
         profile = new Profile(profileFields);
         await profile.save();
         res.json(profile);

      } catch(err) {
         console.error(err.message);
         res.status(500).send('Server Error');
      }
} 
);

// @route GET api/profile/
// @description Get all profiles 
// @access Public

router.get('/', async(req,res) => {
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/profile/user/:user_id
// @description Get profile by user ID 
// @access Public

router.get('/user/:user_id', async(req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id}).populate('user',['name','avatar']);

        if(!profile){
            res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);

        if(err.kind === 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/profile
// @description Delete profile, user and posts 
// @access Private 

router.delete('/', auth, async(req,res) => {
    try {
        // Remove user posts
        await Post.deleteMany({ user: req.user.id });

        // Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // Remove User
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    
    }
});


// @route PUT api/profile/experience
// @description Add profile experience
// @access Private 
router.put(
    '/experience',
    auth,
    check('title', 'Title is required').notEmpty(),
    check('company', 'Company is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const{
        title,
        company,
        location,
        from,
        to,
        current,
        description 
    } = req.body;

    const newExp = {
        title,   // title: title 
        company,
        location,
        from,
        to,
        current,
        description
    }
      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        profile.experience.unshift(req.body);
        // The unshift() method adds new items to the beginning of an array, and returns the new length.
        await profile.save();
  
        res.json(profile);

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

// @route DELETE api/profile/experience/exp_id
// @description Remove profile experience
// @access Private 
router.delete('/experience/:exp_id', auth, async(req,res) =>{
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get index to be removed 
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex,1);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route PUT api/profile/education
// @description Add profile education 
// @access Private 
router.put(
    '/education',
    auth,
    check('school', 'School is required').notEmpty(),
    check('degree', 'Degree is required').notEmpty(),
    check('fieldofstudy', 'Field of study is required').notEmpty(),
    check('from', 'From date is required and needs to be from the past').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const{
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description 
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        profile.education.unshift(newEdu);
        // The unshift() method adds new items to the beginning of an array, and returns the new length.
        await profile.save();
  
        res.json(profile);

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

// @route DELETE api/profile/education/edu_id
// @description Remove profile eeducation
// @access Private 
router.delete('/education/:edu_id', auth, async(req,res) =>{
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get index to be removed 
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex,1);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api/profile/github/:username
// @description Get user repos from Github
// @access Public

router.get('/github/:username', async(req,res) => {
    try {
        const options = {

            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
            method: 'GET',
            headers:{'user-agent': 'node.js'}
        };

        request(options, (error,response,body) => {
            if(error) console.error(error);

            if(response.statusCode !== 200) {
                return res.status(404).json({msg: 'No Github profile found'});
            }

            res.json(JSON.parse(body));
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
        
    }
});


module.exports = router;