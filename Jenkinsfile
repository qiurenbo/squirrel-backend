pipeline {

    def remote = [:]
    remote.name = 'test'
    remote.host = '192.168.33.12'
    remote.user = 'root'
    remote.password = 'vagrant'
    remote.allowAnyHosts = true

    agent any

    stages {
        stage('Build') {
            steps {
                sh "docker build -t --no-cache squirrel-backend"
              
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
                sh "docker rmi --force squirrel-backend"
                 sh "docker rmi --force 192.168.33.12/library/squirrel-backend"
            }
        }

        stage('Push to harbor') {
            steps {
                sh "docker stop  squirrel-backend"
                sh "docker rm squirrel-backend"
                sh "docker rmi --force 192.168.33.12/library/squirrel-backen"

                sh "docker login 192.168.33.12 -u admin -p Harbor12345"
               
                sh "docker pull 192.168.33.12/library/squirrel-backend"

                sh "docker run -d -p 3000:3000 --network host --restart=always  --name squirrel-backend 192.168.33.12/library/squirrel-backend"
            }

               sshScript remote: remote, script: "abc.sh"
        }
   
    }
}
