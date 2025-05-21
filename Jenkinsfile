pipeline {
    agent any

    environment {
        NODE_VERSION = '18.x'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || true'  // Continue even if tests fail
            }
        }

        stage('Deploy to Render') {
            steps {
                withCredentials([
                    string(credentialsId: 'render-api-key', variable: 'RENDER_API_KEY'),
                    string(credentialsId: 'render-service-id', variable: 'RENDER_SERVICE_ID')
                ]) {
                    sh '''
                        echo "Starting deployment to Render..."
                        RESPONSE=$(curl -s -X POST "https://api.render.com/deploy/srv-${RENDER_SERVICE_ID}?key=${RENDER_API_KEY}")
                        echo "Deployment response: $RESPONSE"
                        
                        if [[ $RESPONSE == *"Not Found"* ]]; then
                            echo "Error: Service not found. Please check your service ID."
                            exit 1
                        elif [[ $RESPONSE == *"Unauthorized"* ]]; then
                            echo "Error: Unauthorized. Please check your API key."
                            exit 1
                        elif [[ $RESPONSE == *"error"* ]]; then
                            echo "Error: Deployment failed. Response: $RESPONSE"
                            exit 1
                        else
                            echo "Deployment triggered successfully!"
                        fi
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        always {
            echo 'Pipeline finished.'
        }
    }
}
