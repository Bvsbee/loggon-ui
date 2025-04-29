

export function getS3ImageUrl(key: string): string {
    const bucketName = 'loggonbucket';
    const region = 'us-east-1';
    return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
  }