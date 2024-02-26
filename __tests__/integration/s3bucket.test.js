const {
    describe, 
    it,
    expect,
    beforeAll,
    afterAll
  } = require('@jest/globals')
  
  const { S3 } = require('./../../src/factory')
  const { main } = require('./../../src')
  
  describe('Testing s3 bucket with serverless offline', () => {
    const bucketConfig = {
        Bucket: "test"
      }
      beforeAll(async () => {
        try {
          await S3.createBucket(bucketConfig).promise();
        } catch (error) {
          console.error('Error creating bucket:', error);
        }
      }, 10000); // 10 seconds
      
      afterAll(async () => {
        try {
          await S3.deleteBucket(bucketConfig).promise();
        } catch (error) {
          console.error('Error deleting bucket:', error);
        }
      }, 10000); 
    
      it('it should return an array with a S3 Bucket', async () => {
        const expected = bucketConfig.Bucket
        const response = await main()
        const { allBuckets: { Buckets } } = JSON.parse(response.body)
        const { Name } = Buckets.find(({ Name }) => Name === expected)
        expect(Name).toStrictEqual(expected)
        expect(response.statusCode).toStrictEqual(200)
      })
    })