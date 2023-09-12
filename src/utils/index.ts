import * as AWS from 'aws-sdk';
import process from "process";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET
    },
});

export const uploadPhoto = async (file: any, userId: number, folderName: string) => {
    const fileInfo = await file;
    const readStream = fileInfo.file.createReadStream();
    const objectName = `${folderName}/${userId}-${Date.now()}-${fileInfo.file.filename}`
    const uploadFile = await new AWS.S3().upload({
        Bucket: "jstra-upload-photo",
        Key: objectName,
        ACL: "public-read",
        Body: readStream
    }).promise();
    return uploadFile.Location;
}