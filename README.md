# tn-front

## Tested on
Ubuntu 20.04.5 LTS
Node: v14.21.3

## Project setup
Before running a local server or deploying to AWS please install dependecies by running
```
npm install
```
Create a .env file based on .env.sample file.
```
//.env file
VUE_APP_API_URL=https://tn-apis.app.com/v1 // REQUIRED FOR RUNNING IN LOCAL OR TO DEPLOY TO AWS
// REQUIRED JUT FOR AWS DEPLOY. Leve them blank if you are not deploying to AWS 
AWS_FRONTEND_PROFILE=tnprofile //Optional. Configured AWS CLI Profile to deploy app. Leave it black if you dont want to specify a profile and use the default aws cli config.
S3_HOST_BUCKET_NAME=tn-front // AWS S3 bucket NAME to host the app as static. You dont need to create it manually
DOMAIN_NAME=tn-front.app.com // Doimain Name of the app
CERTIFICATE_ARN=arn:aws:acm:us-east-1:999:certificate/xxxx //AWS Certificate Managers ARN for DNS described in DOMAIN_NAME
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Deploy on AWS
1 Install and configure AWS cli to execute command on your AWS account. Optionally you can set up an AWS profile.
2 If you have set up a profile in the previous step make sure you set the env var AWS_FRONTEND_PROFILE in the .env file
3 set the S3_HOST_BUCKET_NAME in the .env file. (this bucket will be created automatically with the deploy command. You have just to declare a name)
4 Create a DNS with the DNS provider of your preference and set it in DOMAIN_NAME in the .env file
5 Add/Create to AWS Certificate manager (AWS Console -> AWS Certificate Manager -> Certificates) a certificate that contains the host declared in DOMAIN_NAME and set its ARN as CERTIFICATE_ARN in the .env file

### After Deployment
1 You have to configure the DNS declared in DOMAIN_NAME to point to the Domain name of the CloudFront distribution created in the previous step. You could find it in AWS Console -> CloudFront -> Distributions it looks like xxxxxxx.cloudfront.net
2 Remember to add to Server's CORS config your DOMAIN_NAME and/or Domain name of the CloudFront.
```
//Server's Folder -> src -> operations.openapi.yaml
x-amazon-apigateway-cors:
  allowOrigins:
  - https://tn-front.app.com
  - https://xxxxx.cloudfront.net
```
3 Got to DOMAIN_NAME in the web browser of your preference and start using the app
