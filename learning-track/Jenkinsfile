pipeline {

    agent any

tools {
    maven 'Maven3.9'
    jdk 'JDK21'
}

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/akhileshkumar4953/learning-track.git'
            }
        }

        stage('Build') {
            steps {
                bat 'mvn clean package -DskipTests'
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t learning-track .'
            }
        }

    }

    post {

        success {
            echo 'Build Successful'
        }

        failure {
            echo 'Build Failed'
        }

    }

}