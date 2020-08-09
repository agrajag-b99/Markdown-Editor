const fs = require('fs');
const AWS = require('aws-sdk');
const BUCKET_NAME = process.env.BUCKET_NAME;         // Enter the name of s3 bucket that you want to publish to

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
}

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = (fileContent, fileName) => {
  let folder='blogposts/' //folder in which u want it stored eg: 'folder/subfolder/' should end with '/'
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

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  return [year, month, day].join('-');
}

let {render} = require("mustache");
let template = `---
title: "{{titl}}"
date: "{{dat}}"
description: "{{desc}}"
imgsrc: "{{src}}"
---
{{content}}`

export default (req, res) => {
  let data=[]
  const Today = new Date();
  const realDate = formatDate(Today)
  if(req.method==='POST'){
    res.statusCode = 200
    const timeKey = Today.getTime();

    const {title, description, bodi, mark, image} = req.body;

    var blogKey = title +' '+ timeKey;
    blogKey = blogKey.replace(/\-/g,'').replace(/\?/g,'').replace(/\`/g,'').replace(/\~/g,'').replace(/\!/g,'').replace(/\@/g,'').replace(/\#/g,'').replace(/\$/g,'').replace(/\%/g,'').replace(/\^/g,'').replace(/\&/g,'').replace(/\*/g,'').replace(/\(/g,'').replace(/\)/g,'').replace(/\_/g,'').replace(/\=/g,'').replace(/\+/g,'').replace(/\{/g,'').replace(/\}/g,'').replace(/\[/g,'').replace(/\]/g,'').replace(/\|/g,'').replace(/\\/g,'').replace(/\//g,'').replace(/\>/g,'').replace(/\./g,'').replace(/\</g,'').replace(/\,/g,'').replace(/\:/g,'').replace(/\;/g,'').replace(/\'/g,'').replace(/\"/g,'').replace(/ /g,'-') // sorry for this but couldn't think of anything else to avoid illegal naming

    let blog = {
      titl:  title,
      dat: realDate,
      desc: description,
      content: mark,
      src: image
    }

    let newF = render(template, blog);
    let newFile = newF.replace(/\&amp;/g, '&').replace(/\&#x60;/g, '`').replace(/\&#39;/g, "'").replace(/\&#x2F;/g, '/').replace(/\&quot;/g, '"').replace(/\&gt;/g, '>').replace(/\&lt;/g, '<').replace(/\&#x3D;/g, '=')
    
    uploadFile(newFile, blogKey);
    // fs.writeFileSync('./'+blogKey+'.md', newFile); // Use this command to generate the markdown file locally also
    data.push(req.body)
    console.log(data.length);
    res.end()
  }
}
