docker tag nginx-server:latest localhost:5000/nginx-server:latest
docker push localhost:5000/nginx-server:latest
docker rmi localhost:5000/nginx-server:latest