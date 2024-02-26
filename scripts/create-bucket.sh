BUCKET_NAME=demo-codamaisfala

aws \
  s3 mb s3://$BUCKET_NAME \
  --endpoint-url=http://localhost:4566

aws \
  s3 ls \
  --endpoint-url=http://localhost:4566