# vocabapp-frontend
Vocab App frontend program, code with ReactJS
Frontend link:[http://react-app-hyleungtommy.s3-website-us-east-1.amazonaws.com/](http://react-app-hyleungtommy.s3-website-us-east-1.amazonaws.com/)

# Deployment guide
1. Make sure a S3 bucket is present (if not, create one refering the section below)
2. Download the vocabapp-frontend project
3. Go to the directory you want the project to locate, run "npx create-react-app vocabapp-frontend"
4. Delete the "src" folder, replace with "src" folder of this project
5. install the required libraries (axios,react-bootstrap,react-router,react-router-dom,bootstrap)
6. Run "npm start" to test if the project is functional
7. If testing in local PC, use CORS plugin to bypass CORS
8. Once test is completed, run "npm run build" to generate static files
9. On S3 bucket, select all current items and click "delete"
![s3_1](https://i.imgur.com/rVpEU7G.png "S3_1")
10. Click "Upload" and drag all files under the "build" folder to the upload window, then click "upload"
![s3_2](https://i.imgur.com/EZS36Jh.png "S3_2")
11. Go to the link and perform testing

# Create a S3 bucket
https://blog.cloudthat.com/step-by-step-guide-to-deploy-reactjs-app-on-aws-s3/
