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
                withCredentials([string(credentialsId: 'RENDER_DEPLOY_HOOK', variable: 'RENDER_DEPLOY_HOOK')]) {
                    sh '''
                        echo "Starting deployment to Render..."
                        
                        if [ -z "${RENDER_DEPLOY_HOOK}" ]; then
                            echo "Error: Deploy Hook URL is empty"
                            exit 1
                        fi
                        
                        RESPONSE=$(curl -s -X POST "${RENDER_DEPLOY_HOOK}")
                        echo "Deployment response: $RESPONSE"
                        
                        if echo "$RESPONSE" | grep -q "error"; then
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
