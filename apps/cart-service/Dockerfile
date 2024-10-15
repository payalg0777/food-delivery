# Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]

#Api gateway - aws, kong, LB, kafka, docker file, swagger, loggers, monitoring
#DB - 1/2
#NFR - 
# Api, CI/CD, serving(infrastructure) strategy, deployment strategy(sonar/lint/PR builder), monitor, doc, 
#ECS, Farget
#ASG - 
#VPC - Subnet 
#Dynamodb