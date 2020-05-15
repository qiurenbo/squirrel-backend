pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build("-t squirrel-frontend")
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
