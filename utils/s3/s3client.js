const S3 = require('aws-sdk/clients/s3')

const bucketParams = { Bucket: 'co95399-cutaway' } // <--- заменить
const uploadParams = { Bucket: bucketParams.Bucket, Key: '', Body: '' }

const file = 'test.png'

const s3client = new S3({
  accessKeyId: 'co95399', // <--- заменить
  secretAccessKey: 'yz--gkudyfjprsavo6iruxfkbqiejrpo', // <--- заменить
  endpoint: 'https://s3.timeweb.com',
  region: 'ru-1',
})

module.exports = s3client