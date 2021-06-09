pipeline {
        agent any
    environment {
        COMMIT_HASH = "${sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()}"
        S3_BUCKET = 'utopiaadminportal'
    }
    stages {
        stage('installs') {
            steps {
                sh 'export NG_CLI_ANALYTICS=false'
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'ng build --configuration=production'
            }
        }
        stage('Deploy to S3') {
            steps {
                echo 'Beginning Deployment'
                sh "aws s3 sync ./dist/adminportal s3://${S3_BUCKET}"
                echo 'Finished'
            }
        }
    }
    post {
        always {
            echo 'Post'
        }
    }
}
