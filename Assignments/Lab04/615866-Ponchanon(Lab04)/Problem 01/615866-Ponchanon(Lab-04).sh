# To create the S3 bucket with the name ‘pdr-s3-bucket-lab04’ and region ‘us-east-1’
aws s3api create-bucket --bucket pdr-s3-bucket-lab04 --region us-east-1
#--bucket <bucket name>
#--region <curent region>
#application and bucket should be in same region


#Uploading the file to the newly created bucket 
sudo aws s3 cp "/Users/ponchanondattarone/MIU/06. 516-CC/Assignments/Lab04/nodejs.zip" s3://pdr-s3-bucket-lab04/nodejs.zip
#Source is local folder
#destination is S3 location. If there is a subfolder, //<bucket name>/<subfolder> is needed in S3 location


#Create the Elastic Beanstalk Application
aws elasticbeanstalk create-application --application-name pdr-ebs-lab04
#--application-name <unique EBS application name>


#Describe the application
aws elasticbeanstalk describe-applications --application-names pdr-ebs-lab04
#--application-name <existing application name>


#Add application version
aws elasticbeanstalk create-application-version --application-name pdr-ebs-lab04 --version-label v1.0.0 --source-bundle S3Bucket=pdr-s3-bucket-lab04,S3Key=nodejs.zip
#--application-name <existing application name>
#--version-label <unique version for this application> 
#--source-bundle S3Bucket=<S3 bucket name>,S3Key=<code file zip folder>



#Check domain name is available
aws elasticbeanstalk check-dns-availability --cname-prefix pdr-ebs-lab04
#--cname-prefix customized domain name



#Make sure your application version exists.
aws elasticbeanstalk describe-application-versions --application-name pdr-ebs-lab04 --version-label v1.0.0
#--application-name <existing application name>
#--version-label <existing version code>



#Create Configuration template
aws elasticbeanstalk create-configuration-template --application-name pdr-ebs-lab04 --template-name v1 --solution-stack-name "64bit Amazon Linux 2 v5.8.2 running Node.js 18"
#--application-name <existing application name>
#--template-name <unique name for the template>
#--solution-stack-name "64bit Amazon Linux 2 v5.8.2 running Node.js 18" for node.js


# option.txt file (this file is being used in the next command)
# [
#     {
#         "Namespace": "aws:autoscaling:launchconfiguration",
#         "OptionName": "IamInstanceProfile",
#         "Value": "pdr-user-admin"
#     }
# ]

#Create Environment
aws elasticbeanstalk create-environment --cname-prefix pdr-ebs-lab04 --application-name pdr-ebs-lab04 --template-name v1 --version-label v1.0.0 --environment-name pdr-ebs-lab04-env-dev --option-settings file://options.txt
#--cname-prefix unique domain name 
#--application-name pdr-ebs-lab04
#--template-name existing app template
#--version-label existing app version
#--environment-name <new name for the environment>
#--option-settings file://options.txt