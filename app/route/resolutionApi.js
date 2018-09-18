var User     = require('../models/user');
var Issue     = require('../models/issue');
var Resolution     = require('../models/resolution');
var jwt      = require('jsonwebtoken');
var moment = require('moment');
var secret   = 'tic@M@n@geR';

module.exports = function(router) {
        // Middleware which will check the users session
	router.use(function (req,res,next) {
		var token = req.body.token || req.body.query || req.headers['x-access-token'];
		if(token){
			// verify a token symmetric
			jwt.verify(token, secret, function(err, decoded) {
				if(err) {
					res.json({success:false,message:'Invalid token. Do login again!'});
				}else{
					req.decoded = decoded;
					next();
				}
			});

		}
		else{
			res.json({success:false,message:'No Token Provided'});
		}
	});


    router.post('/addResolution',function (req,res) {           
                    var resolution = new Resolution();
                    resolution.createdDate = moment(new Date()).format('DD-MM-YYYY hh:mm:ss');
                    resolution.updatedDate =  moment(new Date()).format('DD-MM-YYYY hh:mm:ss');
                    resolution.createdBy = req.decoded.associateID;
                    resolution.updatedBy = req.decoded.associateID;
                    resolution.sampleTicketIDs = req.body.sampleTicketIDs;
                    resolution.preRequisite =  req.body.preRequisite;
                    resolution.forWhat =  req.body.forWhat;
                    resolution.resolution = req.body.resolution;
                    resolution.verifySteps =  req.body.verifySteps;
                    console.log(resolution);   

                    if(resolution.createdDate==null || resolution.createdDate==""|| resolution.createdBy ==null || resolution.createdBy =="" ||resolution.updatedDate ==null || resolution.updatedDate=="" || resolution.verifySteps ==null || resolution.verifySteps==""){
                        if(resolution.updatedBy==null || resolution.updatedBy==""|| resolution.preRequisite ==null || resolution.preRequisite =="" ||resolution.resolution ==null || resolution.resolution=="" ){
                                res.json({success:false,message:"Please Ensure all fields are filled with valid Data"});
                                console.log("Please Ensure all fields are filled with valid Data");
                                }
                    }else{
                    resolution.save(function (err) {

                        if(err){
                                if(err.errors!=null){
                                console.log(err);     
                                if(err.errors.createdDate){
                                    res.json({success:false,message:err.errors.createdDate.message,field:"createdDate"});
                                }else if(err.errors.createdDate){
                                    res.json({success:false,message:err.errors.createdDate.message,field:"mantisStatus"});
                                }else if(err.errors.updatedDate){
                                    res.json({success:false,message:err.errors.updatedDate.message,field:"updatedDate"});
                                }else if(err.errors.updatedBy){
                                    res.json({success:false,message:err.errors.updatedBy.message,field:"updatedBy"});
                                }else if(err.errors.preRequisite){
                                    res.json({success:false,message:err.errors.preRequisite.message,field:"preRequisite"});
                                }else if(err.errors.verifySteps){
                                    res.json({success:false,message:err.errors.verifySteps.message,field:"verifySteps"});
                                }else if(err.errors.resolution){
                                    res.json({success:false,message:err.errors.resolution.message,field:"resolution"});
                                }else if(err.errors.sampleTicketIDs){
                                    res.json({success:false,message:err.errors.sampleTicketIDs.message,field:"sampleTicketIDs"});
                                }else{
                                    res.json({success:false,message:err});
                                }
                            }
                        }
                        else{
                                res.json({success:true,message:"Resolution has been added successfully"});
                        }
                        }); 
                    }
               });

               router.get('/getallResolutions',function (req,res) {
                Resolution.find().select("_id createdDate createdBy updatedDate updatedBy forWhat preRequisite resolution verifySteps sampleTicketIDs ").exec(function (err,resolutions) {
                    if(err){
                        res.json({success:false,message:err});
                    }else{
                        console.log(resolutions);
                        res.json({success:true,resolutions:resolutions});
                       }
                });
            });
               
               return router;

            };