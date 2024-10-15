# Development Stage
FROM node:alpine as development

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install all dependencies
RUN npm install

# Install NestJS CLI globally
# RUN npm install -g @nestjs/cli

# Copy the source code into the container image.
COPY . .

# Install Prisma CLI globally
RUN npm install -g prisma

# Generate Prisma client
RUN npx prisma generate

# Build the application
# RUN npm run build

# Production Stage
# FROM node:alpine as production

# Set the environment variable
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# Create and change to the app directory.
# WORKDIR /usr/src/app

# Copy only the necessary files from the development stage
# COPY package*.json ./
# RUN npm install --only=production

# COPY --from=development /app/dist ./dist
# COPY --from=development /app/node_modules ./node_modules

# Expose the application port
EXPOSE 3000

# Run the web service on container startup.
CMD [ "npm", "run", "start:dev" ]
# CMD [ "npm", "run", "start:prod" ] #prod
