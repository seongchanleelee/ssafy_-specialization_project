pipeline {
    agent any

    tools {
      gradle 'G'
    }

    stages {
      stage('Docker kill'){
        steps {
          sh 'docker stop fe || true && docker rm fe || true'
          sh 'docker stop be_s || true && docker rm be_s || true'
          sh 'docker stop be_f || true && docker rm be_f || true'
          sh 'docker image prune' 
        }
        post {
          success {
            echo "kill success"
          }
          failure {
            echo "kill fail"
          }
        }
      }
      stage('Prepare') {
        steps {
          checkout scm
        }
        post {
            success {
              echo " prepare success"
            }
            failure {
              echo "prepare fail"
            }
        }
      }
      stage('Frontend Build') {
        steps {
          dir('frontend'){
            echo "here is frontend dir"
            sh 'docker build -t frontend .'
            sh 'docker run -d --name fe -p 3000:80 frontend'
          }
        }
      }
      stage('Backend-Spring Build') {
        steps {
          dir('./wayg'){
            echo "here is backend dir"
            sh "gradle clean build -x test -b build.gradle"
            sh 'docker build -t backend_spring .'
            sh 'docker run -d --name be_s -p 8080:8080 backend_spring'
          }
        }
      }
      // stage('Backend-Flask Build') {
      //   steps {
      //     dir('./backend_flask'){
      //       echo "here is backend dir"
      //       sh 'docker build -t backend_flask .'
      //       sh 'docker run -d --name be_f -p 5000:5000 backend_flask'
      //     }
      //   }
      // }
    }
}
