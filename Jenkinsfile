pipeline {

    agent any

    stages {
        stage('Build') {
            steps {
                sh "docker build -t squirrel-backend ."
              
            }
        }

        stage('Test') {
            steps {
                echo "test"
            }
        }

        stage('Push to harbor') {
            steps {
                sh "docker login 192.168.33.12 -u admin -p Harbor12345"
                sh "docker tag squirrel-backend 192.168.33.12/library/squirrel-backend"
                sh "docker push 192.168.33.12/library/squirrel-backend"
                sh "docker rmi --force 192.168.33.12/library/squirrel-backend"
            }
        }

        stage('Pull from harbor') {
            steps {
                sh "ssh root@192.168.33.10 if [ $(docker ps | grep -c squirrel-backend) == 1 ]; then docker stop  squirrel-backend; fi"
                sh "ssh root@192.168.33.10 "if [ \\$(docker ps -a | grep -c \\"squirrel-backend\\") == 1 ]; then docker rm squirrel-backend; fi""
                sh "ssh root@192.168.33.10 "if [ \\$(docker images | grep -c \\"192.168.33.12/library/squirrel-backend\\") == 1 ]; then docker rmi --force 192.168.33.12/library/squirrel-backend; fi""
                sh "ssh root@192.168.33.10 "docker login 192.168.33.12 -u admin -p Harbor12345""
                sh "ssh root@192.168.33.10 "docker pull 192.168.33.12/library/squirrel-backend""
                sh "ssh root@192.168.33.10 \"docker run -d -p 3000:3000 --network host --restart=always  --name squirrel-backend 192.168.33.12/library/squirrel-backend""
            }

        }
   
    }
}
