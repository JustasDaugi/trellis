aws lightsail push-container-image \
  --service-name trellis  \
  --label client-1 \
  --image app/client \
  --output yaml

  aws lightsail push-container-image --region eu-central-1 --service-name trellis --label label-1 --image client:app/client


  ```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install --bin-dir /usr/local/bin --install-dir /usr/local/aws-cli --update
which aws
aws --version
sudo curl "https://s3.us-west-2.amazonaws.com/lightsailctl/latest/linux-amd64/lightsailctl" -o "/usr/local/bin/lightsailctl"
sudo chmod +x /usr/local/bin/lightsailctl
```

Result:
Digest: sha256:6cbd37df8a5bf913f6d9be198ef0ef1b76af191c9232a3adcc7467ac1e8b7139
Image "app/client" registered.
Refer to this image as ":trellis.client-1.1" in deployments.


<!--  -->

Server deployment:
aws lightsail create-container-service-deployment \
  --service-name trellis \
  --containers file://containers.json \
  --public-endpoint file://public-endpoint.json