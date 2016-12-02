AWIMARKET Deployment
===================


Deploy the application
---

#### Step 1: Set up your Heroku Account

Please visit https://signup.heroku.com/login and create a new Heroku account. (you will need to confirm your mail adress).

Once you are logged in, please create a new App (you can leave the name blank).

#### Step 2: Install the Heroku command line tool

Please follow the instruction here https://devcenter.heroku.com/articles/heroku-cli to install the heroku command line tool.

Check in your terminal that the Heroku CLI has been installed:
> heroku --version

#### Step 3 (optional): Create an Amazon S3 account

Please create a new Amazon Web Service account: https://portal.aws.amazon.com/gp/aws/developer/registration/index.html

You will be asked for a valid credit card number.

> **Phone number validation**
>
> In order to confirm your phone number, Amazon will call you and will ask you to enter the pin number that is shown on your screen.

Choose the basic (free) plan then click on **continue**. Your account has been created.

#### Step 4 (optional): Create a new Amazon S3 bucket

Go to https://console.aws.amazon.com/ to log in. Once logged in, click on Services on the top menu, then click on S3 under the Storage section. Then click on the **create a bucket** button.

Choose a name for the bucket and a geographic location, then click on create.

>  **Create a new folder **
>  
> Click on the **Create a folder** button to create a new folder where the files will be uploaded in. Choose a `name` then validate.

 **Bucket policy**
 
In order to allow the users to read the images, you need to add a read-only policy on the folder you've just created.

Please click on `All bucket` then select your bucket. Then click on `Properties` tab on the right, then open the `Permissions` section then click on `Add a bucket policy`.

Then copy and past the following with replacing **bucketname** and **folder** with your bucket name and the folder you've created.

> {
	"Version": "2008-10-17",
	"Statement": [
		{
			"Sid": "AllowPublicRead",
			"Effect": "Allow",
			"Principal": {
				"AWS": "*"
			},
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::**bucketname**/**folder**/*"
		}
	]
}

#### Step 5 Create a new GrapheneDB account

1.1. Follow the link : http://www.graphenedb.com/
If you are already sign up go to 1.4.
1.2. Click on “Sign up now”
1.3. Fill the fields with the related data
1.4. After be login go to : https://app.graphenedb.com/dbs
1.5. Click on “create database”
1.6. Choose the option you want but if you want keep free database, just fill the name of the database.
1.7. Click on create database.
1.8. Click on the “Connection” tab.
1.9. Copy the CONNECTION URI you will need it later.

#### Step 6 (optional) Create a Facebook for developper account

If you already have a Facebook account go to 2.5.
2.1. Go to : https://www.facebook.com
2.2.  Fill the fields with the related data and click on Sign up
2.3. Log in and go to the “About” tab.
2.4. Click on “Edit your contact info” and add your phone number
2.5. Go to : https://developers.facebook.com/
2.6. Click on Create App
2.7. Fill the fields with the related data
2.8. Click on Dashboard
2.9. Click on the add a platform button. 
2.10. Choose a web application then write your website URL
2.11. Click on App Review
2.12. Make the visibility of your facebook app on public
#### Step 7.1: Configure the application

Go on Heroku dashboard then in the Settings tab. Click on `Reveal config vars` and add the following Environment Variables.

|Variable | Value                        |
 ----------------- | ---------------------------- |
| AWIMARKET_API_BASE_URL | The application URL |
| AWIMARKET_DB_URL | Your Neo4J (Graphene DB) URL | 
| AWIMARKET_FACEBOOK_ID | Your facebook app id |
| AWIMARKET_FACEBOOK_SECRET | Your Facebook app secret |
| AWIMARKET_S3_ACCESS_KEY_ID | Your amazon S3 access key ID |
| AWIMARKET_S3_BASE_URL | https://s3-eu-west-1.amazonaws.com/ |
| AWIMARKET_S3_BUCKET | Your amazon S3 bucket |
| AWIMARKET_S3_IMAGE_FOLDER | Your amazon S3 folder name |
| AWIMARKET_S3_SECRET_ACCESS_KEY | Amazon AWS Secret key |

**Tell Heroku that the application run on NodeJS**

Under the `Settings`tab and the `BuildPack` section, click on `Add buildpack` then choose `NodeJS`.
 
#### Step 7.2: Deploy the application

On a terminal, log in to Heroku.

> heroku login

Clone the source code:

> git clone https://github.com/Azar06/AWIMarket.git
> cd AWIMarket

Attach Heroku to your source code:

> heroku git:remote -a **your_application_name**

Then deploy your change using

> git push heroku master

All the dependencies will be downloaded and the application will restart.
