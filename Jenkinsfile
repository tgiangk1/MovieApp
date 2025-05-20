pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18.0.0'
    }
    
    stages {
        stage('Setup Node.js') {
            steps {
                sh '''
                    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                '''
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    npm install
                '''
            }
        }
        
        stage('Build') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    npm run build
                '''
            }
        }
        
        stage('Test') {
            steps {
                sh '''
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    npm test
                '''
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