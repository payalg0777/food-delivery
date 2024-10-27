pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION = 'us-east-1' // Set your AWS region
        REPO_DOMAIN = '842773481930.dkr.ecr.us-east-1.amazonaws.com' // Set your ECR repository domain
        REPOSITORY_URI = "${REPO_DOMAIN}/nestrest-ecr" // Set your repository name
    }

    stages {
        stage('Pre-Build') {
            steps {
                script {
                    echo 'Logging in to Amazon ECR...'
                    sh 'aws --version'
                    sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${REPO_DOMAIN}"
                    
                    // Get the commit hash
                    def commitHash = env.GIT_COMMIT?.substring(0, 7) ?: 'latest'
                    env.IMAGE_TAG = commitHash
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "Build started on ${new Date()}"
                    echo 'Building the Docker image...'
                    sh "docker build -t ${REPOSITORY_URI}:latest ."
                    sh "docker tag ${REPOSITORY_URI}:latest ${REPOSITORY_URI}:${env.IMAGE_TAG}"
                }
            }
        }

        stage('Post-Build') {
            steps {
                script {
                    echo "Build completed on ${new Date()}"
                    echo 'Pushing the Docker images...'
                    sh "docker push ${REPOSITORY_URI}:latest"
                    sh "docker push ${REPOSITORY_URI}:${env.IMAGE_TAG}"
                    
                    echo 'Writing image definitions file...'
                    def imageDefinitions = "[{\"name\":\"nestrest2api\",\"imageUri\":\"${REPOSITORY_URI}:${env.IMAGE_TAG}\"}]"
                    writeFile file: 'imagedefinitions.json', text: imageDefinitions
                }
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: 'imagedefinitions.json', allowEmptyArchive: true
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
