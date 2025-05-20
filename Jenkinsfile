pipeline {
    agent any
    
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
                sh 'npm test'
            }
        }
        
        stage('Deploy to Render') {
            steps {
                withCredentials([string(credentialsId: 'RENDER_API_KEY', variable: 'RENDER_API_KEY'),
                               string(credentialsId: 'RENDER_SERVICE_ID', variable: 'RENDER_SERVICE_ID')]) {
                    sh '''
                        curl -X POST "https://api.render.com/deploy/srv-${RENDER_SERVICE_ID}?key=${RENDER_API_KEY}"
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
} 