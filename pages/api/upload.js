const fs = require('fs');
const AWS = require('aws-sdk');
const BUCKET_NAME = '';         // Enter the name of s3 bucket that you want to publish to

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = (fileContent, fileName) => {
    let folder='' //folder in which u want it stored eg: 'folder/subfolder/'
    let fkey= folder + fileName + '.md';
    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fkey, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully at ${data.Location}`);
    });
};

let {render} = require("mustache");
let template = `---
title: "{{titl}}"
date: "{{dat}}"
---
{{bod}}
`

export default (req, res) => {
  let data=[]
  if(req.method==='POST'){
    res.statusCode = 200
    const {title, date, bodi, mark} = req.body;
    let blog = {
      titl:  title,
      dat: date,
      bod: mark
    }
    let newFile = render(template, blog);
    uploadFile(newFile, blog.titl);
    // fs.writeFileSync('./new.md', newFile);           // Use this command to generate the markdown file locally also
    data.push(req.body)
    console.log(data.length);
    res.end()
  }
}
