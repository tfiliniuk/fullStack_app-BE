import express from "express";
import fs from "fs";
import path from "path";

import { FileModel } from "../models";

class FileController {
  postOneFile(req, res) {
    const file = req.file;
    if(!file) {
      console.log("PleaseUpload file");
    } else {
      res.send(file);
    }
  };
  postManyFile(req, res) {
    const files = req.files;
    if(!files) {
      console.log("PleaseUpload file");
    } else {
      res.send(files);
    }
  };
  uploadFile(req, res) {
    const img = fs.readFileSync(req.file.path);
    const encoded_image = img.toString('base64');
    // const finalImage = {
    //   contentType: req.file.mimetype,
    //   path: req.file.path,
    //   image: Buffer(encoded_image, 'base64')
    // }
    const url = req.protocol + '://' + req.get('host');
    const fileM = new FileModel({
      name: req.body.name,
      profileImg: url + '/uploads/' + req.file.filename,
      contentType: req.file.mimetype,
      path: req.file.path,
      image: Buffer.from(encoded_image, 'base64')
      })
      fileM.save().then(result => {
        // res.status(201).json({
        //   message: "User registered successfully!",
        //     userCreated: {
        //         profileImg: result.image
        //     }
        // })
        // console.log(result)
        res.contentType(result.contentType)
        res.json(result)
        }).catch(err => {
          console.log(err),
          res.status(500).json({
            error: err
          });
      })
  };
  getImage(req, res) {
    FileModel.find().then(data => {
      console.log(data)
      res.status(200).contentType(data[0].contentType)
      .send(data[0].image)
    })
  };
}

export default FileController;
