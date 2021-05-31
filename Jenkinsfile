pipeline {
        agent any
    environment {
        COMMIT_HASH = "${sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()}"
        S3_BUCKET = 'utopiaadminportal'
    }
    stages {
        // stage('npm install') {
        //     steps {
        //         sh 'npm install'
        //     }
        // }
        stage('Build') {
            steps {
                sh 'ng build --configuration production'
            }
        }
            stage('Deploy to S3') {
              steps {
                
                echo 'Clearing current contents'
                sh "aws s3 rm s3://${S3_BUCKET} --recursive"
                echo 'S3 cleared'
                sh "aws s3 cp ./dist/ --recursive s3://${S3_BUCKET} --acl public-read"
                echo 'Finished'              }
            }
    }
    post {
        always {
            echo 'Post'
        }
    }
}
