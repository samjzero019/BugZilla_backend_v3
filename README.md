# BugZilla_backend_v3
This repo will used to dockerize Bugzilla backend v2 and deploy it on ec2 and ecs as migration testing after converting it to micro-services 

## Pre-configuration
    - Make sure to update .env files as per your configuration
    - make sure to push your docker images to ECR 



### to run on ECS 
    - make sure your AWS profile is working good in your ecs context
    - make sure to be loggedIn via aws cli in ECR to fetch images which was pushed

docker-compose -p bugzilla  -f .\docker-compose-ecr.yaml  up




