exports.home = function(req, res){
	var username = req.session.user_id;
	res.render('sections/home', {
		username: username,
		section : [
			{
				active: true,
				name: "Home",
				link: "/",
				image: "images/placeholder.png"
			},
			{
				name: "Profile",
				link: "/profile",
				image: "images/placeholder.png"
			},
			{
				name: "Charsheets",
				link: "/charsheets",
				image: "images/placeholder.png"
				
			},
			{
				name: "Campaigns",
				link: "/campaigns",
				image: "images/placeholder.png"
			}
		]
	});
};

exports.profile = function(req, res){
	var username = req.session.user_id;
	res.render('sections/profile', {
		username: username,
		section : [
			{
				name: "Home",
				link: "/",
				image: "images/placeholder.png"
			},
			{
				active: true,
				name: "Profile",
				link: "/profile",
				image: "images/placeholder.png"
			},
			{
				name: "Charsheets",
				link: "/charsheets",
				image: "images/placeholder.png"
				
			},
			{
				name: "Campaigns",
				link: "/campaigns",
				image: "images/placeholder.png"
			}
		]
	});
};

exports.charsheets = function(req, res){
	res.render('sections/charsheets', {
		section : [
			{
				name: "Home",
				link: "/",
				image: "images/placeholder.png"
			},
			{
				name: "Profile",
				link: "/profile",
				image: "images/placeholder.png"
			},
			{
				active: true,
				name: "Charsheets",
				link: "/charsheets",
				image: "images/placeholder.png"
				
			},
			{
				name: "Campaigns",
				link: "/campaigns",
				image: "images/placeholder.png"
			}
		]
	});
};

exports.campaigns = function(req, res){
	res.render('sections/campaigns', {
		section : [
			{
				name: "Home",
				link: "/",
				image: "images/placeholder.png"
			},
			{
				name: "Profile",
				link: "/profile",
				image: "images/placeholder.png"
			},
			{
				name: "Charsheets",
				link: "/charsheets",
				image: "images/placeholder.png"
				
			},
			{
				active: true,
				name: "Campaigns",
				link: "/campaigns",
				image: "images/placeholder.png"
			}
		]
	});
};

exports.users = function(req, res){
	res.render('sections/users');
};