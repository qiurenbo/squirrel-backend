pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build("squirrel-backend")
                }

            }
        }
        stage('Test') {
            steps {
                echo "test"
            }
        }
        stage('Deploy') {
            steps {
                echo "test"
            }
        }
    }
}
