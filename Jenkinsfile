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

                checkout scm

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

        stage('Deploy') {

            steps {

                bat 'docker compose down'

                bat 'docker compose up -d'

            }

        }

    }

    post {

        success {

            echo 'Application Successfully Deployed'

        }

        failure {

            echo 'Deployment Failed'

        }

    }

}
