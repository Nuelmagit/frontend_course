# tn-front

### Tested on
Ubuntu 20.04.5 LTS
Node: v14.21.3

### Considerations.
If you are planning to deploy to AWS. You will be required to Install AWS CLI, Configure credentials and optionally set up profiles.
Please follow AWS guide to install and set up your AWS CLI
* [Getting started and Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
* [Configuring AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
    *  [Configuration and credential file settings](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
* [Authentication and access credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-authentication.html)


For deployment you will see that an OPTONAL VAR (AWS_FRONTEND_PROFILE) is referenced. This variable will add to all commands executed by the deployment script the option "--profile". You can avoid the use of the var AWS_FRONTEND_PROFILE by settign up the environment variable AWS_PROFILE in your SO. However some times after set AWS_PROFILE in your SO you could face unexpected behaviour and enforce the profile using the option --profile is a good workaround.

To undestard what does --profile or AWS_PROFILE please read:
[Using named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-using-profiles)

### Project setup
Before running a the app locally or deploying to AWS please install dependecies by running
```
npm install
```
Create a .env file based on .env.sample file.
```
//.env file
VUE_APP_OPERATIONS_API_URL=https://tn-apis.app.com/v1/operations // REQUIRED FOR RUNNING IN LOCAL OR TO DEPLOY TO AWS
// REQUIRED JUT FOR AWS DEPLOY. Leve them blank if you are not deploying to AWS 
AWS_FRONTEND_PROFILE=tnprofile //Optional. Configured AWS CLI Profile to deploy app. Leave it black if you dont want to specify a profile and use the default aws cli config.
S3_HOST_BUCKET_NAME=tn-front // AWS S3 bucket NAME to host the app as static. You dont need to create it manually
DOMAIN_NAME=tn-front.app.com // Doimain Name of the app
CERTIFICATE_ARN=arn:aws:acm:us-east-1:999:certificate/xxxx //AWS Certificate Managers ARN for DNS described in DOMAIN_NAME
```
### Run a local server
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
* Install and configure AWS cli to execute command on your AWS account. Optionally you can set up an AWS profile.
* If you have set up a profile in the previous step make sure you set the env var AWS_FRONTEND_PROFILE in the .env file
* set the S3_HOST_BUCKET_NAME in the .env file. (this bucket will be created automatically with the deploy command. You have just to declare a name)
* Create a DNS with the DNS provider of your preference and set it in DOMAIN_NAME in the .env file
* Add/Create to AWS Certificate manager (AWS Console -> AWS Certificate Manager -> Certificates) a certificate that contains the host declared in DOMAIN_NAME and set its ARN as CERTIFICATE_ARN in the .env file
* Optional. you can set the var STACK_NAME to overwrite the AWS stack name. By default it is tn-front-app
* Your .env file will looks like
```
//.env 
VUE_APP_OPERATIONS_API_URL=https://tn-apis.app.com/v1/operations
AWS_FRONTEND_PROFILE=tnprofile // Add this just if you have set up a profile
S3_HOST_BUCKET_NAME=front-bucket
DOMAIN_NAME=tn-front.app.com
CERTIFICATE_ARN=arn:aws:acm:us-east-1:999:certificate/xxxx
```
* run deploy command
```
npm run deploy
```
### After Deployment
* You have to configure the DNS declared in DOMAIN_NAME to point to the Domain name of the CloudFront distribution created in the previous step. You could find it in AWS Console -> CloudFront -> Distributions it looks like xxxxxxx.cloudfront.net
* Remember to add to API's CORS config your DOMAIN_NAME and/or Domain name of the CloudFront.
```
//API's Folder -> src -> operations.openapi.yaml
x-amazon-apigateway-cors:
  allowOrigins:
  - https://tn-front.app.com
  - https://xxxxx.cloudfront.net
```
* Got to DOMAIN_NAME in the web browser of your preference and start using the app
