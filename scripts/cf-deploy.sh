#! /bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

if [ -f "$DIR/../.env" ]
then
    source $DIR/../.env
fi

if [ -z "$S3_HOST_BUCKET_NAME" ]
then
    echo "No \$S3_HOST_BUCKET_NAME env value found";
    exit 1
else
    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text --profile=${AWS_FRONTEND_PROFILE});

    echo "Build stack..."
    COMMAND="aws cloudformation deploy --template-file build/cloud-app-stack.cf.json \
    --stack ${STACK_NAME:=tn-front-app} --region us-east-1 \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides S3HostBucketName=${S3_HOST_BUCKET_NAME} \
    CertificateArn=${CERTIFICATE_ARN} DomainName=$DOMAIN_NAME \
    --profile=${AWS_FRONTEND_PROFILE}"
    echo $COMMAND;
    $COMMAND;

    echo "Clear bucket..."
    CLEAR_COMMAND="aws s3 rm s3://$S3_HOST_BUCKET_NAME--$AWS_ACCOUNT_ID --recursive --profile=${AWS_FRONTEND_PROFILE}"
    echo $CLEAR_COMMAND;
    $CLEAR_COMMAND

    echo "Copy files..."
    COPY_INDEX_COMMAND="aws s3 cp $DIR/../build/dist/index.html s3://$S3_HOST_BUCKET_NAME--$AWS_ACCOUNT_ID/ --cache-control 'no-cache' --profile=${AWS_FRONTEND_PROFILE}"
    COPY_COMMAND="aws s3 cp $DIR/../build/dist/ s3://$S3_HOST_BUCKET_NAME--$AWS_ACCOUNT_ID/ --cache-control 'max-age=31536000' --exclude index.html --recursive  --profile=${AWS_FRONTEND_PROFILE}"

    $COPY_COMMAND;
    $COPY_INDEX_COMMAND;

    DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[*].{id:Id,origin:Origins.Items[0].Id}[?origin=='$S3_HOST_BUCKET_NAME'].id" --output text --profile=${AWS_FRONTEND_PROFILE});
    INVALIDATION_RESULT=$(aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*" --profile=${AWS_FRONTEND_PROFILE})
    echo "Invalidation result:"
    echo $INVALIDATION_RESULT;
    
fi
