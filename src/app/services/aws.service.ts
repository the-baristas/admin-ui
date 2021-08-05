import { Injectable } from '@angular/core';
import * as aws from 'aws-sdk/global';
import * as s3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class AwsService {


  constructor() { }

  public uploadCsv(csv: File) {
    let bucket = new s3({
      region: 'us-east-2',
      accessKeyId: "AKIAR7AMDNGAK4JSIKEA",
      secretAccessKey: "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"
    });
    let params = {
      Bucket: "flight-csv-bucket",
      Key: csv.name,
      Body: csv,
      ACL: 'public-read',
      ContentType: csv.type
    }
    console.log(csv)
    bucket.upload(params, (error: any, data: any) => {
      if (error) {
        alert("There was a problem");
      }
      else if (data) {
        alert("Flight uploaded successfully")
      }
    })
  }
}
