const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
  res.render('users/register');
}

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) {
        return err;
      }
      else {
        req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
      }
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register')
  }
  // Registered User is automatically saved to mongodb through Passport
}

module.exports.renderLogin = (req, res) => {
  res.render('users/login');
}

module.exports.login = async (req, res) => { //fa
  req.flash('success', 'Welcome Back');
  const redirectUrl = res.locals.returnTo || '/campgrounds';
  res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return err
    }
    else {
      req.flash('success', 'You are logged out');
      res.redirect('/campgrounds');
    }
  })
}