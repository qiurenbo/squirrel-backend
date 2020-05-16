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

                script {
                    def remote = [:]
                    remote.name = 'test'
                    remote.host = '192.168.33.10'
                    remote.user = 'root'
                    remote.port = 22
                    remote.password = 'vagrant'
                    remote.allowAnyHosts = true

                    sshCommand remote: remote, command: "docker stop  squirrel-backend"
                    sshCommand remote: remote, command: "docker rm squirrel-backend"
                    sshCommand remote: remote, command: "docker rmi --force 192.168.33.12/library/squirrel-backend"

                    sshCommand remote: remote, command: "docker login 192.168.33.12 -u admin -p Harbor12345"
                
                    sshCommand remote: remote, command: "docker pull 192.168.33.12/library/squirrel-backend"

                    sshCommand remote: remote, command: "docker run -d -p 3000:3000 --network host --restart=always  --name squirrel-backend 192.168.33.12/library/squirrel-backend"
                }
      
            }

        }
   
    }
}
