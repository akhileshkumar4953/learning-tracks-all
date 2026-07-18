pipeline {

    agent any

    tools {

        jdk 'JDK21'
        maven 'Maven3.9'
        nodejs 'NodeJS22'

    }

    stages {

        stage('Checkout') {

            steps {

                git branch: 'main',
                    url: 'https://github.com/akhileshkumar4953/learning-track.git'

            }

        }

        stage('Build Backend') {

            steps {

                dir('learning-track') {

                    bat 'mvn clean package -DskipTests'

                }

            }

        }

        stage('Build Frontend') {

            steps {

                dir('learning-track-ui') {

                    bat 'npm install'

                    bat 'npm run build'

                }

            }

        }

        stage('Docker Compose Build') {

            steps {

                bat 'docker compose build'

            }

        }

    }

    post {

        success {

            echo 'Full Stack Build Successful'

        }

        failure {

            echo 'Full Stack Build Failed'

        }

    }

}